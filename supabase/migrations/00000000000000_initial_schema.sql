-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  plan text default 'free' check (plan in ('free', 'pro')),
  stripe_customer_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Boards (one per product/project)
create table public.boards (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references public.profiles on delete cascade not null,
  name text not null,
  slug text not null unique,
  description text,
  is_public boolean default true,
  created_at timestamptz default now()
);

alter table public.boards enable row level security;

create policy "Owners can manage their boards" on public.boards
  for all using (auth.uid() = owner_id);

create policy "Public boards are viewable by anyone" on public.boards
  for select using (is_public = true);

-- Feature requests (posts on a board)
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  board_id uuid references public.boards on delete cascade not null,
  author_id uuid references public.profiles on delete set null,
  author_email text,
  title text not null,
  description text,
  status text default 'open' check (status in ('open', 'planned', 'in_progress', 'completed', 'closed')),
  vote_count integer default 0,
  created_at timestamptz default now()
);

alter table public.posts enable row level security;

create policy "Anyone can view posts on public boards" on public.posts
  for select using (
    exists (select 1 from public.boards where boards.id = posts.board_id and boards.is_public = true)
    or exists (select 1 from public.boards where boards.id = posts.board_id and boards.owner_id = auth.uid())
  );

create policy "Authenticated users can create posts" on public.posts
  for insert with check (auth.uid() is not null);

create policy "Board owners can update posts" on public.posts
  for update using (
    exists (select 1 from public.boards where boards.id = posts.board_id and boards.owner_id = auth.uid())
  );

create policy "Board owners can delete posts" on public.posts
  for delete using (
    exists (select 1 from public.boards where boards.id = posts.board_id and boards.owner_id = auth.uid())
  );

-- Votes (one per user per post)
create table public.votes (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references public.posts on delete cascade not null,
  user_id uuid references public.profiles on delete cascade not null,
  created_at timestamptz default now(),
  unique (post_id, user_id)
);

alter table public.votes enable row level security;

create policy "Users can view votes" on public.votes
  for select using (true);

create policy "Users can vote" on public.votes
  for insert with check (auth.uid() = user_id);

create policy "Users can remove their vote" on public.votes
  for delete using (auth.uid() = user_id);

-- Changelog entries (tied to a board)
create table public.changelog (
  id uuid default gen_random_uuid() primary key,
  board_id uuid references public.boards on delete cascade not null,
  title text not null,
  content text,
  published_at timestamptz default now()
);

alter table public.changelog enable row level security;

create policy "Anyone can view changelog on public boards" on public.changelog
  for select using (
    exists (select 1 from public.boards where boards.id = changelog.board_id and boards.is_public = true)
  );

create policy "Board owners can manage changelog" on public.changelog
  for all using (
    exists (select 1 from public.boards where boards.id = changelog.board_id and boards.owner_id = auth.uid())
  );

-- Function to update vote count on posts
create or replace function public.update_vote_count()
returns trigger as $$
begin
  if TG_OP = 'INSERT' then
    update public.posts set vote_count = vote_count + 1 where id = NEW.post_id;
    return NEW;
  elsif TG_OP = 'DELETE' then
    update public.posts set vote_count = vote_count - 1 where id = OLD.post_id;
    return OLD;
  end if;
end;
$$ language plpgsql security definer;

create trigger on_vote_change
  after insert or delete on public.votes
  for each row execute procedure public.update_vote_count();

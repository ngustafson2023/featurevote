#!/usr/bin/env bash
set -euo pipefail

# SaaS Factory — One-command project setup
# Usage: ./setup.sh

echo "=== SaaS Factory Setup ==="
echo ""

read -p "App name (lowercase, no spaces, e.g. 'taskflow'): " APP_NAME
read -p "App title (e.g. 'TaskFlow — Smart Task Management'): " APP_TITLE
read -p "Short description: " APP_DESCRIPTION
read -p "Landing page headline: " APP_HEADLINE
read -p "Landing page subheadline: " APP_SUBHEADLINE
read -p "Tagline (footer): " APP_TAGLINE
read -p "Pro plan price (number only, e.g. '15'): " PRO_PRICE
APP_URL="https://${APP_NAME}.bootstrapquant.com"
APP_DATE=$(date +%Y-%m-%d)

echo ""
echo "App: ${APP_NAME}"
echo "URL: ${APP_URL}"
echo "Pro: \$${PRO_PRICE}/mo"
echo ""
read -p "Proceed? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Aborted."
  exit 1
fi

echo "Replacing placeholders..."

# Find all files and replace placeholders (skip .git, node_modules, .next)
find . -type f \
  -not -path './.git/*' \
  -not -path '*/node_modules/*' \
  -not -path '*/.next/*' \
  -not -path './setup.sh' \
  -name '*.ts' -o -name '*.tsx' -o -name '*.json' -o -name '*.toml' -o -name '*.css' -o -name '*.mjs' -o -name '*.sql' -o -name '*.example' | while read -r file; do
    sed -i \
      -e "s|__APP_NAME__|${APP_NAME}|g" \
      -e "s|__APP_TITLE__|${APP_TITLE}|g" \
      -e "s|__APP_DESCRIPTION__|${APP_DESCRIPTION}|g" \
      -e "s|__APP_URL__|${APP_URL}|g" \
      -e "s|__APP_HEADLINE__|${APP_HEADLINE}|g" \
      -e "s|__APP_SUBHEADLINE__|${APP_SUBHEADLINE}|g" \
      -e "s|__APP_TAGLINE__|${APP_TAGLINE}|g" \
      -e "s|__PRO_PRICE__|${PRO_PRICE}|g" \
      -e "s|__DATE__|${APP_DATE}|g" \
      "$file"
done

echo "Installing dependencies..."
npm install

echo ""
echo "=== Setup complete ==="
echo ""
echo "Next steps:"
echo "  1. Add app-specific features, routes, and database tables"
echo "  2. Run: npx supabase projects create ${APP_NAME} --org-id mwrcsnociaijodnsciyi --db-password \"\$(openssl rand -base64 24)\" --region us-east-1"
echo "  3. Follow the deploy-saas skill for Supabase, Stripe, Vercel, and domain setup"
echo ""

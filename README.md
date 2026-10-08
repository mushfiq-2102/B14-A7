# 🛒 বাজার দর (BazarDor)

> প্রয়োজনীয় পণ্যের দাম এক নজরে — daily essential grocery prices of Bangladesh at a glance.

**BazarDor** is a Bengali price-tracking web app. It shows today's prices of rice, pulses, oil, vegetables, fish, meat, eggs/dairy and spices, how much each price changed since yesterday, and a market-by-market price breakdown for every product.

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| [Next.js 16](https://nextjs.org/) (App Router) | UI, routing, server-side data fetching |
| TypeScript | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling and responsive layout |
| [DaisyUI v5](https://daisyui.com/) | Component library (custom `bazardor` green theme) |
| [Better Auth](https://better-auth.com/) | Email/password, Google and GitHub authentication |
| MongoDB | Better Auth database |
| react-hot-toast | Toast notifications |
| react-marquee-text | Infinite price ticker |

## ✨ Features

1. **Live price ticker** — an infinite scrolling strip under the navbar showing emoji, name, price per unit and ▲/▼ change %.
2. **Daily price movers** — top 6 risers (আজ দাম বেড়েছে) and top 6 fallers (আজ দাম কমেছে) on the home page.
3. **All products grid** — every product as a responsive card with Bengali digits and a green/red/gray change badge.
4. **Category pages with sorting** — sort by default, price low → high or high → low (sorted by numeric value, not Bengali text), with skeleton loading and an empty state.
5. **Protected product details** — min / max / average price summary and a market-wise price table for each product (login required).
6. **Authentication** — email/password plus Google & GitHub login, with toast feedback for login, signup, logout and protected-route redirects.
7. **Profile & update information** — view your profile and update your name on a separate route.
8. **Fully responsive** — mobile, tablet and desktop, with a custom 404 page for unknown routes.

## 🌐 API

Data is fetched from `https://api.api-store.workers.dev/api/bazardor`

- `/products`, `/products?category=chal`, `/products?slug=alu`
- `/categories`, `/categories/chal`

## 🚀 Getting Started

```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev
```

Environment variables (see `.env.example`):

```
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=          # e.g. http://localhost:3000
MONGODB_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

For Google/GitHub login, set the OAuth callback URL to
`{BETTER_AUTH_URL}/api/auth/callback/google` and `{BETTER_AUTH_URL}/api/auth/callback/github`.

## 📁 Project Structure

```
src/
├─ proxy.ts                      # protects /product/*, /profile, /profile/update
├─ lib/                          # auth, auth-client, Bengali formatting helpers
├─ app/
│  ├─ page.tsx                   # Home
│  ├─ category/[categoryId]/     # Category page
│  ├─ product/[slug]/            # Product details (protected)
│  ├─ signin, signup/            # Authentication
│  ├─ profile/, profile/update/  # Profile and update information
│  ├─ loading.tsx, not-found.tsx # Skeleton and 404
│  └─ api/auth/[...all]/         # Better Auth handler
└─ components/                   # Header, NavLinks, UserInfo, Marquee, ProductCard, ...
```

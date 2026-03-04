# 🌱 Ecoyaan — Eco-Friendly Checkout Flow

A complete, production-quality checkout flow built with **Next.js (App Router)** and **Tailwind CSS** for [Ecoyaan](https://ecoyaan.com), an eco-friendly products platform.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📸 Screens

| Screen | Route | Description |
|--------|-------|-------------|
| **Cart** | `/` | View cart items, subtotal, shipping fee, and grand total |
| **Shipping** | `/shipping` | Enter and validate shipping address |
| **Payment** | `/payment` | Review full order summary and pay |
| **Success** | `/success` | Order confirmation with details |

---

## 🏗️ Tech Choices

| Technology | Why |
|---|---|
| **Next.js App Router** | Server Components for SSR, file-system routing, API routes — all in one framework |
| **Tailwind CSS v4** | Utility-first styling with zero runtime cost; excellent for responsive, mobile-first design |
| **React Context API** | Lightweight global state management perfect for a checkout flow (no Redux overhead) |
| **Next.js API Routes** | Mock backend co-located in the same repo — easy to swap for a real backend later |

### Architecture Highlights

- **Server Component data fetching** — Cart data is fetched on the server via the `/api/cart` route, then passed to a client component for interactive rendering.
- **"use client" pushed down** — Only interactive leaves (forms, buttons with navigation) are Client Components. Layout and data fetching stay on the server.
- **Form validation** — Real-time, per-field validation with touch tracking (email format, 10-digit phone, 6-digit PIN).
- **Progress indicator** — 4-step visual progress bar driven by `usePathname()`.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Install & Run

```bash
# Clone the repo
git clone <your-repo-url>
cd ecoyaa

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
ecoyaa/
├── app/
│   ├── api/cart/route.js       # Mock cart API endpoint
│   ├── shipping/page.jsx       # Shipping address form
│   ├── payment/page.jsx        # Payment & order review
│   ├── success/page.jsx        # Order confirmation
│   ├── globals.css             # Global styles + Tailwind
│   ├── layout.js               # Root layout with CartProvider
│   └── page.js                 # Cart page (Server Component)
├── components/
│   ├── CartPageClient.jsx      # Client-side cart rendering
│   ├── OrderSummary.jsx        # Reusable order summary card
│   └── ProgressBar.jsx         # 4-step checkout progress
├── context/
│   └── CartContext.jsx          # Global checkout state
├── package.json
└── README.md
```

---

## ☁️ Deploy to Vercel

The easiest way to deploy is through [Vercel](https://vercel.com):

1. Push your code to a GitHub / GitLab / Bitbucket repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import your repo.
3. Vercel auto-detects Next.js — click **Deploy**.
4. Your app will be live at `https://your-project.vercel.app`.

> **Note:** The `/api/cart` mock API works out of the box on Vercel. For production, replace it with calls to your real backend / database.

---

## 📝 License

MIT — do whatever you want with it. 🌍

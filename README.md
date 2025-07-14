# 🎓 Full-Stack Learning Management System (LMS)

A feature-rich **Learning Management System** (LMS) built using a **monorepo architecture** with [Turborepo](https://turbo.build), leveraging **Next.js**, **React Native**, **Supabase**, and **Stripe**.

---

## 📁 Monorepo Structure
lms-monorepo/
│
├── apps/
│ ├── web/ # Web frontend (Next.js)
│ ├── mobile/ # Mobile app (React Native / Expo)
│ └── admin/ # Optional admin dashboard
│
├── packages/
│ ├── ui/ # Reusable UI components (Tailwind + shadcn)
│ ├── lib/ # Shared utilities, Supabase client, API helpers
│ └── types/ # Shared TypeScript types and interfaces
│
├── .gitignore
├── package.json
├── turbo.json


---

## 🧰 Tech Stack

| Tech           | Purpose                          |
|----------------|----------------------------------|
| Turborepo      | Monorepo management              |
| Next.js        | Web frontend                     |
| React Native   | Mobile frontend                  |
| Supabase       | Backend, Auth, Database, Storage |
| Stripe         | Payments & subscriptions         |
| Tailwind CSS   | Styling                          |
| shadcn/ui      | UI components                    |
| PostgreSQL     | Database via Supabase            |

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/GakuruIan/lms-monorepo.git
cd lms-monorepo

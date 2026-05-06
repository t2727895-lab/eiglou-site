# Admin Panel Setup Guide

## Tech Stack
- **Next.js 16** (App Router)
- **Prisma 7** ORM
- **MySQL** Database
- **Tailwind CSS** UI
- **TipTap** Rich Text Editor
- **JWT** Authentication (via `jose`)
- **bcryptjs** Password Hashing
- **react-hot-toast** Notifications

---

## 1. Configure Database

Edit `.env` with your MySQL credentials:

```env
DATABASE_URL="mysql://YOUR_USER:YOUR_PASSWORD@localhost:3306/admin_blog_db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production-min-32-chars"
```

---

## 2. Create the Database

In MySQL, run:
```sql
CREATE DATABASE admin_blog_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

## 3. Run Migrations

```bash
npm run db:migrate
# When prompted, name the migration: "init"
```

This creates the `admins` and `blogs` tables.

---

## 4. Seed the Database

**Option A** — Via API (easiest):
Start the dev server, then visit:
```
POST http://localhost:3000/api/admin/seed
```
Or use curl:
```bash
curl -X POST http://localhost:3000/api/admin/seed
```

**Option B** — Via npm script:
```bash
npm install -D ts-node
npm run db:seed
```

Default credentials created:
- **Email:** admin@example.com
- **Password:** admin123

---

## 5. Start Development Server

```bash
npm run dev
```

---

## Routes

| Route | Description |
|-------|-------------|
| `/admin/login` | Admin login page |
| `/admin/dashboard` | Protected dashboard with stats |
| `/admin/blogs` | List all blogs (search, edit, delete) |
| `/admin/blogs/create` | Create new blog with rich text editor |
| `/admin/blogs/[id]/edit` | Edit existing blog |

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/admin/login` | No | Login admin |
| POST | `/api/admin/logout` | No | Logout admin |
| POST | `/api/admin/seed` | No | Create default admin |
| GET | `/api/blogs` | No | Fetch all blogs |
| POST | `/api/blogs` | Yes | Create blog |
| GET | `/api/blogs/[id]` | No | Fetch single blog |
| PUT | `/api/blogs/[id]` | Yes | Update blog |
| DELETE | `/api/blogs/[id]` | Yes | Delete blog |

---

## Security Notes

- Passwords are hashed with **bcrypt** (12 rounds)
- JWT tokens expire after **24 hours**
- Tokens stored in **httpOnly cookies** (XSS-safe)
- Middleware protects all `/admin/dashboard` and `/admin/blogs` routes
- DB credentials stored in `.env` (never committed)

---

## Prisma Schema

```prisma
model Admin {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String   // bcrypt hashed
  createdAt DateTime @default(now())
}

model Blog {
  id        Int      @id @default(autoincrement())
  title     String
  content   String   @db.LongText  // Rich HTML from TipTap
  image     String?  // Optional featured image URL
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

# 🎓 Full-Stack Learning Management System (LMS)

A feature-rich LMS platform built with **Next.js**, **Supabase**, **Stripe**, and **Tailwind CSS**, supporting multi-role access for **Admin**, **Tutors**, and **Students**.

---

## 📌 Features

### 👥 User Roles
- **Admin**
- **Tutor** (requires admin approval)
- **Student**

---

## 🧑‍🏫 Tutor Features
- Create and manage courses, modules, and topics
- Upload resources (videos, notes, PDFs)
- Set quizzes, CATS, and exams
- Grade students manually or automatically
- View enrolled students and performance
- Schedule and host live classes (Zoom/WebRTC)
- Track live class attendance
- Kick students with poor attendance or performance
- View student reviews and suggestions
- View course sales and earnings
- Issue completion certificates
- Manage course-based chat rooms
- Attach downloadable notes/resources
- Set course pricing and discounts
- Accept payments via **Stripe**
- Manage sales, payouts, and history
- Moderate reported students or tutors

---

## 🧑‍🎓 Student Features
- Register as student or apply as tutor
- Browse and enroll in free/paid courses
- Pay via Stripe (secure checkout)
- Watch videos and download resources
- Take quizzes, CATS, and exams
- View grades for assessments
- Join live classes and chat rooms
- Receive certificates on course completion
- Leave topic-based reviews and suggestions
- Track course progress
- Report tutors or other students

---

## 🛠️ Admin Features
- Approve/reject tutor applications
- Suspend or reactivate users
- View platform analytics:
  - Total revenue and sales
  - Active students and tutors
  - Course popularity
- Send announcements
- Manage reports, feedback, categories
- Set commission rates for tutor payouts

---

## 💡 Bonus Features

### ⚙️ Platform-Wide
- Auth with email/password + role selection
- Progress tracker (% completed)
- Responsive UI with Tailwind
- Theme support (light/dark)
- Search & filtering (by rating, topic, difficulty)

### 📈 Engagement
- Course previews
- Reminders for live sessions or quizzes
- Notification system (grades, updates, reminders)
- Bookmark/favorite courses

### 💬 Communication
- Chatrooms per course
- Private messaging (optional)
- Notifications for announcements or updates

### 🔒 Security
- Supabase RLS (row-level security)
- User reporting and moderation
- Rate limiting and abuse detection

### 🧠 (Optional AI-Enabled)
- AI quiz generator
- AI lesson summarizer
- AI chatbot assistant per course

---

## 🧰 Tech Stack

| Tool         | Purpose                      |
|--------------|------------------------------|
| Next.js      | Frontend framework           |
| Supabase     | Backend, database, auth      |
| Stripe       | Payment processing           |
| Tailwind CSS | Styling                      |
| shadcn/ui    | Component library            |
| Jitsi/Zoom   | Live class support           |
| PostgreSQL   | Database                     |

---

## 📦 Project Setup (Quick Start)

```bash
git clone https://github.com/your-username/lms-app.git
cd lms-app
npm install

# Create .env.local with your Supabase + Stripe keys

npm run dev

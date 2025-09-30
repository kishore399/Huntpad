# HuntPad — Notion-Inspired MERN Notepad App

**HuntPad** is a Notion-style, block-based note-taking application built with the **MERN stack**, designed for speed, polish, and production-level experience.

It serves as the perfect foundation for understanding full-stack architecture, editor internals, and UX engineering.

---

## Features

- **JWT Authentication** — Login, signup, email verification, forgot/reset password, and resend verification
- **Block-Based Editor** — Slash (`/`) command support using BlockNote
- **Autosave** — Instant real-time save of title and content (no manual save button)
- **Theme Support** — Light/dark mode with smooth 300ms transitions
- **Note Metadata** — Metadata and content load separately for performance
- **Custom Cover Images** — Notion-style header image support
- **Public Read-Only Sharing** — Generate a public link for any note
- **Collapsible Sidebar** — Searchable, minimal sidebar with smooth UX
- **Profile System** — Editable profile with picture upload
- **Keyboard Shortcuts**
  - `Ctrl + K` – Search notes
  - `Ctrl + S` – Trigger manual save
  - `Ctrl + P` – Open profile
  - `Ctrl + B` – Toggle sidebar

---

## Tech Stack

- **Frontend:** React, TailwindCSS, BlockNote
- **Backend:** Express.js, Node.js
- **Database:** MongoDB Atlas (via Mongoose)
- **Auth:** JWT, bcrypt, email verification with Nodemailer

---

## What I Learned

This project taught me:

- End-to-end secure auth systems (tokens, email flows)
- Handling large-scale note systems with efficient state management
- Real-time autosave design
- Professional frontend UX using advanced Tailwind and React patterns
- Notion-style editor logic using blocks, slash commands, and metadata separation

---

## Try It Out

🔗 **Live Demo:** [huntpad.onrender.com/home](https://huntpad.onrender.com/home)

> ⚠️ Hosted on Render’s free tier – cold starts may take up to **50 seconds** if the app has been idle.

---

<div align="center">

# 🛍️ ShopNest

### 🚀 Full-Stack E-Commerce Platform (MERN)

A production-ready e-commerce application delivering a seamless shopping experience — from product discovery to checkout — with a powerful admin dashboard.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express)
![JWT](https://img.shields.io/badge/Auth-JWT-black?style=for-the-badge)

</div>

---

## ✨ Why ShopNest?

ShopNest is not just another CRUD app — it’s a **complete e-commerce ecosystem** with:

- 🧠 Real-world architecture (layered backend + scalable frontend)
- 🔐 Secure authentication & role-based access
- 🛒 Full shopping workflow (cart → checkout → orders)
- 📊 Admin analytics & management system
- ⚡ Optimized performance using modern tools (Vite, Context API)

---

## 🧩 Core Features

### 🧑‍💻 User Side

- 🔐 JWT Authentication (Login/Register)
- 🔍 Smart product search & filtering
- 🛒 Cart with live updates
- 💛 Wishlist system
- 📦 Multi-step checkout flow
- ⭐ Ratings & reviews
- 👤 Profile management
- 🔔 Notifications system
- 📜 Order history & tracking

### 🛠️ Admin Panel

- 📊 Dashboard with analytics
- 📦 Product CRUD with image upload
- 🧾 Order management system
- 👥 User control (block/unblock)
- 💬 Contact message handling

---

## 🧰 Tech Stack

| Layer       | Tech               |
| ----------- | ------------------ |
| Frontend    | React 18 + Vite    |
| State       | Context API        |
| Backend     | Node.js + Express  |
| Database    | MongoDB (Mongoose) |
| Auth        | JWT + bcrypt       |
| File Upload | Multer             |
| Email       | Nodemailer         |

---

## 🏗️ Architecture Overview

### Backend Flow

```
Routes → Controllers → Services → Models → Database
```

✔ Clean separation of concerns
✔ Scalable and maintainable

---

### Frontend Flow

```
Pages → Components → Context → API Services
```

✔ Context-based global state
✔ Modular component structure

---

## 📁 Project Structure

```
ShopNest/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── utils/
│
└── frontend/
    ├── Components/
    ├── Pages/
    ├── Context/
    ├── Hooks/
    └── Services/
```

---

## ⚙️ Getting Started

### 1. Clone Repo

```bash
git clone https://github.com/paldentitung/shopnest.git
cd shopnest
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
```

Run:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Security Highlights

- Passwords hashed using bcrypt
- JWT-based authentication
- Role-based access control (Admin/User)
- Protected API routes
- Environment variable protection

---

## 📈 What Makes This Project Strong?

✔ Real-world features (not just CRUD)
✔ Clean architecture
✔ Admin + User system
✔ Scalable codebase

---

## 🤝 Contributing

Pull requests are welcome!

```bash
git checkout -b feature/your-feature
git commit -m "Add feature"
git push origin feature/your-feature
```

---

## 📄 License

MIT License

---

<div align="center">

💡 Built with passion — aiming for real-world impact

</div>

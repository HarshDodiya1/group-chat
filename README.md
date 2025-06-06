# 🚀 Group Chat Application

A modern, real-time group chatting application built with cutting-edge technologies for seamless communication and scalability.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8-010101?style=for-the-badge&logo=socket.io)
![Redis](https://img.shields.io/badge/Redis-Streams-DC382D?style=for-the-badge&logo=redis)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.20-2D3748?style=for-the-badge&logo=prisma)

## ✨ Features

- 🔐 **Authentication & Authorization** - Secure user authentication with NextAuth.js
- 💬 **Real-time Messaging** - Instant messaging powered by Socket.IO
- 🏢 **Group Chat Rooms** - Create and join multiple chat rooms
- 📱 **Responsive Design** - Beautiful UI with Tailwind CSS and Radix UI components
- ⚡ **High Performance** - Redis-backed message streaming for scalability
- 🔄 **Real-time Updates** - Live user presence and message delivery
- 🎨 **Modern UI/UX** - Clean, intuitive interface with dark/light theme support
- 📊 **Admin Dashboard** - Socket.IO admin interface for monitoring

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Authentication**: NextAuth.js
- **Real-time**: Socket.IO Client
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React, Radix Icons

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: Prisma ORM
- **Real-time**: Socket.IO Server
- **Caching**: Redis with IORedis
- **Message Queue**: Apache Kafka
- **Authentication**: JWT
- **Monitoring**: Socket.IO Admin UI

### Infrastructure
- **Message Streaming**: Redis Streams Adapter
- **Session Management**: Cookie-based sessions
- **CORS**: Cross-origin resource sharing enabled

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Redis Server
- PostgreSQL/MySQL (for Prisma)
- Apache Kafka (optional, for message queuing)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/HarshDodiya1/group-chat.git
cd group-chat
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../backend
npm install
```

4. **Environment Setup**

Create `.env` files in both frontend and backend directories:

**Frontend (.env.local)**
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

**Backend (.env)**
```env
DATABASE_URL="your-database-url"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-jwt-secret"
PORT=8000
```

5. **Database Setup**
```bash
cd backend
npx prisma generate
npx prisma db push
```

6. **Start the Development Servers**

**Backend Server:**
```bash
cd backend
npm run dev
```

**Frontend Server:**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` to see the application in action! 🎉

## 📁 Project Structure

```
group-chat/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # Reusable UI components
│   │   │   └── base/        # Base components (Navbar, Footer, etc.)
│   │   └── lib/             # Utility functions
│   └── package.json
├── backend/                 # Express.js backend server
│   ├── server.ts           # Main server file
│   ├── prisma/             # Database schema and migrations
│   └── package.json
└── README.md
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm test` - Run tests

## 🌟 Key Features Breakdown

### Real-time Communication
- WebSocket connections for instant messaging
- Redis Streams for horizontal scaling
- Message persistence and history

### User Experience
- Responsive design for all devices
- Real-time user presence indicators
- Message delivery confirmations
- Typing indicators

### Security & Performance
- JWT-based authentication
- CORS protection
- Redis caching for optimal performance
- Connection pooling and optimization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Harsh Dodiya**
- GitHub: [@HarshDodiya1](https://github.com/HarshDodiya1)

## 🙏 Acknowledgments

- Socket.IO team for excellent real-time capabilities
- Next.js team for the amazing React framework
- Radix UI for beautiful, accessible components
- Redis team for high-performance caching solutions

---

⭐ Star this repository if you found it helpful!

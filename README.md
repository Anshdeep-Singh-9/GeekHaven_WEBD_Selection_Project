# 🚀 Interview Questions Hub - Full Stack Web Application  

**Anshdeep Singh**  
Roll Number: **IIT2024011**  

A modern platform for technical interview preparation built with **React.js**, **Node.js**, and **MongoDB**. It provides an interactive way to browse, search, and track progress with support for **speech recognition** and **dynamic theming**.  

## ✨ Key Features  

- 🔐 **Authentication** – Login & Signup with email verification  
- 🔎 **Search & Voice Commands** – Real-time filtering, voice-powered search, theme switching  
- 🎨 **Dynamic UI** – Dark/Light mode, responsive design, smooth animations  
- 📚 **Question Management** – Collapsible panels, progress tracking, bookmarking, learning resources  
- 📊 **Analytics Dashboard** – Track performance and progress  

## 🛠️ Tech Stack  

**Frontend**: React.js, Context API, CSS3, Web Speech API  
**Backend**: Node.js, Express.js, MongoDB, Mongoose  

## 📁 Project Structure  

```
src/
├── components/       # UI and layout components
├── context/          # Theme and auth context
├── hooks/            # Custom hooks
├── pages/            # Home, Login, Signup
├── styles/           # CSS files
└── utils/            # Helper functions
```  

## 🚀 Getting Started  

### Prerequisites  
- Node.js (v16+)  
- MongoDB database  

### Setup  

```bash
git clone <repository-url>
cd Webd_GeekHaven_Restructured
npm install
cp .env.example .env   # Add MongoDB connection string
npm run server         # Start backend
npm run dev            # Start frontend
```

Open [http://localhost:5173](http://localhost:5173)  

## 🎯 Usage  

- 🎤 **Voice Commands**:  
  - "dark mode" → switch theme  
  - "light mode" → switch theme  
  - "clear search" → reset query  
  - "JavaScript arrays" → search questions  

- **Manage Questions**: Expand, mark complete, bookmark, or explore linked resources  
- **Themes**: Toggle manually or control via voice  

## 🔧 API Endpoints  

```
GET    /api/Database/populateDatabase
GET    /api/v1/questions
GET    /api/v1/user/bookmarks
GET    /api/v1/user/progress
POST   /api/v1/user/update_bookmarks
POST   /api/v1/user/update_progress
POST   /api/v1/auth/login
POST   /api/v1/auth/signup
```  

## 🌐 Browser Support  

- ✅ Chrome (best for voice recognition)  
- ✅ Edge, Safari, Firefox (limited speech API)  
- ⚠️ Voice recognition requires HTTPS in production  

## 🔒 Security  

- Password hashing (bcrypt)  
- Input sanitization  
- CORS protection & rate limiting  

## 📄 License  

This project is created for the GeekHaven Web Development selection process.  

## 👨‍💻 Developer  

**Anshdeep Singh**  
Roll Number: **IIT2024011**  
Indian Institute of Technology  

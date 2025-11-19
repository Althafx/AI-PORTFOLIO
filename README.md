# AI Portfolio

A stunning MERN stack portfolio website featuring:
- 🎨 Animated CSS character that follows your mouse cursor
- 🤖 AI-powered chatbot using Google's Gemini API
- 📊 Admin panel with analytics dashboard
- 💼 Dynamic project showcase and content management

## Features

- **Animated Background**: CSS-based character with face and body that tracks mouse movement
- **AI Chatbot**: Integrated Gemini AI to answer questions about you
- **Admin Panel**: Secure dashboard to manage all portfolio content
- **Analytics**: Track portfolio views and project-specific engagement
- **Responsive Design**: Beautiful UI with glassmorphism and smooth animations

## Tech Stack

- **Frontend**: React + Vite, React Router, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT
- **AI**: Google Gemini API
- **File Upload**: Multer

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install-all
   ```

3. Set up environment variables:
   - Copy `server/.env.example` to `server/.env`
   - Add your MongoDB URI and Gemini API key

4. Start the development servers:
   ```bash
   npm run dev
   ```

   Or run separately:
   ```bash
   # Terminal 1 - Backend
   npm run server

   # Terminal 2 - Frontend
   npm run client
   ```

5. Access the application:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

### First Time Setup

1. Create admin account via POST request to `/api/auth/register`
2. Login through the admin panel at `/admin`
3. Start adding your projects, skills, and profile information!

## Project Structure

```
ai-portfolio/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── utils/       # Utility functions
│   │   └── App.jsx      # Main app component
│   └── package.json
├── server/              # Express backend
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── services/        # Business logic
│   ├── config/          # Configuration files
│   └── server.js        # Entry point
└── package.json         # Root package file
```

## License

MIT

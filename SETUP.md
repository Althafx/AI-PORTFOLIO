# 🚀 Quick Start Guide - AI Portfolio

## ⚡ Fast Setup (5 minutes)

### 1. Configure Environment

Create `server/.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-portfolio
JWT_SECRET=change_this_to_random_secure_string_12345
GEMINI_API_KEY=your_gemini_api_key_from_google_ai_studio
CLIENT_URL=http://localhost:5173
```

**Get Gemini API Key**: https://makersuite.google.com/app/apikey

### 2. Start MongoDB

**Local MongoDB**:
```bash
mongod
```

**OR use MongoDB Atlas** (free cloud database):
- Sign up at https://www.mongodb.com/cloud/atlas
- Create cluster → Get connection string
- Update `MONGODB_URI` in `.env`

### 3. Run the Application

```bash
# From project root
npm run dev
```

This starts both frontend (port 5173) and backend (port 5000).

### 4. Create Admin Account

1. Open http://localhost:5173/admin
2. Click "Register"
3. Create your account

### 5. Add Your Content

Use the API endpoints or extend the admin panel to add:
- Your profile information
- Projects
- Skills
- Work experience

## 📍 Important URLs

- **Portfolio**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin
- **Backend API**: http://localhost:5000

## 🎨 Quick Customization

### Change Colors

Edit `client/src/index.css` - look for CSS variables:

```css
:root {
  --primary: #6366f1;        /* Main color */
  --secondary: #ec4899;      /* Accent color */
  --accent: #14b8a6;         /* Highlight color */
}
```

### Update Character Colors

Edit `client/src/components/AnimatedBackground/AnimatedBackground.css`:
- Search for `rgba(99, 102, 241` to change character colors
- Modify gradient values for different effects

## 🔧 Common Issues

**MongoDB Connection Error**:
```
Error: connect ECONNREFUSED
```
→ Start MongoDB: `mongod`

**Gemini API Error**:
```
Failed to get AI response
```
→ Check API key in `.env`

**Port Already in Use**:
```
Error: listen EADDRINUSE
```
→ Change PORT in `server/.env`

## 📚 Full Documentation

See [walkthrough.md](file:///C:/Users/ALTHAF/.gemini/antigravity/brain/51ec44e6-1d59-49db-9cbc-a59f9d74e6b3/walkthrough.md) for complete documentation.

## 🎯 Next Steps

1. ✅ Get Gemini API key
2. ✅ Start MongoDB
3. ✅ Run the app
4. ✅ Create admin account
5. ✅ Add your content
6. ✅ Customize colors
7. 🚀 Deploy to production!

---

**Need help?** Check the walkthrough.md for detailed instructions!

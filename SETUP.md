# 🚀 Setup Instructions for Google Forms Clone

This guide will help you set up and run the Google Forms Clone MERN application on your local machine.

## Prerequisites

Before you start, ensure you have the following installed:
- **Node.js** v14+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **MongoDB** (local or cloud)
  - Local: [Download MongoDB Community](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free tier available)

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd "google forms"
```

## Step 2: Backend Setup

### 2.1 Navigate to Backend Directory
```bash
cd backend
```

### 2.2 Install Dependencies
```bash
npm install
```

This installs:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-origin support
- `dotenv` - Environment variables
- `nodemon` - Auto-reload during development

### 2.3 Create Environment File

Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

### 2.4 Configure MongoDB Connection

Edit `.env` and add your MongoDB connection string:

**For Local MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/google-forms
PORT=5000
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Update `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/google-forms
PORT=5000
NODE_ENV=development
```

Replace `username`, `password`, and `cluster` with your actual values.

### 2.5 Start Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

Keep this terminal running while developing.

## Step 3: Frontend Setup

### 3.1 Open a New Terminal and Navigate to Frontend

```bash
cd frontend
```

### 3.2 Install Dependencies
```bash
npm install
```

This installs:
- `react` & `react-dom` - UI library
- `react-router-dom` - Client-side routing
- `tailwindcss` - Styling
- `framer-motion` - Animations
- `lucide-react` - Icons
- `axios` - HTTP client
- `uuid` - Unique ID generation
- Vite and related dev tools

### 3.3 Create Environment File

Create a `.env` file in the frontend directory:
```bash
cp .env.example .env
```

The default configuration should work if your backend is running on `localhost:5000`. 

If you need to change it, edit `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### 3.4 Start Frontend Development Server

```bash
npm run dev
```

You should see:
```
VITE v8.0.1  ready in XXX ms

➜  Local:   http://localhost:5173/
```

## Step 4: Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

You should see the Google Forms Clone homepage!

## 🎯 Verify Everything Works

### Test Backend
```bash
curl http://localhost:5000/api/health
```

Response should be:
```json
{
  "message": "Server is running"
}
```

### Test Frontend
- ✅ Homepage loads
- ✅ "Create Form" button appears
- ✅ Can create a new form
- ✅ Can add questions

## 📁 Important Files & Directories

### Backend
```
backend/
├── server.js              # Main server file
├── .env                   # Environment variables (CREATE THIS)
├── .env.example           # Example env file
├── package.json           # Dependencies
├── controllers/
│   ├── formController.js
│   └── responseController.js
├── model/
│   ├── Form.js
│   └── Response.js
└── routes/
    ├── formRoutes.js
    └── responseRoutes.js
```

### Frontend
```
frontend/
├── .env                   # Environment variables (CREATE THIS)
├── .env.example           # Example env file
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # TailwindCSS configuration
├── postcss.config.js      # PostCSS configuration
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── components/
│   ├── pages/
│   └── services/api.js
└── index.html
```

## 🆘 Troubleshooting

### Backend Issues

**Port 5000 already in use**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

**MongoDB connection failed**
- Check if MongoDB service is running
- Verify connection string in `.env`
- Check MongoDB credentials (for Atlas)
- Ensure IP is whitelisted in MongoDB Atlas

**Dependency errors**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Frontend Issues

**Page not loading**
- Ensure backend server is running
- Check if VITE_API_URL is correct in `.env`
- Clear browser cache (Ctrl+Shift+Del)

**Styles not loading**
```bash
# Rebuild TailwindCSS
npm run build
```

**Module not found errors**
```bash
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

If you see CORS errors:
1. Ensure CORS is enabled in backend (`server.js`)
2. Check if frontend URL is allowed
3. Verify `VITE_API_URL` matches backend URL

## 🚀 Production Build

### Build Frontend
```bash
cd frontend
npm run build
```

This creates an optimized `dist` folder for deployment.

### Backend for Production
```bash
cd backend
# Set NODE_ENV=production in .env
npm start
```

## 📝 Next Steps

After setup, try:
1. ✅ Create a new form
2. ✅ Add different question types
3. ✅ Share the form link with someone
4. ✅ Submit a response
5. ✅ View responses in the dashboard
6. ✅ Download responses as CSV

## 💡 Tips

- Use `npm run dev` for development (auto-reload)
- Check console for error messages
- Keep both terminals open while developing
- Use browser DevTools for debugging
- Read error messages carefully

## 📞 Need Help?

1. Check the [README.md](./README.md) for general information
2. Review error messages in browser console
3. Check backend terminal for server errors
4. Ensure all dependencies are installed
5. Verify all `.env` files are created

## 🎉 You're All Set!

Your Google Forms Clone is now running locally. Start building and customizing!

Happy coding! 🚀

# 🔧 Quick Commands Reference

## Backend Commands

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start

# Install a specific package
npm install package-name
```

## Frontend Commands

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Development mode (Vite hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Install a specific package
npm install package-name
```

## Git Commands

```bash
# Check status
git status

# Stage changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to repository
git push

# Pull latest changes
git pull

# Create new branch
git checkout -b feature-name

# Switch branch
git checkout branch-name
```

## Project Navigation

```bash
# From root, go to backend
cd backend

# From backend, go to frontend
cd ../frontend

# From frontend, go to root
cd ..

# From root, go to frontend
cd frontend
```

## Common Issues & Fixes

### Clear npm cache
```bash
npm cache clean --force
```

### Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Kill running servers
```bash
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :5173

# Mac/Linux
lsof -i :5000
lsof -i :5173
```

### Check if ports are in use
```bash
# Windows
netstat -ano | findstr :5000

# Mac/Linux
lsof -i :5000
```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/google-forms
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Useful Terminal Commands

```bash
# Create .env from example
cp .env.example .env

# Create directory
mkdir folder-name

# List files
ls (Mac/Linux) or dir (Windows)

# Clear terminal
clear (Mac/Linux) or cls (Windows)

# Open in current directory
code . (Opens in VS Code)
```

## Testing API Endpoints

```bash
# Test backend health
curl http://localhost:5000/api/health

# Create form
curl -X POST http://localhost:5000/api/forms \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Form","description":"Test"}'

# Get all forms
curl http://localhost:5000/api/forms
```

## Browser DevTools

- **F12** or **Ctrl+Shift+I** - Open DevTools
- **Console** - Check for errors
- **Network** - Check API calls
- **Application** - Check stored data
- **Sources** - Debug JavaScript

## Performance Tips

- Clear cache before testing: **Ctrl+Shift+Del**
- Hard refresh: **Ctrl+Shift+R**
- Disable cache in DevTools (Network tab)
- Check Network tab for slow requests

## Helpful VS Code Extensions

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Thunder Client (API testing)
- MongoDB for VS Code
- Prettier - Code formatter

---

Save this file for quick reference! 📝

# Quick Start Guide

## Getting Started with J.A.R.V.I.S.

This guide will help you get J.A.R.V.I.S. up and running in minutes.

## Prerequisites Check

Before you begin, ensure you have:
- ✅ Node.js 18+ installed
- ✅ Python 3.10+ installed
- ✅ Git installed
- ✅ At least 4GB RAM available
- ✅ 5GB free disk space

## Installation Steps

### 1. Clone and Setup
```bash
# Clone the repository
git clone https://github.com/Adnanawan05/Jarvis_Ai.git
cd Jarvis_Ai

# Install Node dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt
```

### 2. Configuration (Optional)
```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your preferences
# nano .env  # or use your preferred editor
```

### 3. First Run

**Option A: Development Mode (Recommended for testing)**
```bash
# Terminal 1: Start the Python backend
python backend/server.py

# Terminal 2: Start the Electron app
npm run dev
```

**Option B: Production Build**
```bash
# Build the application
npm run build

# Run the built application
# The executable will be in the 'dist' folder
```

## First Time Setup

When you first launch J.A.R.V.I.S.:

1. **Dashboard**: You'll see the main dashboard with system monitoring
2. **Voice Setup**: Click the Voice panel to configure speech recognition
3. **Permissions**: Allow microphone access when prompted
4. **Theme**: Visit Settings to choose your preferred theme

## Basic Usage

### Voice Commands
1. Click the **Voice** panel in the sidebar
2. Click "Start Listening"
3. Say: **"Jarvis, [your command]"**

Example commands:
- "Jarvis, open Chrome"
- "Jarvis, organize my downloads"
- "Jarvis, what's my system status?"

### Manual Commands
1. Navigate to the **Voice** panel
2. Type your command in the text area
3. Click "Execute Command"

### Quick Actions
- Use the quick action buttons on the dashboard
- Click any icon for instant execution

## Troubleshooting

### Backend won't start
```bash
# Check Python version
python --version  # Should be 3.10+

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Frontend won't start
```bash
# Check Node version
node --version  # Should be 18+

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Voice recognition not working
- Ensure microphone permissions are granted
- Check browser compatibility (Chrome/Edge recommended)
- Try manual command input as alternative

### WebSocket connection failed
- Ensure backend is running on port 8000
- Check firewall settings
- Restart both frontend and backend

## Next Steps

- 📖 Read the full [User Guide](USER_GUIDE.md)
- 🎨 Customize your [Themes](README.md#themes)
- 🧩 Explore [Plugins](README.md#plugin-system)
- 💬 Join the [Community](https://github.com/Adnanawan05/Jarvis_Ai/discussions)

## Getting Help

- 🐛 Report bugs: [GitHub Issues](https://github.com/Adnanawan05/Jarvis_Ai/issues)
- 💬 Ask questions: [GitHub Discussions](https://github.com/Adnanawan05/Jarvis_Ai/discussions)
- 📧 Email support: support@jarvis-ai.com

---

**Welcome to J.A.R.V.I.S. - Your intelligent desktop companion!** 🚀

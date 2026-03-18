# How to Run JARVIS AI Desktop Application

This guide will help you run the JARVIS Desktop AI Agent on your system.

## 🚀 Quick Start (Recommended)

### For Linux/Mac/Unix:

```bash
# 1. Make scripts executable
chmod +x setup.sh run.sh

# 2. Run setup (one-time only)
./setup.sh

# 3. Start the application
./run.sh
```

### For Windows:

```batch
# 1. Run setup (one-time only)
setup.bat

# 2. Start the application
run.bat
```

---

## 📋 Prerequisites

Before running JARVIS, ensure you have:

- ✅ **Node.js 18+** - [Download here](https://nodejs.org/)
- ✅ **Python 3.10+** - [Download here](https://www.python.org/)
- ✅ **npm** (comes with Node.js)
- ✅ **pip** (comes with Python)

### Check Prerequisites:

```bash
node --version    # Should be 18.x or higher
python3 --version # Should be 3.10 or higher
npm --version     # Should be installed
```

---

## 🛠️ Setup (First Time Only)

### Automated Setup (Recommended)

**Linux/Mac:**
```bash
./setup.sh
```

**Windows:**
```batch
setup.bat
```

The setup script will:
1. ✓ Check for required software
2. ✓ Install Node.js dependencies
3. ✓ Install Python dependencies
4. ✓ Install Playwright browsers
5. ✓ Create .env configuration file
6. ✓ Create necessary directories

### Manual Setup (Alternative)

If you prefer to set up manually:

```bash
# 1. Install Node.js dependencies
npm install

# 2. Install Python dependencies
pip3 install -r requirements.txt

# 3. Install Playwright browsers (optional)
python3 -m playwright install

# 4. Create environment file
cp .env.example .env

# 5. Create directories
mkdir -p logs temp
```

---

## ▶️ Running the Application

### Option 1: Automated Run (Easiest)

**Linux/Mac:**
```bash
./run.sh
```

**Windows:**
```batch
run.bat
```

This will:
- Start the backend server
- Start the frontend application
- Open the JARVIS window
- Create log files in the `logs/` directory

**To Stop:** Press `Ctrl+C` (Linux/Mac) or close the windows (Windows)

---

### Option 2: Manual Run (Two Terminals)

**Terminal 1 - Backend Server:**
```bash
python3 backend/server.py
```

**Terminal 2 - Frontend Application:**
```bash
npm run dev
```

The Electron app window should open automatically.

---

### Option 3: Production Mode

Build and run the production version:

```bash
# Build the application
npm run build

# Run the built application
# The executable will be in the dist/ folder
```

---

## 🎯 What Happens When You Run

1. **Backend Server Starts** (Port 8000)
   - FastAPI server initializes
   - WebSocket connection ready
   - System monitoring begins

2. **Frontend Opens** (Electron Window)
   - JARVIS interface loads
   - Particle animations start
   - System health indicators appear
   - Voice recognition ready

3. **Ready to Use!**
   - Say "Jarvis" to activate voice control
   - Or type commands manually
   - Navigate through panels
   - Enjoy the cinematic experience!

---

## 📂 Directory Structure After Setup

```
Jarvis_Ai/
├── node_modules/          # Node.js dependencies (after npm install)
├── logs/                  # Application logs
│   ├── backend.log       # Backend server logs
│   └── frontend.log      # Frontend app logs
├── temp/                  # Temporary files
├── .env                   # Environment configuration
├── setup.sh / setup.bat   # Setup scripts
└── run.sh / run.bat       # Run scripts
```

---

## 🎤 First Commands to Try

Once JARVIS is running, try these commands:

### Voice Commands (say "Jarvis" first):
```
"Jarvis, what's my system status?"
"Jarvis, open Chrome"
"Jarvis, start Pomodoro timer"
"Jarvis, organize my downloads"
```

### Manual Commands (type in Voice panel):
```
Open Chrome
Play music
Organize downloads
Create backup
```

### Keyboard Shortcuts:
- `Ctrl/Cmd + K` - Focus command input
- `Ctrl/Cmd + L` - Toggle voice listening
- `Ctrl/Cmd + 1-7` - Navigate between panels

---

## 🔧 Troubleshooting

### Backend Won't Start

**Problem:** Backend server fails to start

**Solutions:**
```bash
# Check Python version
python3 --version

# Reinstall dependencies
pip3 install -r requirements.txt --force-reinstall

# Check for port conflicts
lsof -i :8000  # Linux/Mac
netstat -ano | findstr :8000  # Windows

# View backend logs
cat logs/backend.log
```

---

### Frontend Won't Start

**Problem:** Electron window doesn't open

**Solutions:**
```bash
# Check Node.js version
node --version

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# View frontend logs
cat logs/frontend.log

# Try running manually
npm run dev
```

---

### Voice Recognition Not Working

**Problem:** Voice commands not recognized

**Solutions:**
1. ✓ Grant microphone permissions when prompted
2. ✓ Use Chrome-based browser engine (built-in to Electron)
3. ✓ Check microphone settings in system preferences
4. ✓ Use manual command input as alternative
5. ✓ Say "Jarvis" clearly to activate

---

### WebSocket Connection Failed

**Problem:** "Disconnected from backend" message

**Solutions:**
```bash
# 1. Ensure backend is running
ps aux | grep "backend/server.py"  # Linux/Mac
tasklist | findstr python  # Windows

# 2. Restart backend
# Kill existing process and start again

# 3. Check firewall settings
# Ensure port 8000 is not blocked

# 4. Check backend logs
cat logs/backend.log
```

---

### Dependencies Installation Failed

**Problem:** npm install or pip install fails

**Solutions:**
```bash
# For npm issues:
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# For pip issues:
pip3 install --upgrade pip
pip3 install -r requirements.txt --no-cache-dir

# If specific package fails, install individually:
pip3 install fastapi==0.109.1
pip3 install cryptography==46.0.5
```

---

## 🌐 Port Configuration

Default ports used:
- **Backend API**: `http://localhost:8000`
- **WebSocket**: `ws://localhost:8000/ws`
- **Frontend**: Random port (Electron handles this)

To change backend port, edit `backend/server.py`:
```python
uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

## 📝 Configuration

### Environment Variables (.env)

Edit `.env` file to configure:

```bash
# OpenAI API (Optional - for advanced AI features)
OPENAI_API_KEY=your_key_here

# ElevenLabs API (Optional - for premium TTS)
ELEVENLABS_API_KEY=your_key_here

# Backend Settings
BACKEND_HOST=localhost
BACKEND_PORT=8000

# Voice Settings
WAKE_WORD=jarvis
VOICE_LANGUAGE=en-US

# Theme
THEME=dark
```

---

## 🎨 Customization

### Change Theme
1. Go to Settings panel (⚙️)
2. Select from 5 premium themes
3. Changes apply instantly

### Change Wake Word
1. Go to Settings panel
2. Voice Settings section
3. Change "Wake Word" field
4. Restart application

---

## 🔍 Monitoring & Logs

### View Logs in Real-Time

**Linux/Mac:**
```bash
# Backend logs
tail -f logs/backend.log

# Frontend logs
tail -f logs/frontend.log
```

**Windows:**
```batch
# View logs
type logs\backend.log
type logs\frontend.log
```

### Log Levels

Logs include:
- INFO: Normal operations
- WARNING: Non-critical issues
- ERROR: Critical problems
- DEBUG: Detailed information (dev mode)

---

## 🚦 Status Indicators

Watch for these indicators in the interface:

- 🟢 **Green Dot**: System online
- 🟡 **Yellow Status**: Processing/Warning
- 🔴 **Red Status**: Error/Critical
- 🔵 **Blue Glow**: Active/Listening

---

## 💡 Performance Tips

For best performance:

1. **System Resources**
   - Close unnecessary applications
   - Ensure 4GB+ RAM available
   - GPU helps with animations

2. **Network**
   - Stable internet for API features
   - Local network for device scanning

3. **Browser**
   - Chrome/Edge recommended
   - Hardware acceleration enabled

---

## 🎓 Learning Resources

- **README.md** - Full feature documentation
- **QUICKSTART.md** - Quick getting started guide
- **IMPLEMENTATION.md** - Technical implementation details
- **GitHub Issues** - Community support

---

## ✅ Verification Checklist

Before reporting issues, verify:

- [ ] Prerequisites installed (Node.js, Python)
- [ ] Setup script completed successfully
- [ ] Backend server is running (check logs)
- [ ] Frontend opened (Electron window)
- [ ] No firewall blocking ports
- [ ] Microphone permissions granted
- [ ] .env file exists

---

## 🎉 Success!

If you see:
- ✓ JARVIS window open
- ✓ Particle animations
- ✓ System health indicators
- ✓ "Online" status

**Congratulations! JARVIS is running successfully!** 🎊

Try saying: **"Jarvis, hello"** to get started!

---

## 📞 Getting Help

If you're still having issues:

1. Check [GitHub Issues](https://github.com/Adnanawan05/Jarvis_Ai/issues)
2. Join [GitHub Discussions](https://github.com/Adnanawan05/Jarvis_Ai/discussions)
3. Review logs in `logs/` directory
4. Provide error messages when asking for help

---

**Made with ❤️ by the JARVIS Team**

*"Just A Rather Very Intelligent System"*

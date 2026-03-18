# J.A.R.V.I.S. Desktop AI Agent v2.0

> **J**ust **A** **R**ather **V**ery **I**ntelligent **S**ystem

A fully interactive, cinematic desktop AI agent inspired by Iron Man's JARVIS. Built with Electron, Python, and modern web technologies.

![JARVIS Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

### 1️⃣ Main Dashboard / Home Screen
- **Control Center Interface**: Futuristic dark theme with glowing borders and animations
- **System Health Monitoring**: Real-time CPU, RAM, and battery indicators with animated progress bars
- **AI Avatar Panel**: 3D animated holographic avatar with reactive waveforms
- **Quick Action Buttons**: One-click access to frequent tasks
- **Command Log**: Color-coded task feed (success, warning, error, info)
- **Particle Background**: Animated Tron-style background with reactive particles

### 2️⃣ Voice Command Panel
- **Continuous Voice Recognition**: Always-on listening with wake word detection
- **Real-time Waveform Animation**: Visual feedback synced with voice input
- **Manual Command Input**: Type commands when voice isn't available
- **Animated "Thinking" State**: Visual feedback during command processing
- **Command Suggestions**: Quick-pick common commands

### 3️⃣ File & Project Panel
- **Embedded File Explorer**: Browse files without leaving JARVIS
- **Smart Search**: Filter files by type, name, or project
- **Drag & Drop Automation**: Drop files onto action cards to trigger automated tasks
- **File Actions**: Summarize PDFs, rename files, compress, upload to cloud
- **Smart Suggestions**: AI-powered recommendations for file management

### 4️⃣ Browser Automation Panel
- **Embedded Browser**: Playwright-powered automation
- **Visual Progress Tracking**: See automation tasks in real-time
- **Pause/Resume Controls**: Full control over automated tasks
- **Automation History**: Log of all browser tasks with timestamps
- **Smart Hints**: Context-aware suggestions for web automation

### 5️⃣ Media & Productivity Panel
- **Media Player Controls**: Play/pause/skip for music and videos
- **Pomodoro Timer**: Animated focus timer with visual countdown ring
- **System Resource Monitor**: CPU/memory usage during heavy tasks
- **Adaptive Themes**: Color schemes that react to music tempo
- **Focus Mode**: Minimize distractions for productivity

### 6️⃣ Security & Alerts Panel
- **Network Device Detection**: Monitor unauthorized devices
- **Activity Monitoring**: Track suspicious file modifications
- **Access Logging**: Webcam and microphone usage history
- **Folder Protection**: Lock sensitive folders instantly
- **Animated Alerts**: Visual and audio notifications for threats

### 7️⃣ Settings & Customization Panel
- **5 Premium Themes**: Dark, Neon Blue, Matrix, Tron, Holographic
- **Voice Configuration**: Choose TTS engine and voice
- **Wake Word Setup**: Customize activation phrase
- **Plugin Manager**: Add/remove feature modules
- **Real-time Preview**: See theme changes instantly

### 8️⃣ Interactive Command Cards
- **Drag & Drop Automation**: Visual workflow builder
- **Multi-step Chains**: Stack actions for complex automation
- **Color-coded Status**: Real-time visual feedback
- **Holographic Animations**: Cinematic effects for all actions

## 🎨 Cinematic Features

| Feature | Description |
|---------|-------------|
| **Holographic 3D Avatar** | WebGL-powered animated assistant |
| **Particle Background** | Reactive particles responding to system activity |
| **Animated Task Progress** | Gear animations for "thinking" state |
| **Mood-based Themes** | Colors adapt to voice tone and time of day |
| **Live AI Suggestions** | Predictive task recommendations |
| **Multi-panel System** | Drag, resize, hide/show panels dynamically |
| **Command Animations** | Visual effects for every action |
| **Sound Feedback** | Futuristic audio cues for events |

## 🏗️ Architecture

### Frontend (Electron + Web)
```
src/
├── index.html              # Main HTML structure
├── main.js                 # Electron main process
├── styles/
│   ├── main.css           # Core styles and variables
│   ├── dashboard.css      # Dashboard-specific styles
│   ├── panels.css         # Panel layouts
│   └── animations.css     # Keyframe animations
└── scripts/
    ├── particles.js       # Particle background engine
    ├── avatar.js          # AI avatar animation
    ├── voice.js           # Voice recognition
    ├── system-monitor.js  # System health monitoring
    ├── navigation.js      # Panel navigation
    ├── commands.js        # Command execution
    └── main.js            # App initialization
```

### Backend (Python + FastAPI)
```
backend/
├── server.py              # Main FastAPI server
├── modules/
│   ├── voice/            # Voice recognition (Whisper/Vosk)
│   ├── automation/       # Browser & OS automation
│   ├── files/            # File intelligence
│   ├── security/         # Security monitoring
│   ├── media/            # Media processing (FFmpeg)
│   └── ai/               # AI/ML features
└── storage/
    ├── memory/           # Vector database (FAISS)
    └── config/           # Settings & preferences
```

## 🚀 Installation

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.10+
- **Git**

### Step 1: Clone Repository
```bash
git clone https://github.com/Adnanawan05/Jarvis_Ai.git
cd Jarvis_Ai
```

### Step 2: Install Frontend Dependencies
```bash
npm install
```

### Step 3: Install Backend Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Setup Environment
```bash
cp .env.example .env
# Edit .env with your API keys (optional)
```

### Step 5: Install Playwright (for browser automation)
```bash
python -m playwright install
```

## 🎯 Usage

### Development Mode

**Terminal 1: Start Backend**
```bash
python backend/server.py
```

**Terminal 2: Start Frontend**
```bash
npm run dev
```

### Production Build

```bash
# Build for current platform
npm run build

# Build for specific platform
npm run build:win
npm run build:mac
npm run build:linux
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + K` | Focus command input |
| `Ctrl/Cmd + L` | Toggle voice listening |
| `Ctrl/Cmd + 1-7` | Quick panel navigation |

## 🎤 Voice Commands

### System Control
```
"Jarvis, open Chrome"
"Jarvis, close all applications"
"Jarvis, enable focus mode"
"Jarvis, scan network for devices"
```

### File Operations
```
"Jarvis, organize my downloads"
"Jarvis, summarize this PDF"
"Jarvis, backup my documents"
"Jarvis, find React projects"
```

### Productivity
```
"Jarvis, start Pomodoro timer"
"Jarvis, play some music"
"Jarvis, what's my schedule?"
"Jarvis, create a backup"
```

### Browser Automation
```
"Jarvis, create Fiverr gig"
"Jarvis, upload to YouTube"
"Jarvis, check LinkedIn messages"
"Jarvis, research AI trends"
```

## 🧩 Plugin System

JARVIS supports modular plugins for extensibility:

```javascript
// Example plugin structure
{
  "name": "trading-plugin",
  "version": "1.0.0",
  "commands": ["analyze stock", "buy crypto", "portfolio status"],
  "permissions": ["network", "storage"]
}
```

Create plugins in `/plugins` directory and JARVIS will auto-detect them.

## 🔐 Security Features

- **End-to-end encryption** for sensitive data
- **Network monitoring** for unauthorized devices
- **File integrity checking**
- **Webcam/mic access logging**
- **Automatic security updates**

## 🎨 Themes

### Available Themes
1. **Dark** - Classic dark mode with cyan accents
2. **Neon Blue** - Electric blue cyberpunk aesthetic
3. **Matrix** - Green-on-black hacker style
4. **Tron** - Light blue geometric design
5. **Holographic** - Purple gradient with shimmer effects

### Custom Themes
Edit CSS variables in `src/styles/main.css`:
```css
:root {
  --bg-primary: #0a0e1a;
  --accent-primary: #00d9ff;
  /* ... more variables */
}
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **GUI Framework** | Electron + HTML/CSS/JS |
| **Animations** | CSS3, Canvas API, WebGL |
| **Voice Recognition** | Web Speech API / OpenAI Whisper |
| **Text-to-Speech** | Web Speech API / Coqui TTS |
| **Backend** | FastAPI + Python 3.10+ |
| **Browser Automation** | Playwright |
| **OS Control** | psutil, pyautogui |
| **AI/ML** | LangChain, ChromaDB, FAISS |
| **Media Processing** | FFmpeg |
| **Database** | SQLite / TinyDB |

## 📊 System Requirements

### Minimum
- **OS**: Windows 10, macOS 10.15, or Linux (Ubuntu 20.04+)
- **RAM**: 4GB
- **CPU**: Dual-core 2.0GHz
- **Storage**: 2GB free space

### Recommended
- **RAM**: 8GB+
- **CPU**: Quad-core 3.0GHz+
- **GPU**: Dedicated GPU for better animations
- **Storage**: 5GB+ free space

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Marvel's Iron Man JARVIS
- Built with love for the AI community
- Special thanks to all contributors

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Adnanawan05/Jarvis_Ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Adnanawan05/Jarvis_Ai/discussions)
- **Email**: support@jarvis-ai.com

## 🗺️ Roadmap

### v2.1 (Coming Soon)
- [ ] Advanced AI conversation engine
- [ ] Multi-language support
- [ ] Mobile companion app
- [ ] Cloud sync for settings
- [ ] Advanced analytics dashboard

### v3.0 (Future)
- [ ] Full autonomous mode
- [ ] Custom wake word training
- [ ] AR/VR interface support
- [ ] Enterprise features
- [ ] API marketplace

---

**Made with ❤️ by the JARVIS Team**

*"Just A Rather Very Intelligent System"*

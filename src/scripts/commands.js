// Command System
class CommandSystem {
  constructor() {
    this.backendUrl = 'http://localhost:8000';
    this.websocket = null;
    this.setupCommands();
    this.connectWebSocket();
  }

  setupCommands() {
    // Quick action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        this.executeQuickAction(action);
      });
    });

    // Manual command execution
    const executeBtn = document.getElementById('executeManualCommand');
    if (executeBtn) {
      executeBtn.addEventListener('click', () => {
        const textarea = document.getElementById('manualCommandInput');
        if (textarea && textarea.value.trim()) {
          this.executeCommand(textarea.value);
          textarea.value = '';
        }
      });
    }

    // Command suggestions
    const suggestions = document.querySelectorAll('.suggestion-item');
    suggestions.forEach(item => {
      item.addEventListener('click', () => {
        const textarea = document.getElementById('manualCommandInput');
        if (textarea) {
          textarea.value = item.textContent;
        }
      });
    });

    // Theme selection
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
      option.addEventListener('click', () => {
        const theme = option.dataset.theme;
        this.changeTheme(theme);
      });
    });

    // Timer controls
    const startTimer = document.getElementById('startTimer');
    const resetTimer = document.getElementById('resetTimer');

    if (startTimer) {
      startTimer.addEventListener('click', () => this.toggleTimer());
    }

    if (resetTimer) {
      resetTimer.addEventListener('click', () => this.resetTimer());
    }
  }

  connectWebSocket() {
    try {
      this.websocket = new WebSocket('ws://localhost:8000/ws');

      this.websocket.onopen = () => {
        console.log('WebSocket connected');
        this.logCommand('Connected to backend server', 'success');
      };

      this.websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleBackendMessage(data);
      };

      this.websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.logCommand('Backend connection error', 'error');
      };

      this.websocket.onclose = () => {
        console.log('WebSocket disconnected');
        this.logCommand('Disconnected from backend', 'warning');

        // Attempt to reconnect after 5 seconds
        setTimeout(() => this.connectWebSocket(), 5000);
      };
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
    }
  }

  async executeCommand(command) {
    this.logCommand(`Executing: ${command}`, 'info');

    if (window.AIAvatar) {
      window.AIAvatar.setMode('thinking');
    }

    try {
      // Send to backend via WebSocket
      if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
        this.websocket.send(JSON.stringify({
          type: 'command',
          command: command
        }));
      } else {
        // Fallback to HTTP request
        const response = await fetch(`${this.backendUrl}/api/command`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ command })
        });

        const result = await response.json();
        this.handleCommandResult(result);
      }
    } catch (error) {
      console.error('Command execution error:', error);
      this.logCommand(`Error: ${error.message}`, 'error');

      if (window.AIAvatar) {
        window.AIAvatar.setMode('idle');
      }
    }
  }

  executeQuickAction(action) {
    const actionCommands = {
      'open-chrome': 'Open Google Chrome',
      'play-music': 'Play music',
      'organize-files': 'Organize my downloads folder',
      'fiverr-gig': 'Create a new Fiverr gig',
      'youtube': 'Open YouTube',
      'focus-mode': 'Enable focus mode',
      'backup': 'Create backup of important files',
      'scan-network': 'Scan network for devices'
    };

    const command = actionCommands[action] || action;
    this.executeCommand(command);
  }

  handleBackendMessage(data) {
    if (data.type === 'command_result') {
      this.handleCommandResult(data);
    } else if (data.type === 'system_update') {
      this.handleSystemUpdate(data);
    } else if (data.type === 'notification') {
      this.showNotification(data);
    }
  }

  handleCommandResult(result) {
    const status = result.success ? 'success' : 'error';
    this.logCommand(result.message || 'Command completed', status);

    if (result.data && result.data.message) {
      const avatarMessage = document.getElementById('avatarMessage');
      if (avatarMessage) {
        avatarMessage.textContent = result.data.message;
      }
    }

    if (window.AIAvatar) {
      window.AIAvatar.setMode('idle');
    }

    // Update tasks completed counter
    if (result.success) {
      const counter = document.getElementById('tasksCompleted');
      if (counter) {
        const current = parseInt(counter.textContent) || 0;
        counter.textContent = current + 1;
      }
    }
  }

  handleSystemUpdate(data) {
    // Handle system updates from backend
    console.log('System update:', data);
  }

  showNotification(data) {
    this.logCommand(data.message, data.level || 'info');
  }

  logCommand(message, type = 'info') {
    const logElement = document.getElementById('commandLog');
    if (!logElement) return;

    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;

    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const icons = {
      success: '✓',
      error: '✗',
      warning: '⚠',
      info: 'ℹ'
    };

    entry.innerHTML = `
      <span class="log-time">${time}</span>
      <span class="log-icon">${icons[type] || 'ℹ'}</span>
      <span class="log-text">${message}</span>
    `;

    logElement.insertBefore(entry, logElement.firstChild);

    // Limit to 50 entries
    while (logElement.children.length > 50) {
      logElement.removeChild(logElement.lastChild);
    }
  }

  changeTheme(themeName) {
    const root = document.documentElement;

    const themes = {
      dark: {
        primary: '#0a0e1a',
        secondary: '#12182b',
        tertiary: '#1a2338',
        accent: '#00d9ff'
      },
      neon: {
        primary: '#001a33',
        secondary: '#002952',
        tertiary: '#003d75',
        accent: '#0066cc'
      },
      matrix: {
        primary: '#000000',
        secondary: '#001100',
        tertiary: '#002200',
        accent: '#00ff00'
      },
      tron: {
        primary: '#000033',
        secondary: '#001166',
        tertiary: '#002299',
        accent: '#00ccff'
      },
      holographic: {
        primary: '#1a0033',
        secondary: '#330066',
        tertiary: '#4d0099',
        accent: '#cc00ff'
      }
    };

    const theme = themes[themeName];
    if (theme) {
      root.style.setProperty('--bg-primary', theme.primary);
      root.style.setProperty('--bg-secondary', theme.secondary);
      root.style.setProperty('--bg-tertiary', theme.tertiary);
      root.style.setProperty('--accent-primary', theme.accent);

      // Update active theme button
      document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.theme === themeName) {
          option.classList.add('active');
        }
      });

      this.logCommand(`Theme changed to ${themeName}`, 'success');
    }
  }

  // Timer functionality
  timerInterval = null;
  timerSeconds = 25 * 60; // 25 minutes
  timerRunning = false;

  toggleTimer() {
    const btn = document.getElementById('startTimer');
    if (this.timerRunning) {
      this.stopTimer();
      if (btn) btn.textContent = 'Start';
    } else {
      this.startTimer();
      if (btn) btn.textContent = 'Pause';
    }
  }

  startTimer() {
    this.timerRunning = true;
    this.timerInterval = setInterval(() => {
      this.timerSeconds--;
      this.updateTimerDisplay();

      if (this.timerSeconds <= 0) {
        this.stopTimer();
        this.logCommand('Pomodoro session completed!', 'success');
      }
    }, 1000);
  }

  stopTimer() {
    this.timerRunning = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  resetTimer() {
    this.stopTimer();
    this.timerSeconds = 25 * 60;
    this.updateTimerDisplay();

    const btn = document.getElementById('startTimer');
    if (btn) btn.textContent = 'Start';
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.timerSeconds / 60);
    const seconds = this.timerSeconds % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const timerText = document.getElementById('timerText');
    if (timerText) {
      timerText.textContent = display;
    }

    // Update ring
    const ring = document.getElementById('timerRingFill');
    if (ring) {
      const progress = this.timerSeconds / (25 * 60);
      const circumference = 2 * Math.PI * 90;
      const offset = circumference * (1 - progress);
      ring.style.strokeDashoffset = offset;
    }
  }
}

// Initialize command system
let commandSystem;
document.addEventListener('DOMContentLoaded', () => {
  commandSystem = new CommandSystem();
  window.commandSystem = commandSystem;
});

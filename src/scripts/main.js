// Main Application Entry Point
class JarvisApp {
  constructor() {
    this.version = '2.0.0';
    this.initialized = false;

    this.init();
  }

  async init() {
    console.log(`J.A.R.V.I.S. Desktop Agent v${this.version}`);
    console.log('Initializing systems...');

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.startup());
    } else {
      this.startup();
    }
  }

  startup() {
    // Display welcome message
    this.displayWelcome();

    // Initialize all systems
    this.initializeSystems();

    // Setup global keyboard shortcuts
    this.setupKeyboardShortcuts();

    // Setup file drag and drop
    this.setupDragAndDrop();

    // Mark as initialized
    this.initialized = true;

    console.log('J.A.R.V.I.S. initialized successfully');
  }

  displayWelcome() {
    const avatarMessage = document.getElementById('avatarMessage');
    if (avatarMessage) {
      const hour = new Date().getHours();
      let greeting = 'Good evening';
      if (hour < 12) greeting = 'Good morning';
      else if (hour < 18) greeting = 'Good afternoon';

      const username = 'Sir'; // This could be fetched from settings
      avatarMessage.textContent = `${greeting}, ${username}. J.A.R.V.I.S. is now online and ready to assist you.`;
    }
  }

  initializeSystems() {
    // All systems are initialized by their respective modules
    // This is a placeholder for any additional initialization
    console.log('All systems operational');
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K: Focus command input
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const commandInput = document.getElementById('manualCommandInput');
        if (commandInput) {
          // Switch to voice panel
          const voiceNav = document.querySelector('[data-panel="voice"]');
          if (voiceNav) voiceNav.click();

          setTimeout(() => commandInput.focus(), 100);
        }
      }

      // Ctrl/Cmd + L: Toggle voice listening
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        const toggleBtn = document.getElementById('toggleListening');
        if (toggleBtn) toggleBtn.click();
      }

      // Ctrl/Cmd + 1-7: Quick panel navigation
      if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '7') {
        e.preventDefault();
        const panels = ['dashboard', 'voice', 'files', 'browser', 'media', 'security', 'settings'];
        const index = parseInt(e.key) - 1;
        const navItem = document.querySelector(`[data-panel="${panels[index]}"]`);
        if (navItem) navItem.click();
      }
    });
  }

  setupDragAndDrop() {
    // Setup drag and drop for files
    const fileActionCards = document.querySelectorAll('.action-card');

    fileActionCards.forEach(card => {
      card.addEventListener('dragover', (e) => {
        e.preventDefault();
        card.style.borderColor = 'var(--accent-secondary)';
        card.style.transform = 'scale(1.05)';
      });

      card.addEventListener('dragleave', () => {
        card.style.borderColor = 'var(--accent-primary)';
        card.style.transform = 'scale(1)';
      });

      card.addEventListener('drop', (e) => {
        e.preventDefault();
        card.style.borderColor = 'var(--accent-primary)';
        card.style.transform = 'scale(1)';

        const files = Array.from(e.dataTransfer.files);
        this.handleFileDrop(files, card);
      });
    });

    // Prevent default drag behavior on document
    document.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    document.addEventListener('drop', (e) => {
      e.preventDefault();
    });
  }

  handleFileDrop(files, targetCard) {
    const action = targetCard.querySelector('.card-label').textContent;

    if (window.commandSystem) {
      files.forEach(file => {
        const command = `${action} "${file.path || file.name}"`;
        window.commandSystem.logCommand(`File dropped: ${file.name} → ${action}`, 'info');
        window.commandSystem.executeCommand(command);
      });
    }
  }

  // Public API methods
  executeCommand(command) {
    if (window.commandSystem) {
      window.commandSystem.executeCommand(command);
    }
  }

  switchPanel(panelName) {
    const navItem = document.querySelector(`[data-panel="${panelName}"]`);
    if (navItem) navItem.click();
  }

  setTheme(themeName) {
    if (window.commandSystem) {
      window.commandSystem.changeTheme(themeName);
    }
  }
}

// Create global instance
const jarvisApp = new JarvisApp();
window.JarvisApp = jarvisApp;

// Expose global API
window.Jarvis = {
  version: jarvisApp.version,
  execute: (command) => jarvisApp.executeCommand(command),
  navigate: (panel) => jarvisApp.switchPanel(panel),
  theme: (name) => jarvisApp.setTheme(name)
};

console.log('J.A.R.V.I.S. Desktop Agent loaded');
console.log('Use window.Jarvis API to interact programmatically');

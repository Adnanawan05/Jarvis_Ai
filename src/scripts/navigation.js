// Navigation System
class Navigation {
  constructor() {
    this.currentPanel = 'dashboard';
    this.setupNavigation();
  }

  setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const panel = item.dataset.panel;
        this.switchPanel(panel);
      });
    });
  }

  switchPanel(panelName) {
    // Hide all panels
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
      panel.classList.remove('active');
    });

    // Show selected panel
    const targetPanel = document.getElementById(`panel-${panelName}`);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }

    // Update nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.dataset.panel === panelName) {
        item.classList.add('active');
      }
    });

    this.currentPanel = panelName;

    // Log navigation
    this.logNavigation(panelName);
  }

  logNavigation(panelName) {
    const logElement = document.getElementById('commandLog');
    if (!logElement) return;

    const entry = document.createElement('div');
    entry.className = 'log-entry info';

    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const panelNames = {
      dashboard: 'Dashboard',
      voice: 'Voice Control',
      files: 'File Explorer',
      browser: 'Browser Automation',
      media: 'Media & Productivity',
      security: 'Security',
      settings: 'Settings'
    };

    entry.innerHTML = `
      <span class="log-time">${time}</span>
      <span class="log-icon">📍</span>
      <span class="log-text">Navigated to ${panelNames[panelName]}</span>
    `;

    logElement.insertBefore(entry, logElement.firstChild);

    // Limit to 50 entries
    while (logElement.children.length > 50) {
      logElement.removeChild(logElement.lastChild);
    }
  }
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
});

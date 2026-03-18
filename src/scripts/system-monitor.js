// System Monitor - CPU, RAM, Battery
class SystemMonitor {
  constructor() {
    this.updateInterval = 2000; // Update every 2 seconds
    this.startTime = Date.now();

    this.startMonitoring();
    this.updateDateTime();
  }

  startMonitoring() {
    this.updateSystemInfo();
    setInterval(() => this.updateSystemInfo(), this.updateInterval);
    setInterval(() => this.updateDateTime(), 1000);
  }

  async updateSystemInfo() {
    // In a real implementation, this would fetch data from the Python backend
    // For now, we'll simulate the data

    // Simulate CPU usage
    const cpuUsage = Math.floor(Math.random() * 30) + 20; // 20-50%
    this.updateHealthBar('cpu', cpuUsage);

    // Simulate RAM usage
    const ramUsage = Math.floor(Math.random() * 40) + 40; // 40-80%
    this.updateHealthBar('ram', ramUsage);

    // Simulate Battery
    const batteryUsage = Math.floor(Math.random() * 20) + 75; // 75-95%
    this.updateHealthBar('battery', batteryUsage);

    // Update uptime
    this.updateUptime();
  }

  updateHealthBar(type, percentage) {
    const fill = document.getElementById(`${type}Fill`);
    const value = document.getElementById(`${type}Value`);

    if (fill && value) {
      fill.style.width = `${percentage}%`;
      value.textContent = `${percentage}%`;

      // Change color based on usage
      let color = 'var(--accent-primary)';
      if (type === 'battery') {
        if (percentage < 20) color = 'var(--error)';
        else if (percentage < 40) color = 'var(--warning)';
        else color = 'var(--success)';
      } else {
        if (percentage > 80) color = 'var(--error)';
        else if (percentage > 60) color = 'var(--warning)';
        else color = 'var(--success)';
      }

      fill.style.background = color;
    }
  }

  updateUptime() {
    const uptimeElement = document.getElementById('systemUptime');
    if (!uptimeElement) return;

    const uptime = Date.now() - this.startTime;
    const hours = Math.floor(uptime / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));

    uptimeElement.textContent = `${hours}h ${minutes}m`;
  }

  updateDateTime() {
    const timeElement = document.getElementById('timeDisplay');
    const dateElement = document.getElementById('dateDisplay');

    if (timeElement) {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      timeElement.textContent = time;
    }

    if (dateElement) {
      const now = new Date();
      const date = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      dateElement.textContent = date;
    }
  }
}

// Initialize system monitor
document.addEventListener('DOMContentLoaded', () => {
  new SystemMonitor();
});

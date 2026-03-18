// AI Avatar Animation
class AIAvatar {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.radius = 80;
    this.points = 60;
    this.rotation = 0;
    this.pulseOffset = 0;
    this.mode = 'idle'; // idle, listening, thinking, speaking

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
  }

  setMode(mode) {
    this.mode = mode;
    const statusElement = document.getElementById('avatarStatus');
    if (statusElement) {
      const statusText = {
        idle: 'Ready',
        listening: 'Listening',
        thinking: 'Processing',
        speaking: 'Speaking'
      };
      statusElement.textContent = statusText[mode] || 'Ready';
    }
  }

  drawWaveform(intensity = 1) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw outer rings
    for (let ring = 0; ring < 3; ring++) {
      this.ctx.beginPath();
      const radiusMultiplier = 1 + (ring * 0.3);

      for (let i = 0; i <= this.points; i++) {
        const angle = (i / this.points) * Math.PI * 2 + this.rotation;
        const noise = Math.sin(angle * 3 + this.pulseOffset) * 10 * intensity;
        const r = this.radius * radiusMultiplier + noise;
        const x = this.centerX + Math.cos(angle) * r;
        const y = this.centerY + Math.sin(angle) * r;

        if (i === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }

      this.ctx.closePath();
      this.ctx.strokeStyle = `rgba(0, 217, 255, ${0.6 - ring * 0.2})`;
      this.ctx.lineWidth = 2;
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = 'rgba(0, 217, 255, 0.8)';
      this.ctx.stroke();
    }

    // Draw center core
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, 20 + Math.sin(this.pulseOffset) * 5, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(0, 217, 255, 0.8)';
    this.ctx.shadowBlur = 30;
    this.ctx.shadowColor = 'rgba(0, 217, 255, 1)';
    this.ctx.fill();
  }

  drawThinking() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw rotating gears
    const gearCount = 3;
    for (let g = 0; g < gearCount; g++) {
      const gearRadius = 40 + g * 30;
      const rotation = this.rotation * (g % 2 === 0 ? 1 : -1);

      this.ctx.save();
      this.ctx.translate(this.centerX, this.centerY);
      this.ctx.rotate(rotation);

      // Draw gear teeth
      this.ctx.beginPath();
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const x1 = Math.cos(angle) * gearRadius;
        const y1 = Math.sin(angle) * gearRadius;
        const x2 = Math.cos(angle) * (gearRadius + 10);
        const y2 = Math.sin(angle) * (gearRadius + 10);

        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
      }

      this.ctx.strokeStyle = `rgba(0, 217, 255, ${0.8 - g * 0.2})`;
      this.ctx.lineWidth = 2;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = 'rgba(0, 217, 255, 0.6)';
      this.ctx.stroke();

      // Draw gear center
      this.ctx.beginPath();
      this.ctx.arc(0, 0, gearRadius * 0.6, 0, Math.PI * 2);
      this.ctx.stroke();

      this.ctx.restore();
    }
  }

  animate() {
    const intensity = this.mode === 'listening' ? 2 :
                     this.mode === 'speaking' ? 1.5 :
                     this.mode === 'thinking' ? 1 : 0.5;

    if (this.mode === 'thinking') {
      this.drawThinking();
    } else {
      this.drawWaveform(intensity);
    }

    this.rotation += 0.01;
    this.pulseOffset += 0.05;

    requestAnimationFrame(() => this.animate());
  }

  start() {
    this.animate();
  }
}

// Initialize avatar when DOM is loaded
let avatar;
document.addEventListener('DOMContentLoaded', () => {
  avatar = new AIAvatar('avatarCanvas');
  if (avatar.canvas) {
    avatar.start();
  }
});

// Export for use in other modules
window.AIAvatar = avatar;

// Voice Recognition and Waveform Visualization
class VoiceControl {
  constructor() {
    this.isListening = false;
    this.recognition = null;
    this.canvas = document.getElementById('voiceWaveform');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.audioContext = null;
    this.analyser = null;
    this.dataArray = null;
    this.bufferLength = 0;

    this.initRecognition();
    this.initCanvas();
    this.setupEventListeners();
  }

  initRecognition() {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.updateStatus('Listening...');
        if (window.AIAvatar) {
          window.AIAvatar.setMode('listening');
        }
      };

      this.recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');

        this.displayTranscript(transcript);

        // Check for wake word
        if (transcript.toLowerCase().includes('jarvis')) {
          this.processCommand(transcript);
        }
      };

      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        this.updateStatus(`Error: ${event.error}`);
      };

      this.recognition.onend = () => {
        if (this.isListening) {
          this.recognition.start(); // Restart if still listening
        } else {
          this.updateStatus('Say "Jarvis" to activate');
          if (window.AIAvatar) {
            window.AIAvatar.setMode('idle');
          }
        }
      };
    } else {
      console.warn('Speech recognition not supported in this browser');
      this.updateStatus('Voice recognition not supported');
    }
  }

  initCanvas() {
    if (!this.canvas) return;

    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;

    window.addEventListener('resize', () => {
      const rect = this.canvas.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
    });

    this.animateWaveform();
  }

  setupEventListeners() {
    const toggleBtn = document.getElementById('toggleListening');
    const clearBtn = document.getElementById('clearTranscript');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleListening());
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearTranscript());
    }
  }

  toggleListening() {
    const btn = document.getElementById('toggleListening');
    const btnLabel = btn ? btn.querySelector('.btn-label') : null;

    if (this.isListening) {
      this.stopListening();
      if (btnLabel) btnLabel.textContent = 'Start Listening';
    } else {
      this.startListening();
      if (btnLabel) btnLabel.textContent = 'Stop Listening';
    }
  }

  startListening() {
    if (this.recognition) {
      this.isListening = true;
      this.recognition.start();

      const indicator = document.getElementById('listeningIndicator');
      if (indicator) {
        indicator.style.animation = 'pulse 2s infinite';
      }
    }
  }

  stopListening() {
    if (this.recognition) {
      this.isListening = false;
      this.recognition.stop();

      const indicator = document.getElementById('listeningIndicator');
      if (indicator) {
        indicator.style.animation = 'none';
      }
    }
  }

  updateStatus(text) {
    const statusElement = document.getElementById('voiceStatusText');
    if (statusElement) {
      statusElement.textContent = text;
    }
  }

  displayTranscript(text) {
    const transcriptElement = document.getElementById('voiceTranscript');
    if (transcriptElement) {
      const placeholder = transcriptElement.querySelector('.transcript-placeholder');
      if (placeholder) {
        placeholder.remove();
      }

      const p = document.createElement('p');
      p.textContent = text;
      p.style.marginBottom = '0.5rem';
      p.style.color = 'var(--text-primary)';
      transcriptElement.appendChild(p);

      // Scroll to bottom
      transcriptElement.scrollTop = transcriptElement.scrollHeight;
    }
  }

  clearTranscript() {
    const transcriptElement = document.getElementById('voiceTranscript');
    if (transcriptElement) {
      transcriptElement.innerHTML = '<p class="transcript-placeholder">Your speech will appear here...</p>';
    }
  }

  processCommand(transcript) {
    if (window.AIAvatar) {
      window.AIAvatar.setMode('thinking');
    }

    // Log command
    this.logCommand(transcript);

    // Send to backend for processing
    if (window.commandSystem) {
      window.commandSystem.executeCommand(transcript);
    }

    // Reset to listening after a delay
    setTimeout(() => {
      if (window.AIAvatar) {
        window.AIAvatar.setMode('listening');
      }
    }, 2000);
  }

  logCommand(command) {
    const logElement = document.getElementById('commandLog');
    if (!logElement) return;

    const entry = document.createElement('div');
    entry.className = 'log-entry info';

    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    entry.innerHTML = `
      <span class="log-time">${time}</span>
      <span class="log-icon">🎤</span>
      <span class="log-text">${command}</span>
    `;

    logElement.insertBefore(entry, logElement.firstChild);

    // Limit to 50 entries
    while (logElement.children.length > 50) {
      logElement.removeChild(logElement.lastChild);
    }
  }

  animateWaveform() {
    if (!this.ctx) return;

    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerY = height / 2;

    this.ctx.clearRect(0, 0, width, height);

    // Draw waveform
    this.ctx.beginPath();
    this.ctx.moveTo(0, centerY);

    const amplitude = this.isListening ? 30 : 10;
    const frequency = 0.02;
    const time = Date.now() * 0.001;

    for (let x = 0; x < width; x++) {
      const y = centerY + Math.sin(x * frequency + time) * amplitude * Math.sin(x * 0.01);
      this.ctx.lineTo(x, y);
    }

    this.ctx.strokeStyle = 'rgba(0, 217, 255, 0.8)';
    this.ctx.lineWidth = 2;
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = 'rgba(0, 217, 255, 0.8)';
    this.ctx.stroke();

    requestAnimationFrame(() => this.animateWaveform());
  }
}

// Initialize voice control
let voiceControl;
document.addEventListener('DOMContentLoaded', () => {
  voiceControl = new VoiceControl();
});

window.VoiceControl = voiceControl;

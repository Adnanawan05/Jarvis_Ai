const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let pythonProcess;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: Math.floor(width * 0.9),
    height: Math.floor(height * 0.9),
    minWidth: 1200,
    minHeight: 800,
    frame: true,
    backgroundColor: '#0a0e1a',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webviewTag: true
    },
    icon: path.join(__dirname, '../assets/icon.png'),
    show: false
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function startPythonBackend() {
  const pythonScript = path.join(__dirname, '../backend/server.py');

  pythonProcess = spawn('python', [pythonScript], {
    stdio: 'pipe'
  });

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python Backend: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Backend Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python Backend exited with code ${code}`);
  });
}

app.on('ready', () => {
  createWindow();
  startPythonBackend();
});

app.on('window-all-closed', () => {
  if (pythonProcess) {
    pythonProcess.kill();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('before-quit', () => {
  if (pythonProcess) {
    pythonProcess.kill();
  }
});

// IPC Handlers
ipcMain.on('execute-command', (event, command) => {
  console.log('Command received:', command);
  // Forward to Python backend
  event.reply('command-response', { status: 'processing', command });
});

ipcMain.on('get-system-info', (event) => {
  const cpuUsage = process.getCPUUsage();
  const memoryUsage = process.getSystemMemoryInfo();
  event.reply('system-info-response', {
    cpu: cpuUsage,
    memory: memoryUsage
  });
});

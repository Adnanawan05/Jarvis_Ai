"""
J.A.R.V.I.S. Backend Server
FastAPI server for handling commands and system operations
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import json
import logging
from typing import List, Dict, Any
import psutil
import platform
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(title="J.A.R.V.I.S. Backend", version="2.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Active WebSocket connections
active_connections: List[WebSocket] = []

# Models
class Command(BaseModel):
    command: str
    parameters: Dict[str, Any] = {}

class CommandResponse(BaseModel):
    success: bool
    message: str
    data: Dict[str, Any] = {}

# WebSocket Manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info(f"Client connected. Total connections: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        logger.info(f"Client disconnected. Total connections: {len(self.active_connections)}")

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception as e:
                logger.error(f"Error broadcasting message: {e}")

manager = ConnectionManager()

# System Information
class SystemInfo:
    @staticmethod
    def get_cpu_usage():
        return psutil.cpu_percent(interval=1)

    @staticmethod
    def get_memory_usage():
        memory = psutil.virtual_memory()
        return {
            "total": memory.total,
            "available": memory.available,
            "percent": memory.percent,
            "used": memory.used
        }

    @staticmethod
    def get_battery_info():
        battery = psutil.sensors_battery()
        if battery:
            return {
                "percent": battery.percent,
                "power_plugged": battery.power_plugged,
                "secsleft": battery.secsleft
            }
        return {"percent": 100, "power_plugged": True, "secsleft": None}

    @staticmethod
    def get_system_info():
        return {
            "platform": platform.system(),
            "platform_release": platform.release(),
            "platform_version": platform.version(),
            "architecture": platform.machine(),
            "processor": platform.processor(),
            "ram": f"{psutil.virtual_memory().total / (1024**3):.2f} GB"
        }

# Command Processor
class CommandProcessor:
    def __init__(self):
        self.commands = {
            "open": self.open_application,
            "close": self.close_application,
            "organize": self.organize_files,
            "play": self.play_media,
            "stop": self.stop_media,
            "create": self.create_content,
            "search": self.search_web,
            "scan": self.scan_network,
            "backup": self.backup_files,
            "summarize": self.summarize_document,
            "help": self.show_help
        }

    async def process(self, command_text: str) -> CommandResponse:
        """Process a natural language command"""
        command_text = command_text.lower().strip()
        logger.info(f"Processing command: {command_text}")

        # Parse command
        parts = command_text.split()
        if not parts:
            return CommandResponse(
                success=False,
                message="Empty command received"
            )

        action = parts[0]

        # Find matching command handler
        for cmd_key, handler in self.commands.items():
            if cmd_key in command_text:
                try:
                    result = await handler(command_text)
                    return result
                except Exception as e:
                    logger.error(f"Error executing command: {e}")
                    return CommandResponse(
                        success=False,
                        message=f"Error executing command: {str(e)}"
                    )

        # Default response if no handler found
        return CommandResponse(
            success=True,
            message=f"Command '{command_text}' recognized but not yet implemented",
            data={"command": command_text}
        )

    async def open_application(self, command: str) -> CommandResponse:
        """Open an application"""
        app_name = command.replace("open", "").strip()
        logger.info(f"Opening application: {app_name}")

        return CommandResponse(
            success=True,
            message=f"Opening {app_name}...",
            data={"action": "open", "application": app_name}
        )

    async def close_application(self, command: str) -> CommandResponse:
        """Close an application"""
        app_name = command.replace("close", "").strip()
        logger.info(f"Closing application: {app_name}")

        return CommandResponse(
            success=True,
            message=f"Closing {app_name}...",
            data={"action": "close", "application": app_name}
        )

    async def organize_files(self, command: str) -> CommandResponse:
        """Organize files in a directory"""
        logger.info("Organizing files")

        return CommandResponse(
            success=True,
            message="File organization started",
            data={"action": "organize"}
        )

    async def play_media(self, command: str) -> CommandResponse:
        """Play media"""
        media = command.replace("play", "").strip()
        logger.info(f"Playing media: {media}")

        return CommandResponse(
            success=True,
            message=f"Playing {media}",
            data={"action": "play", "media": media}
        )

    async def stop_media(self, command: str) -> CommandResponse:
        """Stop media playback"""
        logger.info("Stopping media")

        return CommandResponse(
            success=True,
            message="Media stopped",
            data={"action": "stop"}
        )

    async def create_content(self, command: str) -> CommandResponse:
        """Create content (Fiverr gig, document, etc.)"""
        content = command.replace("create", "").strip()
        logger.info(f"Creating content: {content}")

        return CommandResponse(
            success=True,
            message=f"Creating {content}",
            data={"action": "create", "content": content}
        )

    async def search_web(self, command: str) -> CommandResponse:
        """Search the web"""
        query = command.replace("search", "").strip()
        logger.info(f"Searching: {query}")

        return CommandResponse(
            success=True,
            message=f"Searching for: {query}",
            data={"action": "search", "query": query}
        )

    async def scan_network(self, command: str) -> CommandResponse:
        """Scan network for devices"""
        logger.info("Scanning network")

        return CommandResponse(
            success=True,
            message="Network scan started",
            data={"action": "scan"}
        )

    async def backup_files(self, command: str) -> CommandResponse:
        """Backup files"""
        logger.info("Starting backup")

        return CommandResponse(
            success=True,
            message="Backup started",
            data={"action": "backup"}
        )

    async def summarize_document(self, command: str) -> CommandResponse:
        """Summarize a document"""
        document = command.replace("summarize", "").strip()
        logger.info(f"Summarizing document: {document}")

        return CommandResponse(
            success=True,
            message=f"Summarizing {document}",
            data={"action": "summarize", "document": document}
        )

    async def show_help(self, command: str) -> CommandResponse:
        """Show help information"""
        return CommandResponse(
            success=True,
            message="Available commands: open, close, organize, play, stop, create, search, scan, backup, summarize",
            data={"action": "help"}
        )

# Initialize command processor
processor = CommandProcessor()

# API Routes
@app.get("/")
async def root():
    return {
        "name": "J.A.R.V.I.S. Backend",
        "version": "2.0.0",
        "status": "online"
    }

@app.get("/api/system/info")
async def get_system_info():
    """Get system information"""
    return {
        "cpu": SystemInfo.get_cpu_usage(),
        "memory": SystemInfo.get_memory_usage(),
        "battery": SystemInfo.get_battery_info(),
        "system": SystemInfo.get_system_info()
    }

@app.post("/api/command")
async def execute_command(command: Command) -> CommandResponse:
    """Execute a command"""
    result = await processor.process(command.command)
    return result

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time communication"""
    await manager.connect(websocket)

    try:
        # Send initial system info
        system_info = {
            "type": "system_update",
            "data": {
                "cpu": SystemInfo.get_cpu_usage(),
                "memory": SystemInfo.get_memory_usage(),
                "battery": SystemInfo.get_battery_info()
            }
        }
        await manager.send_personal_message(json.dumps(system_info), websocket)

        # Start system monitoring task
        monitor_task = asyncio.create_task(system_monitor(websocket))

        while True:
            # Receive message from client
            data = await websocket.receive_text()
            message = json.loads(data)

            if message.get("type") == "command":
                # Process command
                result = await processor.process(message.get("command", ""))

                # Send response
                response = {
                    "type": "command_result",
                    "success": result.success,
                    "message": result.message,
                    "data": result.data
                }
                await manager.send_personal_message(json.dumps(response), websocket)

    except WebSocketDisconnect:
        manager.disconnect(websocket)
        monitor_task.cancel()
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        manager.disconnect(websocket)

async def system_monitor(websocket: WebSocket):
    """Monitor system and send updates"""
    try:
        while True:
            await asyncio.sleep(5)  # Update every 5 seconds

            system_info = {
                "type": "system_update",
                "timestamp": datetime.now().isoformat(),
                "data": {
                    "cpu": SystemInfo.get_cpu_usage(),
                    "memory": SystemInfo.get_memory_usage(),
                    "battery": SystemInfo.get_battery_info()
                }
            }

            await manager.send_personal_message(json.dumps(system_info), websocket)
    except asyncio.CancelledError:
        pass
    except Exception as e:
        logger.error(f"System monitor error: {e}")

# Run server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")

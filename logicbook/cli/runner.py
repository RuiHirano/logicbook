import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../core'))

from .utils import Color
from ..core.server import app
import uvicorn
color = Color()

class Runner:
    def __init__(self):
        pass

    def run_server(self):
        print(color.green("Starting backend server"))
        uvicorn.run(app, host="0.0.0.0", port=8000)
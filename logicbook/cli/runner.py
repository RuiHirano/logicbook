import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../core'))

from pathlib import Path
import json
from .utils import Color
from ..core.server import app
import uvicorn
import webbrowser

color = Color()
project_path = Path(os.getcwd()).resolve()
ui_build_dir = Path(os.path.dirname(__file__)).joinpath("../ui/build").resolve()
class Runner:
    def __init__(self):
        pass

    def check_exist_config(self):
        # check .logicbook and config in root
        if not project_path.joinpath('.logicbook').exists():
            color.red("Error: .logicbook dir not found")
            sys.exit(1)
        if not project_path.joinpath('.logicbook/config.yaml').exists():
            color.red("Error: config.yaml not found in .logicbook dir")
            sys.exit(1)

    def run_server(self, port):
        self.check_exist_config()
        color.green("Starting the logicbook server at http://localhost:{}".format(port))
        webbrowser.open("http://localhost:{}".format(port))
        uvicorn.run(app, host="0.0.0.0", port=port, log_level="error")
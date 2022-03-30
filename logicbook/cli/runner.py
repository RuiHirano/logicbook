import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../core'))
print(sys.path)
from pathlib import Path
from .utils import Color
from ..core.app import App
import importlib

color = Color()
project_path = Path(os.getcwd()).resolve()
class Runner:
    def __init__(self):
        pass

    def check_exist_logicbook(self):
        # check .logicbook and config in root
        if not project_path.joinpath('.logicbook').exists():
            color.red("Error: .logicbook dir not found")
            sys.exit(1)
        if not project_path.joinpath('.logicbook/config.yaml').exists():
            color.red("Error: config.yaml not found in .logicbook dir")
            sys.exit(1)
        if not project_path.joinpath('.logicbook/app.py').exists():
            color.red("Error: app.py not found in .logicbook dir")
            sys.exit(1)

    def run_server(self, port):
        self.check_exist_logicbook()
        module = importlib.import_module("app", project_path)
        color.green("Starting the logicbook server at http://localhost:{}".format(port))
        for name in dir(module):
            if isinstance(getattr(module, name), App):
                app = getattr(module, name)
                app.run(port=port)

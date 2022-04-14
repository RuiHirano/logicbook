import os
import sys
from pathlib import Path
sys.path.append(str(Path(os.path.dirname(__file__)).joinpath('../core').resolve()))
from .utils import Color
from ..core.app import App
import importlib

color = Color()
project_path = Path(os.getcwd()).resolve()
sys.path.append(str(project_path.joinpath('.logicbook').resolve()))
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
        import importlib.util
        spec = importlib.util.spec_from_file_location("app", project_path.joinpath(".logicbook/app.py"))
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        
        color.green("Starting the logicbook server at http://localhost:{}".format(port))
        for name in dir(module):
            if isinstance(getattr(module, name), App):
                app = getattr(module, name)
                app.run(host="localhost", port=port)

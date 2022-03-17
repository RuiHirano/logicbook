
import subprocess
import os
from pathlib import Path
from .utils import Color
color = Color()

class Initializer:
    def __init__(self):
        pass

    def create(self):
        # check exist package.json
        self.add_script_to_package_json()

        # create global .logicbook dir
        self.create_config_dir()
        
        # create logics dir
        self.create_logics_dir()

    def add_script_to_package_json(self):
        # check exist package.json
        package_json_path = Path("./package.json")
        if package_json_path.exists():
            print(color.red("package.json already exists"))
            return

        # create package.json
        print(color.green("create package.json"))
        subprocess.run(["npx", "init", "--yes"])

    def create_config_dir(self):
        # create global .logicbook dir
        config_dir = Path("./.logicbook")
        if config_dir.exists():
            print(color.red(".logicbook already exists"))
            return

        # create global .logicbook dir
        print(color.green("create .logicbook dir"))
        config_dir.mkdir(parents=True)

    def create_logics_dir(self):
        # create logics dir
        logics_dir = Path("./.logicbook/logics")
        if logics_dir.exists():
            print(color.red("logics dir already exists"))
            return

        # create logics dir
        print(color.green("create logics dir"))
        logics_dir.mkdir(parents=True)

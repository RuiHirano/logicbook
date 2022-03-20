
import subprocess
import os
from pathlib import Path
from .utils import Color
import shutil
import yaml
import sys
color = Color()
cli_path = Path(os.path.dirname(__file__)).resolve()
project_path = Path(os.getcwd()).resolve()

class Initializer:
    def __init__(self):
        pass

    def create(self):
        user_input = self.get_user_input()
        # create global .logicbook dir
        self.create_config_dir(user_input)
        # create logics dir
        self.create_logics_dir(user_input)
        color.green("Initialization finished.")
        color.blue("Please run 'logicbook start' to start the server.")

    def get_user_input(self):
        user_input = {}
        color.green("Please enter your project name: [default is '']")
        user_input["project_name"] = str(input("Project Name: ") or "")
        color.green("Please enter your src path: [default is /]")
        color.blue("Tip: logics directory will be created under the entered src path.")
        path = str(input("Src Path: ") or "")
        if path.startswith("/"):
            path = path[1:]
        user_input["path"] = path
        return user_input

    def create_config_dir(self, user_input):
        color.green("Creating .logicbook dir")
        # create global .logicbook dir
        source_dir_path = cli_path.joinpath('../template/.logicbook').resolve()
        target_dir_path = project_path.joinpath('.logicbook').resolve()
        shutil.copytree(source_dir_path, target_dir_path)

        config = None
        with open(target_dir_path.joinpath('config.yaml'), 'r') as f:
            config = yaml.safe_load(f)
            config['project_name'] = user_input['project_name']
            config['path'] = user_input['path']
        with open(target_dir_path.joinpath("config.yaml"), 'w') as f:
            yaml.dump(config, f)

    def create_logics_dir(self, user_input):
        color.green("Creating logics dir")
        # create logics dir
        source_dir_path = cli_path.joinpath('../template/logics').resolve()
        target_dir_path = project_path.joinpath(user_input["path"]).joinpath('logics').resolve()
        shutil.copytree(source_dir_path, target_dir_path)

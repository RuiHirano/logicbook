
import subprocess
import os
from pathlib import Path
from .utils import Color
import shutil
color = Color()
cli_path = Path(os.path.dirname(__file__)).resolve()
project_path = Path(os.getcwd()).resolve()

class Initializer:
    def __init__(self):
        pass

    def create(self):
        # create global .logicbook dir
        self.create_config_dir()
        
        # create logics dir
        self.create_logics_dir()


    def create_config_dir(self):
        # create global .logicbook dir
        source_dir_path = cli_path.joinpath('../templete/.logicbook').resolve()
        target_dir_path = project_path.joinpath('.logicbook').resolve()
        print(color.green("create .logicbook dir"))
        shutil.copytree(source_dir_path, target_dir_path)

    def create_logics_dir(self):
        # create logics dir
        source_dir_path = cli_path.joinpath('../templete/logics').resolve()
        target_dir_path = project_path.joinpath('logics').resolve()
        print(color.green("create logics dir"))
        shutil.copytree(source_dir_path, target_dir_path)

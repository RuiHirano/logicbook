import click
from .initializer import Initializer
from .runner import Runner
from pathlib import Path
import os

cli_path = Path(os.path.dirname(__file__)).resolve()

@click.group()
def cmd():
    pass

@cmd.command()
def init():
    i = Initializer()
    i.create()

@cmd.command()
def start():
    runner = Runner()
    runner.run_server()

def main():
    cmd()
    
if __name__ == '__main__':
    main()
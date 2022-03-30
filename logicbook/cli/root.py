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
@click.option('--port', '-p', default=1001, help="port number")
def start(port, dev):
    runner = Runner()
    runner.run_server(port)

def main():
    cmd()
    
if __name__ == '__main__':
    main()
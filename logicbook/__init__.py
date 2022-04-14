import os
import sys
from pathlib import Path
sys.path.append(str(Path(os.path.dirname(__file__)).joinpath('core').resolve()))

from .core.app import App
from .core.module import Logicbook
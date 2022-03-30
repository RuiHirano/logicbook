from function import Function
from clas import Class
from pathlib import Path
import inspect

class Logicbook:
    def __init__(self):
        self.path = Path(inspect.stack()[1][1]).resolve()
        self.name = self.path.name.split('.')[0]
        self.funcs = {}
        self.classes = {}
        self.test_cases = {}
        self.tests = {}
        
    def func(
        self,
        description="",
        version=None,
        title="",
        tests = [],
    ):
        def add_func(func):
            self.funcs[func.id] = func
        f = Function(self, version, title, description, callback=add_func, tests=tests)
        return f

    def clas(
        self,
        description="",
        version=None,
        title="",
        tests = [],
    ):
        def add_clas(cls): 
            self.classes[cls.id] = cls
        c = Class(self, version, title, description, callback=add_clas, tests=tests)
        return c

    def json(self):
        return {
            "funcs": [
                func.json() for func in self.funcs.values()
            ],
            "classes": [
                clas.json() for clas in self.classes.values()
            ],
            "tests": [
                t.json() for t in self.tests.values()
            ],
            "test_cases": [
                tc.json() for tc in self.test_cases.values()
            ],
            "name": self.name,
            "path": str(self.path),
        }

import sys
import requests
import inspect
from pathlib import Path
import os
from rich.console import Console
console = Console()

class TestCase:
    def __init__( 
        self,
        testcase,
     ):
        self.testcase = testcase
        self.name = testcase.__name__
        self.cases = []
        self.setup(testcase)

    def setup(self, testcase):
        print(dir(testcase))
        for attr in dir(testcase):
            if attr.startswith('test_'):
                func = getattr(testcase, attr)
                print("test", func)
                self.cases.append(Case(func))

    def json(self):
        return {
            "name": self.name,
            "cases": [case.json() for case in self.cases],
        }

class Case:
    def __init__(self, func):
        self.name=func.__name__
        self.func=func
        self.status=None
        self.source = inspect.getsource(func)
        self.result = None
        
    def json(self):
        return {
            "name": self.name,
            "source": self.source,
            "status": self.status,
            "result": self.result,
        }


if __name__ == "__main__":
    pass
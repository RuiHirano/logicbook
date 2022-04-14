import sys
import requests
import inspect
from pathlib import Path
import os
import uuid
import subprocess
from datetime import datetime
from rich.console import Console
console = Console()

class TestCase:
    def __init__( 
        self,
        testcase,
     ):
        self.id = str(uuid.uuid4())
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

    def run(self):
        for case in self.cases:
            case.run()

    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "cases": [case.json() for case in self.cases],
        }

class Case:
    def __init__(self, func):
        self.id = str(uuid.uuid4())
        self.test_case_name = inspect.stack()[1][3]
        self.name=func.__name__
        self.func=func
        self.status=None
        self.source = inspect.getsource(func)
        self.path = os.path.abspath(inspect.getfile(func))
        self.result = None
        self.latest_run_time = datetime.now()
        
    def json(self):
        return {
            "id": self.id,
            "test_case_name": self.test_case_name,
            "name": self.name,
            "source": self.source,
            "status": self.status,
            "result": self.result,
            "latest_run_time": self.latest_run_time.isoformat(),
        }

    def run(self):
        command = ["python3", self.path, "{}.{}".format(self.test_case_name, self.name)]
        proc = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout_data, stderr_data = proc.communicate()
        if proc.returncode == 0:
            self.status = "success"
        else:
            self.status = "failure"
        self.result = stderr_data.decode('utf-8')
        self.latest_run_time = datetime.now()


if __name__ == "__main__":
    pass
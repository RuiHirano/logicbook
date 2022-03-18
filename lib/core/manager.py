
from typing import List
import subprocess
import uuid
from pathlib import Path
import os
import inspect
core_dir = Path(os.path.dirname(__file__)).resolve()
project_dir = Path(os.getcwd()).resolve()

class LogicManager:
    def __init__(self):
        self.logics: List[Logic] = []

    def add_logic(self, logic):
        self.logics.append(logic)

    def get_logic(self, name):
        for logic in self.logics:
            if logic.name == name:
                return logic
        return None

def get_test_names(cls):
    import types
    result = [ ]
    print(cls.__dict__, types.FunctionType)
    for var in cls.__dict__:
        val = cls.__dict__[var]
        if isinstance(val, types.FunctionType) and var.startswith('test'):
            result.append(var)
    return sorted(result)

class Logic:
    def __init__(self, name, func, readme=None) -> None:
        self.id = str(uuid.uuid4())
        self.name=name
        self.book_path = Path(os.path.abspath((inspect.stack()[1])[1]))
        self.func_path = Path(os.path.abspath(inspect.getfile(func)))
        self.readme_path = self.book_path.parent.joinpath(readme).resolve()
        self.func=func
        self.readme = self.get_markdown(self.readme_path) if self.readme_path != None else None
        self.tests=[]
        self.examples = []
        self.code = inspect.getsource(func)

    def update(self):
        self.readme = self.get_markdown(self.readme_path) if self.readme_path != None else None
        self.code = inspect.getsource(self.func)
        for test in self.tests:
            test.run()

    def get_markdown(self, path):
        md = None
        with open(path) as f:
            md = f.read()
        return md

    def get_code(self):
        path = self.func_path
        code = None
        with open(path) as f:
            code = f.read()
        return code

    def add_example(self, name, args):
        self.examples.append(Example(name, args))

    def add_test(self, name, cls):
        print(cls.__name__)
        testnames = get_test_names(cls)
        for name in testnames:
            func = cls.__dict__[name]
            cls_name = cls.__name__
            test = Test(name, cls_name, func)
            test.run()
            self.tests.append(test)

    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "book_path": str(self.book_path),
            "func_path": str(self.func_path),
            "readme_path": str(self.readme_path),
            "readme": self.readme,
            "tests": [test.json() for test in self.tests],
            "examples": [ex.json() for ex in self.examples],
            "code": self.code,
        }

class Example:
    def __init__(self, name, args):
        self.id = str(uuid.uuid4())
        self.name=name
        self.args=args

    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "args": self.args,
        }

class Test:
    def __init__(self, name, cls_name, func):
        self.id = str(uuid.uuid4())
        self.name=name
        self.cls_name=cls_name
        self.func=func
        self.path = os.path.abspath(inspect.getfile(func))
        self.status="unknown"
        self.code = inspect.getsource(func)
        self.result = None
    
    def get_code(self):
        path = self.path
        code = None
        with open(path) as f:
            code = f.read()
        return code

    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "cls_name": self.cls_name,
            "path": self.path,
            "code": self.code,
            "status": self.status,
            "result": self.result,
        }

    def run(self):
        command = ["python3", self.path, "{}.{}".format(self.cls_name, self.func.__name__)]
        proc = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout_data, stderr_data = proc.communicate()
        print(proc.returncode, stdout_data, stderr_data)
        if proc.returncode == 0:
            self.status = "success"
            self.result = stderr_data.decode('utf-8')
        else:
            self.status = "failure"
            self.result = stderr_data.decode('utf-8')
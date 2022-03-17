
from typing import List
import subprocess
import uuid

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

class Logic:
    def __init__(self, name, filename, func, input_schema, output_schema, readme) -> None:
        self.id = str(uuid.uuid4())
        self.name=name
        self.filename=filename
        self.func=func
        self.input_schema=input_schema
        self.output_schema=output_schema
        self.readme=readme
        self.tests=[]
        self.examples = []
        self.code = self.get_code()

    def get_code(self):
        path = "/Users/ruihirano/MyProjects/FelixPort/logicbook/lib/core/{}".format(self.filename)
        code = None
        with open(path) as f:
            code = f.read()
        return code

    def add_example(self, name, input):
        self.examples.append(Example(name, input))

    def add_test(self, name, filename):
        test = Test(name, filename)
        test.run()
        self.tests.append(test)

    def json(self):
        print("json")
        return {
            "id": self.id,
            "name": self.name,
            #"func": self.func,
            "filename": self.filename,
            "input_schema": self.input_schema,
            "output_schema": self.output_schema,
            "readme": self.readme,
            "tests": [test.json() for test in self.tests],
            "examples": [ex.json() for ex in self.examples],
            "code": self.code,
        }

class Example:
    def __init__(self, name, input):
        self.id = str(uuid.uuid4())
        self.name=name
        self.input=input

    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "input": self.input,
        }

# TODO Add ID
class Test:
    def __init__(self, name, filename):
        self.id = str(uuid.uuid4())
        self.name=name
        self.filename=filename
        self.status="unknown"
        self.code = self.get_code()
    
    def get_code(self):
        path = "/Users/ruihirano/MyProjects/FelixPort/logicbook/develop/{}".format(self.filename)
        code = None
        with open(path) as f:
            code = f.read()
        return code

    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "filename": self.filename,
            "code": self.code,
            "status": self.status,
        }

    def run(self):
        command = ["python3", "/Users/ruihirano/MyProjects/FelixPort/logicbook/develop/{}".format(self.filename)]
        proc = subprocess.run(command)
        print(proc.returncode)
        if proc.returncode == 0:
            self.status = "success"
        else:
            self.status = "failure"
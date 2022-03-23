
from datetime import datetime
from typing import List
import subprocess
import uuid
from pathlib import Path
import os
import inspect
import linecache
import importlib

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

    def execute_example(self, id, args):
        for logic in self.logics:
            for example in logic.examples:
                if example.id == id:
                    return example.run(args)
        return None

    def execute_test(self, id):
        for logic in self.logics:
            for test in logic.tests:
                if test.id == id:
                    return test.run()
        return None

def get_test_names(cls):
    import types
    result = [ ]
    for var in cls.__dict__:
        val = cls.__dict__[var]
        if isinstance(val, types.FunctionType) and var.startswith('test'):
            result.append(var)
    return sorted(result)

class Logic:
    def __init__(self, name, func, readme=None) -> None:
        self.id = str(uuid.uuid4())
        self.category, self.name= self.get_name_category(name)
        self.book_path = Path(os.path.abspath((inspect.stack()[1])[1]))
        self.book_filename = str(self.book_path.name).split('.')[0]
        self.book_module = importlib.import_module(self.book_filename, self.book_path.parent)
        self.book_code = inspect.getsource(self.book_module)
        #self.book_func = getattr(self.func_module, name)
        self.func_path = Path(os.path.abspath(inspect.getfile(func)))
        self.func_filename = str(self.func_path.name).split('.')[0]
        self.func_module = importlib.import_module(self.func_filename, self.func_path.parent)
        self.readme_path = self.book_path.parent.joinpath(readme).resolve() if readme != None else None
        self.func=func
        self.readme = self.get_markdown(self.readme_path) if self.readme_path != None else None
        self.tests=[]
        self.examples = []
        self.code = inspect.getsource(func)
        self.cls, self.cls_args = self.check_cls(func)

    def get_name_category(self, name):
        split_name = name.split('/')
        if len(split_name) == 1:
            return None, name
        else:
            return split_name[0], split_name[1]

    def add_book_logic_name(self, name):
        self.book_logic_name = name

    def check_cls(self, func):
        exist = False
        # check if func or not
        for name in dir(self.func_module):
            if name == func.__name__:
                exist = True
                return None, None
        # check if func in class or not
        for name in dir(self.func_module):
            if hasattr(func, '__self__') and hasattr(func.__self__, '__class__') and name == func.__self__.__class__.__name__:
                exist = True
                cls = func.__self__.__class__
                args_names = inspect.getargspec(cls.__init__).args[1:]
                self_dict = {k.strip('_'): v for k, v in func.__self__.__dict__.items()}
                args = {k: v for k, v in self_dict.items() if k in args_names}
                return cls, args
        if not exist:
            raise Exception(f"{func.__name__} is invalid function")

    def reload(self):
        self.func_module = importlib.reload(self.func_module)
        self.book_module = importlib.reload(self.book_module)
        for name in dir(self.func_module):
            if self.cls:
                if name == self.cls.__name__:
                    clas = getattr(self.func_module, name)(**self.cls_args)
                    self.func = getattr(clas, self.func.__name__)
            else:
                if name == self.func.__name__:
                    self.func = getattr(self.func_module, name)

    def is_changed(self):
        self.reload()
        func_str = inspect.getsource(self.func)
        is_changed_func = self.code != func_str
        is_changed_book = self.book_code != inspect.getsource(self.book_module) # TODO: check book
        is_changed_readme = self.readme != self.get_markdown(self.readme_path) if self.readme_path != None else None
        return is_changed_func or is_changed_readme or is_changed_book

    def update(self):
        self.readme = self.get_markdown(self.readme_path) if self.readme_path != None else None
        self.code = inspect.getsource(self.func)
        self.book_code = inspect.getsource(self.book_module)
        for test in self.tests:
            test.run()

    def get_markdown(self, path):
        md = None
        with open(path) as f:
            md = f.read()
        return md

    def add_example(self, name, func, args):
        self.examples.append(Example(name, func, args))

    def add_test(self, name, test_case):
        testnames = get_test_names(test_case)
        for name in testnames:
            func = test_case.__dict__[name]
            test = Test(name, test_case, func)
            test.run()
            self.tests.append(test)

    def json(self):
        return {
            "id": self.id,
            "category": self.category,
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
    def __init__(self, name, func, args):
        self.id = str(uuid.uuid4())
        self.name=name
        self.func=func
        self.args=args
        self.output=self.run(args)

    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "args": self.args,
            "output": self.output,
        }

    def run(self, args):
        try:
            self.output = str(self.func(**args))
        except Exception as e:
            self.output = str(e)
        return self.output

class Test:
    def __init__(self, name, test_case, func):
        self.id = str(uuid.uuid4())
        self.name=name
        self.test_case=test_case
        self.func=func
        self.func_path = Path(os.path.abspath(inspect.getfile(func)))
        self.func_filename = str(self.func_path.name).split('.')[0]
        self.func_module = importlib.import_module(self.func_filename, self.func_path.parent)
        self.path = os.path.abspath(inspect.getfile(func))
        self.status="unknown"
        self.code = inspect.getsource(func)
        self.result = None
        self.latest_run_time = None

    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "test_case_name": self.test_case.__name__,
            "path": self.path,
            "func_path": str(self.func_path),
            "code": self.code,
            "status": self.status,
            "result": self.result,
            "latest_run_time": self.latest_run_time.isoformat(),
        }

    def reload(self):
        self.func_module = importlib.reload(self.func_module)
        for name in dir(self.func_module):
            if name == self.test_case.__name__:
                clas = getattr(self.func_module, name)()
                self.func = getattr(clas, self.func.__name__)

    def is_changed(self):
        self.reload()
        return self.code != inspect.getsource(self.func)

    def update(self):
        self.code = inspect.getsource(self.func)

    def run(self):
        command = ["python3", self.path, "{}.{}".format(self.test_case.__name__, self.func.__name__)]
        proc = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout_data, stderr_data = proc.communicate()
        if proc.returncode == 0:
            self.status = "success"
        else:
            self.status = "failure"
        self.result = stderr_data.decode('utf-8')
        self.latest_run_time = datetime.now()
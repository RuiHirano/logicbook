import sys
import requests
import inspect
from pathlib import Path
import os
from rich.console import Console
from test_case import TestCase
console = Console()

class Class:
    def __init__( 
        self,
        module,
        version,
        title="",
        description="",
        callback=None,
        tests=[],
     ):
        self.module = module
        self.type = "Class"
        self.title = title
        self.version = version
        self.description = description
        self.callback = callback
        self.funcs = {}
        self.tests = [TestCase(t) for t in tests]

    def __call__( self, func ):
        self.name = func.__name__
        self.id = self.module.name + "." + self.name
        self.source = inspect.getsource(func)
        self.line_number = inspect.getsourcelines(func)[1]
        self.stack = inspect.stack()[1:]
        self.argspec = inspect.getfullargspec(func)
        self.latest_args = ()
        self.latest_kwargs = {}
        self.latest_retern = None
        self.latest_error = None
        self.callback(self) if self.callback else None
        
        def wrapper_f( *args, **kwargs ):
            self.latest_args = args
            self.latest_kwargs = kwargs
            self.latest_error = None
            self.latest_retern = None
            try:
                ret = func( *args, **kwargs )
                self.latest_retern = ret
                self.callback(self) if self.callback else None
                # TODO: add class methods data 
            except Exception as err:
                self.latest_error = err
                console.print_exception()
                self.callback(self) if self.callback else None
                sys.exit(1)
            return ret
        return wrapper_f

    def json(self):
        return {
            "id": self.id,
            "type": self.type,
            "title": self.title,
            "version": self.version,
            "description": self.description,
            "name": self.name,
            "argspec": self.argspec.args,
            "source": self.source,
            "line_number": self.line_number,
            #"stack": self.stack,
            "latest_args": self.latest_args,
            "latest_kwargs": self.latest_kwargs,
            "latest_retern": str(self.latest_retern),
            "latest_error": str(self.latest_error),
            "funcs": [func.json() for func in self.funcs.values()],
            "tests": [t.json() for t in self.tests],
        }


if __name__ == "__main__":
    def test_001():
        @Class( "test_001", "1.0.0" )
        class TestClass:
            def __init__( self, name ):
                print("init: ", name)

            def sum(test, a, b):
                print("sum")
                return a + b

        test = TestClass("test")
        test.sum(1, 2)
        
        

    test_001()
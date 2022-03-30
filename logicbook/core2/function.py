import sys
import requests
import inspect
from pathlib import Path
import os
from rich.console import Console
from test_case import TestCase
console = Console()

class Function:
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
        self.type = "Function"
        self.title = title
        self.version = version
        self.description = description
        self.callback = callback
        self.funcs = []
        self.tests = [TestCase(t) for t in tests]

    def __call__( self, func ):
        self.name = func.__name__
        self.source = inspect.getsource(func)
        self.line_number = inspect.getsourcelines(func)[1]
        self.stack = inspect.stack()[1:]
        self.latest_args = ()
        self.latest_kwargs = {}
        self.latest_retern = None
        self.latest_error = None
        # TODO: not corrected "inspect.getargspec(func).args[0] == 'self'"
        self.argspec = inspect.getfullargspec(func)
        self.parent_class_id = self.module.name + "." + inspect.stack()[1][3] if len(self.argspec.args) > 0 and self.argspec.args[0] == 'self' else None
        self.id = self.parent_class_id + "." + self.name if self.parent_class_id else self.module.name + "." + self.name
        self.callback(self) if self.callback else None 
        
        def wrapper_f( *args, **kwargs ):
            self.latest_args = args[1:] if self.parent_class_id else args
            self.latest_kwargs = kwargs
            self.latest_error = None
            self.latest_retern = None
            try:
                ret = func( *args, **kwargs )
                self.latest_retern = ret
                self.callback(self) if self.callback else None
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
            "parent_class_id": self.parent_class_id,
            "tests": [t.json() for t in self.tests],
        }


if __name__ == "__main__":
    def test_001():
        @Function( "test_001", "1.0.0" )
        def f_001(test):
            a = 1/ 0
            print("finish")
        f_001("test")

    test_001()
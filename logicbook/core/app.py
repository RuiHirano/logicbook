from server import api
import uvicorn
import webbrowser

class App:
    def __init__(
        self,
        modules,
    ):
        self.modules = {mod.id: mod for mod in modules}

        self.include_funcs_in_class()
        self.api = api
        self.api.app = self

    def include_funcs_in_class(self):
        for module in self.modules.values():
            new_funcs = {}
            for func in module.funcs.values():
                print(func)
                for clas in module.classes.values():
                    if func.parent_class_id == clas.id:
                        print(module.classes[clas.id].funcs)
                        module.classes[clas.id].funcs[func.id] = func
                    else:    
                        new_funcs[func.id] = func
            module.funcs = new_funcs

    def run(self, host="localhost", port=8008):
        webbrowser.open("http://localhost:{}".format(port))
        uvicorn.run(self.api, host=host, port=port, log_level="error")

    def execute_test(self, test_id):
        for module in self.modules:
            for clas in module.classes:
                for func in clas.funcs.values():
                    for test in func.tests:
                        if test.id == test_id:
                            test.run()
    
    def json(self):
        return {
            "modules": [mod.json() for mod in self.modules.values()],
        }

if __name__ == "__main__":
    pass
from server import api
import uvicorn

class App:
    def __init__(
        self,
        modules,
    ):
        self.funcs = [func for module in modules for func in module.funcs.values()]
        self.classes = [clas for module in modules for clas in module.classes.values()]
        self.modules = modules

        self.include_funcs_in_class()
        self.api = api
        self.api.app = self

    def include_funcs_in_class(self):
        for module in self.modules:
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

    def run(self, host="localhost", port=1001):
        uvicorn.run(self.api, host=host, port=port)

    def json(self):
        return {
            "funcs": [func.json() for func in self.funcs],
            "classes": [clas.json() for clas in self.classes],
        }
    
    def json2(self):
        return {
            "modules": [mod.json() for mod in self.modules],
        }

if __name__ == "__main__":
    pass
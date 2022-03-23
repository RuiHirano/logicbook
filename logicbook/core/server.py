from numpy import diff
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.cors import CORSMiddleware
from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer
import os
import subprocess
import sys
import time
import threading
from pydantic import BaseModel
from manager import LogicManager
from logicbook import Logic  # This may be wrong
import importlib
from pathlib import Path
import inspect
from utils import Color
from config import get_config

core_dir = Path(os.path.dirname(__file__)).resolve()
project_dir = Path(os.getcwd()).resolve()
color = Color()

app = FastAPI(
    title="Logicbook",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,   # 追記により追加
    allow_methods=["*"],      # 追記により追加
    allow_headers=["*"]       # 追記により追加
)
app.mount("/static", StaticFiles(directory=core_dir.joinpath("../ui/build/static").resolve()), name="static")
templates = Jinja2Templates(directory=core_dir.joinpath("../ui/build").resolve())
# index page
@app.get("/")
async def serve_ui(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
# logic page
@app.get("/logics/{name}")
async def serve_ui2(request: Request, name: str):
    return templates.TemplateResponse("index.html", {"request": request})

app.manager = LogicManager()
alive = True
@app.on_event("startup")
async def startup_event():
    # run watcher
    watcher_thread = threading.Thread(target=run_watcher)
    watcher_thread.start()
    # add logic
    config = get_config(project_dir.joinpath(".logicbook/config.yaml"))
    logics_dir = project_dir.joinpath(config.path).joinpath('logics').resolve()
    for file in logics_dir.glob('**/*_book.py'):
        sys.path.append(str(file.parent)) # TODO: remove pycache
        module_name = file.name.split('.')[0]
        module = importlib.import_module(module_name, file.parent)
        
        # add logic
        for name in dir(module):
            if isinstance(getattr(module, name), Logic):
                color.blue(f"Loading {name} at {file.parent}")
                logic = getattr(module, name)
                logic.add_book_logic_name(name)
                app.manager.add_logic(logic)

@app.on_event("shutdown")
def shutdown_event():
    color.green(f"Stopping Logicbook server")
    global alive
    alive = False

class ExecuteLogicModel(BaseModel):
    id: str
    args : dict

@app.post("/execute/logic")
async def execute_logic(data: ExecuteLogicModel):
    result = None
    for logic in app.manager.logics:
        if logic.id == data.id:
            logic.reload()
            result = logic.func(**data.args)
    return result

@app.post("/execute/example")
async def execute_example(data: ExecuteLogicModel):
    result = app.manager.execute_example(data.id, data.args)
    return result

class ExecuteTestModel(BaseModel):
    id: str

@app.post("/execute/test")
async def execute_test(data: ExecuteTestModel):
    result = app.manager.execute_test(data.id)
    return result
    '''for logic in app.manager.logics:
        for test in logic.tests:
            if test.id == data.id:
                test.run()
    return None'''

@app.get("/data")
async def get_data():
    data = [logic.json() for logic in app.manager.logics]
    return data

def run_watcher():
    target_dir = project_dir
    event_handler = FileChangeHandler()
    observer = Observer()
    observer.schedule(event_handler, target_dir, recursive=True)
    observer.start()
    try:
        global arive
        while alive:
            time.sleep(0.1)
    except KeyboardInterrupt:
        observer.stop()
    observer.stop()
    observer.join()


class Time:
    def __init__(self):
        self.time = time.time()
        self.lock = threading.Lock()

    def set(self, _time):
            self.lock.acquire() # 排他制御開始
            self.time = _time
            self.lock.release() # 排他制御解除

app.time = Time()
class FileChangeHandler(FileSystemEventHandler):

    def on_created(self, event):
        filepath = event.src_path
        filename = os.path.basename(filepath)
        #print('%s created' % filename)

    def on_modified(self, event):
        curren_time = time.time()
        diff_time = curren_time - app.time.time
        app.time.set(curren_time)
        if diff_time < 0.1: # for fix called twice bug
            filepath = event.src_path
            filename = os.path.basename(filepath)

            for logic in app.manager.logics:
                # update logic if logic file is changed
                if str(logic.func_path) == filepath or str(logic.book_path) == filepath or str(logic.readme_path) == filepath:
                    if logic.is_changed():
                        color.green("Update Logic: {} at {}".format(logic.func.__name__, filename))
                        logic.update()
                    continue
                # run test if test file is changed
                for test in logic.tests:
                    if str(test.path) == filepath:
                        if test.is_changed():
                            color.green("Update Test: {} at {}".format(test.func.__name__, filename))
                            test.run()
                            test.update()
                        continue

    def on_deleted(self, event):
        filepath = event.src_path
        filename = os.path.basename(filepath)
        #print('%s deleted' % filename)

    def on_moved(self, event):
        filepath = event.src_path
        filename = os.path.basename(filepath)
        #print('%s moved' % filename)

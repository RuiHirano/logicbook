from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer
import os
import subprocess
import sys
import time
import threading
from pydantic import BaseModel
from manager import LogicManager, Logic
import importlib
from pathlib import Path
import inspect
core_dir = Path(os.path.dirname(__file__)).resolve()
project_dir = Path(os.getcwd()).resolve()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,   # 追記により追加
    allow_methods=["*"],      # 追記により追加
    allow_headers=["*"]       # 追記により追加
)

app.manager = LogicManager()

@app.on_event("startup")
async def startup_event():
    print("startup")
    # run ui
    ui_thread = threading.Thread(target=run_ui)
    ui_thread.start()
    # run watcher
    watcher_thread = threading.Thread(target=run_watcher)
    watcher_thread.start()
    # add logic
    logics_dir = project_dir.joinpath('logics').resolve()
    for file in logics_dir.glob('**/*_book.py'):
        print(file.name, file.parent)
        sys.path.append(str(file.parent)) # TODO: remove pycache
        module_name = file.name.split('.')[0]
        module = importlib.import_module(module_name, file.parent)
        
        # add logic
        for name in dir(module):
            if isinstance(getattr(module, name), Logic):
                app.manager.add_logic(getattr(module, name))


class ExecuteLogicModel(BaseModel):
    id: str
    args : dict

@app.post("/execute/logic")
async def execute_logic(data: ExecuteLogicModel):
    print(data)
    result = None
    for logic in app.manager.logics:
        if logic.id == data.id:
            result = logic.func(**data.args)
    return result


class ExecuteTestModel(BaseModel):
    id: str

@app.post("/execute/test")
async def execute_test(data: ExecuteTestModel):
    for logic in app.manager.logics:
        for test in logic.tests:
            if test.id == data.id:
                test.run()
    return None

@app.get("/data")
async def get_data():
    print(len(app.manager.logics))
    print([logic.name for logic in app.manager.logics])
    data = [logic.json() for logic in app.manager.logics]
    print(data)
    return data

def run_ui():
    proc = subprocess.run(["python3", "-m", "http.server", "7000", "--directory", "build"], cwd=str(core_dir.joinpath("../ui")))

def run_watcher():
    target_dir = project_dir
    event_handler = FileChangeHandler()
    observer = Observer()
    observer.schedule(event_handler, target_dir, recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(0.1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

class FileChangeHandler(FileSystemEventHandler):
    def on_created(self, event):
        filepath = event.src_path
        filename = os.path.basename(filepath)
        print('%s created' % filename)

    def on_modified(self, event):
        filepath = event.src_path
        filename = os.path.basename(filepath)
        print('%s changed' % filename)
        for logic in app.manager.logics:
            # update logic if logic file is changed
            if str(logic.func_path) == filepath or str(logic.book_path) == filepath or str(logic.readme_path) == filepath:
                print('update logic')
                logic.update()
                break
            # run test if test file is changed
            for test in logic.tests:
                if str(test.path) == filepath:
                    print("run test", filename)
                    test.run()
                    logic.update()
                    break

    def on_deleted(self, event):
        filepath = event.src_path
        filename = os.path.basename(filepath)
        print('%s deleted' % filename)

    def on_moved(self, event):
        filepath = event.src_path
        filename = os.path.basename(filepath)
        print('%s moved' % filename)

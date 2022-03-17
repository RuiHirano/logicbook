from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates
from starlette.requests import Request
from fastapi.responses import HTMLResponse
from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer
import os
import subprocess
import sys
import time
import threading
from pydantic import BaseModel
from manager import LogicManager
import importlib
from pathlib import Path
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

app.mount("/static", StaticFiles(directory=core_dir.joinpath("../ui/build")), name="build")
app.manager = LogicManager()
templates = Jinja2Templates(directory=core_dir.joinpath("../ui/build"))

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
    sys.path.append(str(logics_dir))
    for file in logics_dir.glob('*_book.py'):
        print(file.name)
        module_name = file.name.split('.')[0]
        module = importlib.import_module(module_name, logics_dir)
        print(module.mylogic.name)
        app.manager.add_logic(module.mylogic)

@app.post("/", response_class=HTMLResponse)
def index(request: Request):
    print("index")
    return templates.TemplateResponse('index.html',{'request': request})

class ExecuteModel(BaseModel):
    id: str
    input : dict

@app.post("/execute")
async def execute(data: ExecuteModel):
    print(data)
    result = None
    for logic in app.manager.logics:
        if logic.id == data.id:
            result = logic.func(**data.input)
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
            for test in logic.tests:
                if test.filename == filename or logic.filename == filename:
                    test.run()

    def on_deleted(self, event):
        filepath = event.src_path
        filename = os.path.basename(filepath)
        print('%s deleted' % filename)

    def on_moved(self, event):
        filepath = event.src_path
        filename = os.path.basename(filepath)
        print('%s moved' % filename)

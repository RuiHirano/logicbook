from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
import subprocess
from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer
import os
import time
import threading
from logic1 import sum_logic
from pydantic import BaseModel
from manager import LogicManager
import importlib
from pathlib import Path

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
    # run watcher
    watcher_thread = threading.Thread(target=run_watcher)
    watcher_thread.start()
    # add logic
    logics_dir = Path('/Users/ruihirano/MyProjects/FelixPort/logicbook/lib/core/')
    for file in logics_dir.glob('*_book.py'):
        print(file.name)
        module_name = file.name.split('.')[0]
        module = importlib.import_module(module_name)
        print(module.mylogic.name)
        app.manager.add_logic(module.mylogic)

@app.get("/logic/register")
async def register_logic():
    return {"message" : "Hello,World"}

class ExecuteModel2(BaseModel):
    logic_name: str
    input: object

# TODO: ExecuteModel
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

def logic1_test():
    command = ["python3", "/Users/ruihirano/MyProjects/FelixPort/logicbook/develop/test_logic1.py"]
    proc = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    for line in iter(proc.stdout.readline, ''):
        print(line)

# 変更検知
def run_watcher():
    # 監視対象ディレクトリを指定する
    target_dir = '/Users/ruihirano/MyProjects/FelixPort/logicbook/lib/core/'
    # ファイル監視の開始
    event_handler = FileChangeHandler()
    observer = Observer()
    observer.schedule(event_handler, target_dir, recursive=True)
    observer.start()
    # 処理が終了しないようスリープを挟んで無限ループ
    try:
        while True:
            time.sleep(0.1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

# FileSystemEventHandler の継承クラスを作成
class FileChangeHandler(FileSystemEventHandler):
    # ファイル作成時のイベント
    def on_created(self, event):
        filepath = event.src_path
        filename = os.path.basename(filepath)
        print('%s created' % filename)

    # ファイル変更時のイベント
    def on_modified(self, event):
        filepath = event.src_path
        filename = os.path.basename(filepath)
        print('%s changed' % filename)
        for logic in app.manager.logics:
            for test in logic.tests:
                if test.filename == filename or logic.filename == filename:
                    test.run()
        #if filename == "logic1.py":
        #    logic1_test()

    # ファイル削除時のイベント
    def on_deleted(self, event):
        filepath = event.src_path
        filename = os.path.basename(filepath)
        print('%s deleted' % filename)

    # ファイル移動時のイベント
    def on_moved(self, event):
        filepath = event.src_path
        filename = os.path.basename(filepath)
        print('%s moved' % filename)

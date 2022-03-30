from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os
from pathlib import Path

api = FastAPI(
    title="Logicbook",
)
api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True, 
    allow_methods=["*"],    
    allow_headers=["*"]     
)

core_dir = Path(os.path.dirname(__file__)).resolve()
api.mount("/static", StaticFiles(directory=core_dir.joinpath("../ui2/build/static").resolve()), name="static")
templates = Jinja2Templates(directory=core_dir.joinpath("../ui2/build").resolve())

# index page
@api.get("/")
async def serve_ui(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# logic page
@api.get("/logics/{name}")
async def serve_ui2(request: Request, name: str):
    return templates.TemplateResponse("index.html", {"request": request})

@api.get("/data")
async def get_data():
    data = api.app.json()
    return data

@api.get("/data2")
async def get_data2():
    data = api.app.json2()
    return data

@api.on_event("startup")
async def startup_event():
    print("startup_event")

class ClassModel(BaseModel):
    id: str
    type: str
    title: str
    version: str
    description: str
    name: str
    argspec: tuple
    module_file_path: str
    module_dir_path: str
    module_file_name: str
    source: str
    line_number: int
    # stack: str
    latest_args: tuple
    latest_kwargs: dict
    latest_retern: str
    latest_error: str

@api.post("/class")
async def post_class(data: ClassModel):
    print("class: ", data)
    return "world"

class FunctionModel(BaseModel):
    id: str
    type: str
    title: str
    version: str
    description: str
    name: str
    argspec: tuple
    module_file_path: str
    module_dir_path: str
    module_file_name: str
    source: str
    line_number: int
    # stack: str
    latest_args: tuple
    latest_kwargs: dict
    latest_retern: str
    latest_error: str

@api.post("/function")
async def post_function(data: FunctionModel):
    print("function: ", data)
    return "world"

@api.on_event("shutdown")
def shutdown_event():
    print("shutdown")
    
if __name__ == "__main__":
    uvicorn.run(api, host="0.0.0.0", port=1001)
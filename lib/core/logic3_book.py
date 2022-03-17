from logic3 import PipelineGenerator
from manager import Logic

pg = PipelineGenerator()
mylogic = Logic(
    name="CreateArgsSample",
    filename="logic3.py",
    func=pg.create_job_args,
    input_schema={"str1": "string", "str2": "string"},
    output_schema={"result": "string"},
    readme="# Test of Logic2",
)

input = {
    "command": {
        "name": "test",
        "type": "test",
        "data": {
            "str1": "test1",
        }
    },
    "job_args_conf": [
        {
            "name": "str1",
            "type": "string",
        }
    ],
    "args_param": {
        "str1": "data.str1",
    },
}

mylogic.add_example(name="default", input=input)
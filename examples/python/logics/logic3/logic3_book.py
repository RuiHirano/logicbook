from logic3 import PipelineGenerator
from manager import Logic

pg = PipelineGenerator()
mylogic = Logic(
    name="CreateArgsSample",
    func=pg.create_job_args,
    readme="logic3.md",
)

mylogic.add_example(
    name="default", 
    args={
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
)
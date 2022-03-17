
import requests
from logic1 import sum_logic
from logic2 import join_string
from manager import Logic

mylogic = Logic(
    name="JoinString",
    filename="logic2.py",
    func=join_string,
    input_schema={"str1": "string", "str2": "string"},
    output_schema={"result": "string"},
    readme="# Test of Logic2",
)

input = {
    "str1": "hello",
    "str2": "world",
}

mylogic.add_example(name="default", input=input)
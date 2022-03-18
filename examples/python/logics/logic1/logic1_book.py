
import requests
from logic1 import sum_logic
from manager import Logic
from test_logic1 import TestSum

mylogic = Logic(
    name="Sum",
    func=sum_logic,
    readme="logic1.md",
)

# TODO: other name of mylogic
#TODO add example by running logic
# TODO: reflect file change
# TODO: get meta info from git
# TODO: update ui
# TODO: minimize, maximize code block and readme
# TODO: add test output to ui
# TODO: upper sort logic name
mylogic.add_example(
    name="default", 
    args={
        "a": 1,
        "b": 2,
    })
mylogic.add_test(name="Test Class of Logic1", cls=TestSum)

import requests
from logic1 import sum_logic
from manager import Logic
#from logic_book import register_logic

input = {
    "a": 1,
    "b": 2,
}

mylogic = Logic(
    name="Sum",
    filename="logic1.py",
    func=sum_logic,
    input_schema={"a": "int", "b": "int"},
    output_schema={"result": "int"},
    readme="# Test of Logic1",
)

mylogic.add_example(name="default", input=input, output={"result": 3})
mylogic.add_test(name="Test of Logic1", filename="test_logic1.py")
mylogic.add_test(name="Test2 of Logic1", filename="test_logic1.py")
mylogic.add_test(name="Test3 of Logic1", filename="test_logic1.py")

import requests
from logic2 import join_string
from manager import Logic
from test_logic2 import TestJoin

mylogic = Logic(
    name="JoinString",
    func=join_string,
)

mylogic.add_example(
    name="default", 
    args={
        "str1": "hello",
        "str2": "world",
    }
)
mylogic.add_test(name="Test Class of Logic1", cls=TestJoin)
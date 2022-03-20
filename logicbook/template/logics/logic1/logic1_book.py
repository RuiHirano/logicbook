
from logic1 import sum_logic
from logicbook import Logic
from test_logic1 import TestSum

mylogic = Logic(
    name="Sum",
    func=sum_logic,
    readme="logic1.md",
)

mylogic.add_example(
    name="default", 
    args={
        "a": 1,
        "b": 2,
    })
mylogic.add_test(name="Test Class of Logic1", cls=TestSum)
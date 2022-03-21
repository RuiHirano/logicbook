
from logic1 import SumLogic
from logicbook import Logic
from test_logic1 import TestSum

sum_logic = SumLogic(1, 2)
mylogic = Logic(
    name="SumLogic/Sum",
    func=SumLogic(1, 2).sum,
    readme="logic1.md",
)

mylogic.add_example(
    name="default", 
    func=SumLogic(1, 2).sum,
    args={
        "c": 1,
    })

mylogic.add_test(name="Test Class of Logic1", cls=TestSum)
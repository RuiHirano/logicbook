from calculator import Calculator
from logicbook import Logic
from test_calculator import TestCalculatorSub, TestCalculatorAdd

add = Logic(
    name="Calculator/Add",
    func=Calculator().add,
    readme="calculator_add.md",
)

add.add_example(
    name="Default", 
    func=Calculator().add,
    args={
        "a": 1,
        "b": 2
    })

add.add_test(
  name="Test Class of Calculator", 
  test_case=TestCalculatorAdd
)

sub = Logic(
    name="Calculator/Sub",
    func=Calculator().sub,
    readme="calculator_sub.md",
)

sub.add_example(
    name="Default", 
    func=Calculator().sub,
    args={
        "a": 2,
        "b": 1
    })

sub.add_test(
  name="Test Class of Calculator", 
  test_case=TestCalculatorSub
)
from join import join
from logicbook import Logic
from test_join import TestJoin

mylogic = Logic(
    name="Join",
    func=join,
    readme="join.md",
)

mylogic.add_example(
    name="Default", 
    func=join,
    args={
        "a": "Hello ",
        "b": "Logicbook!"
    }
)

mylogic.add_test(
  name="Test Class of Join", 
  test_case=TestJoin
)
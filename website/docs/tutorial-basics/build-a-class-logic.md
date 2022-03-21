---
sidebar_position: 2
---

# Build a class logic
**Build a class logic in isolation**

## Class Sum Logic

First, let’s create the sum logic and its accompanying book file: src/sum.py and src/logics/sum_book.py.

### 1. Create the sum logic file
We’ll begin with a baseline implementation of the logic. We create src/sum.py and write below script:

**src/calculator.py**
```python
class Calculator(object):
    def __init__(self):
        pass

    def sum(self, a, b):
        return a + b
```
The above creates a class that takes a and b as inputs and calculates their sum.

### 2. Create the test file
Below we create logic’s test using unittest library:

**src/test_calculator.py**
```python
import unittest
from calculator import Calculator

class TestCalculator(unittest.TestCase):

    def test_sum(self):
        calc = Calculator()
        actual = calc.sum(1, 2)
        self.assertEqual(3, actual)

if __name__ == '__main__':
    unittest.main()
```

### 3. Create the markdown file

**src/logics/calculator_sum.md**
```md
# Sum of calculator class

This is sum description

### Usage
---
from calculator import Calculator

calc = Calculator()
result = calc.sum(1, 2)
print(result)  # 3
---
```

### 4. Create the logicbook file

**src/logics/sum_book.py**
```python
from calculator import Calculator
from logicbook import Logic
from test_calculator import TestCalculator

mylogic = Logic(
    name="Calculator/Sum",
    func=Calculator().sum,
    readme="sum.md",
)

mylogic.add_example(
    name="Default", 
    func=Calculator().sum,
    args={
        "a": 1,
        "b": 2
    })

mylogic.add_test(
  name="Test Class of Calculator", 
  cls=TestCalculator
)
```

There are two basic levels of organization in Logicbook: the logic and its child examples. Think of each example as a permutation of a logic. You can have as many examples per logic as you need.

- Logic
  - Example1
  - Example2
  - Example3

** Logic Arguments **

To tell Logicbook about the logic we are documenting, we enter logic arguments:

```python
mylogic = Logic(
    name="Calculator/Sum",
    func=Calculator().sum,
    readme="sum.md",
)
```

| Argument   |     type      | description |
| --- | ----------- | ------- |
| name    | string |      how to refer to the component in the sidebar of the Storybook app |
| func    | function |     the logic (function) itself|
| readme    | string |     readme file path (relative path from logics directory) |

** add_example Arguments **

```python
mylogic.add_example(
    name="Default", 
    func=Calculator().sum,
    args={
        "a": 1,
        "b": 2
    })
```

| Argument   |     type      | description |
| --- | ----------- | ------- |
| name    | string |      name of example |
| func    | function |     the logic (function) itself|
| args    | dict |     readme file path (relative path from logics directory) |

** add_test Arguments **

```python
mylogic.add_test(
  name="Test Class of Calculator", 
  cls=TestCalculator
)
```

| Argument   |     type      | description |
| --- | ----------- | ------- |
| name    | string |      name of example |
| cls    | class |     the Testcase (class)|

### 5. Run server and check the logic

![Docs Version Dropdown](/img/example.png)
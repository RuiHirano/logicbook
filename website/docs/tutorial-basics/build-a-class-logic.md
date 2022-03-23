---
sidebar_position: 2
---

# Build a class logic
**Build a class logic in isolation**

## Class Calculator Logic

First, let’s create the calculator logic and its accompanying book file: src/calculator.py and src/logics/calculator_book.py.

### 1. Create the calculator logic file
We’ll begin with a baseline implementation of the logic. We create src/calculator.py and write below script:

**src/calculator.py**
```python
class Calculator(object):
    def __init__(self):
        pass

    def add(self, a, b):
        return a + b

    def sub(self, a, b):
        return a - b
```
The above creates a function that takes a and b as inputs and calculates their addition and subtract value.

### 2. Create the test file
Below we create logic’s test using unittest library:

**src/test_calculator.py**
```python
import unittest
from calculator import Calculator

class TestCalculatorAdd(unittest.TestCase):

    def setUp(self):
        self.calc = Calculator()

    def test_add(self):
        actual = self.calc.add(1, 2)
        self.assertEqual(3, actual)

class TestCalculatorSub(unittest.TestCase):

    def setUp(self):
        self.calc = Calculator()

    def test_sub(self):
        actual = self.calc.sub(2, 1)
        self.assertEqual(1, actual)

if __name__ == '__main__':
    unittest.main()
```

### 3. Create the markdown file

**src/logics/calculator_add.md**
```md
# add function of calculator class

This is add description

### Usage
---
from calculator import Calculator

calc = Calculator()
result = calc.add(1, 2)
print(result)  # 3
---
```

**src/logics/calculator_sub.md**
```md
# sub function of calculator class

This is sub description

### Usage
---
from calculator import Calculator

calc = Calculator()
result = calc.sub(2, 1)
print(result)  # 1
---
```

### 4. Create the logicbook file

**src/logics/calculator_book.py**
```python
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
```

** Logic Arguments **

To tell Logicbook about the logic we are documenting, we enter logic arguments:

```python
add = Logic(
    name="Calculator/Add",
    func=Calculator().add,
    readme="calculator_add.md",
)
```

| Argument   |     type      | description |
| --- | ----------- | ------- |
| name    | string |      how to refer to the component in the sidebar of the Storybook app |
| func    | function |     the logic (function) itself|
| readme    | string |     readme file path (relative path from logics directory) |

** add_example Arguments **

```python
add.add_example(
    name="Default", 
    func=Calculator().add,
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
add.add_test(
  name="Test Class of Calculator", 
  test_case=TestCalculatorAdd
)
```

| Argument   |     type      | description |
| --- | ----------- | ------- |
| name    | string |      name of example |
| cls    | class |     the Testcase (class)|

### 5. Run server and check the logic

![Docs Version Dropdown](/img/tutorial/example_add.png)

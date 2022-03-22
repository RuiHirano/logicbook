---
sidebar_position: 1
---

# Build a simple logic
**Build a simple logic in isolation**

## Simple Join Logic

First, let’s create the join logic and its accompanying book file: src/join.py and src/logics/join_book.py.

### 1. Create the join logic file
We’ll begin with a baseline implementation of the logic. We create src/join.py and write below script:

**src/join.py**
```python
def join(a: str, b: str):
  return a + b
```
The above creates a function that takes a and b as inputs and calculates their join.

### 2. Create the test file
Below we create logic’s test using unittest library:

**src/test_join.py**
```python
import unittest
from join import join

class TestJoin(unittest.TestCase):

    def test_join(self):
        actual = join(1, 2)
        self.assertEqual(3, actual)

if __name__ == '__main__':
    unittest.main()
```

### 3. Create the markdown file

**src/logics/join.md**
```md
# Join

This is join description

### Usage
---
from join import join
result = join(1, 2)
print(result)  # 3
---
```

### 4. Create the logicbook file

**src/logics/join_book.py**
```python
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
        "a": "Hello",
        "b": "Logicbook!"
    }
)

mylogic.add_test(
  name="Test Class of Join", 
  cls=TestJoin
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
    name="Join",
    func=join,
    readme="join.md",
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
    func=join,
    args={
        "a": "Hello",
        "b": "Logicbook!"
    }
)
```

| Argument   |     type      | description |
| --- | ----------- | ------- |
| name    | string |      name of example |
| func    | function |     the logic (function) itself|
| args    | dict |     readme file path (relative path from logics directory) |

** add_test Arguments **

```python
mylogic.add_test(
  name="Test Class of Join", 
  cls=TestJoin
)
```

| Argument   |     type      | description |
| --- | ----------- | ------- |
| name    | string |      name of example |
| cls    | class |     the Testcase (class)|

### 5. Run server and check the logic

![Docs Version Dropdown](/img/example.png)
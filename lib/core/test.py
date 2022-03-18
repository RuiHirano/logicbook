import os
import inspect

def test():
    print("test")

print(os.path.abspath(inspect.getfile(test)))

class Test:
    def __init__(self) -> None:
        pass

    def test1(self):
        print("test1")

    def test2(self):
        print("test2")

import unittest
def sum_logic(a, b):
    return a + b

class TestSum(unittest.TestCase):

    def test_sum(self):
        actual = sum_logic(1, 2)
        self.assertEqual(3, actual)

def getLocalMethods(clss):
    import types
    result = [ ]
    print(clss.__dict__, types.FunctionType)
    for var in clss.__dict__:
        val = clss.__dict__[var]
        if isinstance(val, types.FunctionType) and var.startswith('test'):
            result.append(var)
    return sorted(result)
    
print(Test)
print(getLocalMethods(Test))
print(getLocalMethods(TestSum))
methods = getLocalMethods(TestSum)
for method in methods:
    print(method)
    print(TestSum.__dict__[method])
    print(TestSum.__dict__[method].__name__)
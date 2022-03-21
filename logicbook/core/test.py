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
    def setUp(self, a):
        self.a = a

    def test_sum(self):
        num = self.a
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

print(hasattr(getLocalMethods, '__self__'))

def foo(a, b, c=4, *arglist, **keywords): pass

class Test:
    def __init__(self, a, b):
        self.a = a
        self.b = b

    def test1(self):
        return self.a + self.b

tes = Test(1, 2)
print(tes.__dict__, tes.test1())
args = tes.__dict__
tes2 = Test(**args)
print(tes2.__dict__, tes2.test1())
print(inspect.getfullargspec(tes.__init__))

print(tes.test1)
print(Test.test1)
#test_sum = TestSum()
#print(test_sum.test_sum())
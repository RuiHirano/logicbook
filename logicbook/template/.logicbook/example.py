from logicbook import Logicbook
import unittest

book = Logicbook()

class TestSample(unittest.TestCase):
    def test_sum_ok(self):
        self.assertEqual(TestClass("").sum(1, 2), 3)

@book.func("This is test function")
def test():
    print("test")

@book.func("This is test2 function")
def test2():
    print("test2")

@book.clas("This is Test Class")
class TestClass:
    def __init__(self, name):
        pass

    @book.func("This is Sum Function", tests=[TestSample])
    def sum(self, a, b):
        return a + b
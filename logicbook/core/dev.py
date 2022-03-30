from app import App
from module import Logicbook
import unittest

def run_app():
    
    book = Logicbook()

    class TestSample(unittest.TestCase):
        def test_sum_ok(self):
            self.assertEqual(TestClass("").sum(1, 2), 3)

    @book.func("テストのための関数")
    def test():
        print("test")

    @book.func("This is Function")
    def test2():
        print("test2")

    @book.clas("This is Test Class")
    class TestClass:
        def __init__(self, name):
            print("init: ", name)

        @book.func("This is Sum Function", tests=[TestSample])
        def sum(self, a, b):
            print("sum")
            return a + b


    app = App(
        modules=[book]
    )
    app.run(host="0.0.0.0", port=1001)

run_app()
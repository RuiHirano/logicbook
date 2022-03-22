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
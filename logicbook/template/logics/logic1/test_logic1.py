import unittest
from logic1 import SumLogic

class TestSum(unittest.TestCase):

    def test_sum(self):
        sum_logic = SumLogic(1, 2)
        actual = sum_logic.sum(2)
        self.assertEqual(5, actual)

    def test_sum2(self):
        sum_logic = SumLogic(4, 2)
        actual = sum_logic.sum(4)
        self.assertEqual(10, actual)


if __name__ == '__main__':
    unittest.main()
import unittest
from logic1 import sum_logic

class TestSum(unittest.TestCase):

    def test_sum(self):
        actual = sum_logic(1, 2)
        self.assertEqual(3, actual)

    def test_sum2(self):
        actual = sum_logic(1, 2)
        self.assertEqual(3, actual)


if __name__ == '__main__':
    unittest.main()
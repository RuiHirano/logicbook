import unittest
from logic2 import join_string

class TestJoin(unittest.TestCase):

    def test_join(self):
        actual = join_string("hello", "world")
        self.assertEqual("hello world", actual)

if __name__ == '__main__':
    unittest.main()
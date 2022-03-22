import unittest
from join import join

class TestJoin(unittest.TestCase):

    def test_join(self):
        actual = join("Hello", "World")
        self.assertEqual("HelloWorld", actual)

if __name__ == '__main__':
    unittest.main()
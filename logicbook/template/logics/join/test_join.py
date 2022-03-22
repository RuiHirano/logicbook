import unittest
from join import join

class TestJoin(unittest.TestCase):

    def test_join(self):
        actual = join(1, 2)
        self.assertEqual(3, actual)

if __name__ == '__main__':
    unittest.main()
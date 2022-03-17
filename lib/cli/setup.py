from setuptools import setup
from glob import glob
from os.path import basename
from os.path import splitext

with open('README.rst') as f:
    readme = f.read()

with open('requirements.txt') as f:
    all_reqs = f.read().split('\n')
install_requires = [x.strip() for x in all_reqs]

setup(
    name="logicbook",
    version="1.7.0",
    packages=['logicbook'],
    include_package_data=True,
    entry_points={
            "console_scripts": ['logicbook = logicbook.root:main']
        },
    install_requires = install_requires,
    description='Logicbook CLI',
    long_description=readme,
    author='Rui Hirano',
    license='MIT',
)
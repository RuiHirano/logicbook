from setuptools import setup, find_packages

with open('README.rst') as f:
    readme = f.read()

with open('requirements.txt') as f:
    all_reqs = f.read().split('\n')
install_requires = [x.strip() for x in all_reqs]

setup(
    name="logicbook",
    version="0.0.1",
    packages=["lib.core", "lib.cli"],
    include_package_data=True,
    entry_points={
            "console_scripts": ['logicbook = lib.cli.root:main']
        },
    install_requires = install_requires,
    description='Logicbook CLI',
    long_description=readme,
    author='Rui Hirano',
    license='MIT',
)
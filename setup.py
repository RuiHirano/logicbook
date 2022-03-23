from setuptools import setup, find_packages

with open('README.rst') as f:
    readme = f.read()

with open('requirements.txt') as f:
    all_reqs = f.read().split('\n')
install_requires = [x.strip() for x in all_reqs]

setup(
    name="logicbook",
    version="0.1.4",
    packages=["logicbook"],
    include_package_data=True,
    entry_points={
            "console_scripts": ['logicbook = logicbook.cli.root:main']
        },
    install_requires = install_requires,
    description='Logicbook is an open source tool for building python logics in isolation. It streamlines logic development, testing, and documentation.',
    long_description=readme,
    author='Rui Hirano',
    license='MIT',
    url='https://ruihirano.github.io/logicbook/',
)
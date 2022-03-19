# LogicBook

# Publish Package
https://qiita.com/c60evaporator/items/e1ecccab07a607487dcf
```
cd logicbook
python setup.py sdist
python setup.py bdist_wheel # this is not necessary
pip install dist/logicbook-0.0.1.tar.gz
```

```
# for test
twine upload --repository testpypi dist/* 
# for prod
twine upload --repository pypi dist/*
```

```
$ pip install --index-url https://test.pypi.org/simple/ logicbook
$ pip install logicbook
```

# Document by docusaurus
https://qiita.com/futakuchi0117/items/4d3997c1ca1323259844
```
sphinx-quickstart docs
sphinx-apidoc -f -o ./docs .
sphinx-build -b singlehtml ./docs ./docs/_build
```
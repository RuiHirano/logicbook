# LogicBook

# Getting Started
### Install
```
$ pip install logicbook
```

### Add Logicbook
```
$ cd your_project
$ logicbook init
```

### Start Server
```
$ cd your_project
$ logicbook start
```


# for Developer
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
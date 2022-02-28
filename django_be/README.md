### After install python3 (3.6), pip, django 

---
#### Check Django version
```
python3 -m django --version
>>> 3.1.3
```

---
#### Create a Django project 
```
django-admin startproject django_be
```
* This will create a folder called **django_be**, containing **settings.py**, **urls.py**, ...

---
#### Create a Django app
```
~ $ cd django_be
~ /django_be $ python3 manage.py startapp todo
```
##### A Django project can contains many Django App. 
* The command line above will create a folder called **todo**, containing **models.py**, **views.py**, ... and **migrations** folder.

#### Check the file list 
```
~ /django_be $ tree
.
├── django_be
│   ├── asgi.py
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-36.pyc
│   │   └── settings.cpython-36.pyc
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
└── todo
    ├── admin.py
    ├── apps.py
    ├── __init__.py
    ├── migrations
    │   └── __init__.py
    ├── models.py
    ├── tests.py
    └── views.py
```
---
#### Django server automatically run at port 8000. Start server with: 
```
~ /django_be $ python3 manage.py runserver
```

--- 
#### Detailed information about each file in Django, check: 
* [First Steps with Django](https://realpython.com/django-setup/)
* [Writing your first Django app](https://docs.djangoproject.com/en/4.0/intro/tutorial01/)

---
#### Setup Restful API App
* Install **djangorestframework**, **mongoengine**, 
```
pip3 install mongoengine/djangorestframework
```  
* Write 3 more lines in **settings.py**
```
INSTALLED_APPS = [
    ...
    'rest_framework',
    'corsheader'.
    'todo.apps.TodoConfig'
]
```

* ... and Middleware (the part which adjusts, converts requests & responses) as well


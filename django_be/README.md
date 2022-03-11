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
##### Install the following python packages: 
* **djangorestframework**
* **pymongo**
* **mongoengine**  
* **django-cors-headers**
* **djongo**
* **dnspython**

```
pip3 install <package_name>
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
```
MIDDLEWARE = [
    ...
    'corsheaders.middleware.CorsMiddleware',
]
```

---
#### Atlas: Mongo DB Cloud. After signing up, create a cluster & get the link
```
DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'CLIENT': {
            'host' : 'mongodb+srv://<DB_NAME>:<DB_PW>@todoapp.ejnw2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            'name' : <real_DB_NAME_YOU_WANT>,
            'authMechanism' : 'SCRAM-SHA-1' # For Atlas cloud db
        }
    }
}
```

---
#### ATTENTIONS !
* **models.DateField**: The default value should be type of **django.utils.timezone.now**
* **djongo (version 1.3.6)** IS NOT COMPATIBLE WITH **pymongo 4.0**, use **pymongo 3.12.1** instead. 

#### SPECIAL COMMAND WITH MONGOENGINE
* **Insert another field**: 
```task.update(set__<dict_field>__<new_filed> = [], {} ... )```

* **Push/Pull another element into list**: 
  ```task.update(push__<dict_field>__<list_field> = "String", [], {})```
  ```task.update(pull__<dict_field>__<list_field> = "String", [], {})```

* **Get LIST instance(s) of class TaskElement satisfying the condition :**
  ```TaskElement.objects(task_id=data['task_id'])```
  
* **Get LIST of ALL instance(s) in collection DB :**
  ```TaskElement.objects.all()```
  
* **Get the first instance satisfying the condition**
  ```TaskElement.objects.first()```
  
* **Return only 1 object satisfying the condition (2 or more object satisfy --> raise Exception) :**
  ```TaskElement.objects.get(task_id=data['task_id'])```
  
* **Update 1 unique field (not ListField/DictField)**
  ```TaskElement.objects.update(<field_name>=<value>)```
  
* **Delete a document in the collection**
```
task = TaskElement.objects.get(task_id=data['task_id'])
task.delete()
```

* **Update multiple fields, set unknown-field-name with its value**
```
task = TaskElement.objects.get(task_id=ObjectId(data['task_id']))
keys = data['criteria'].keys()

for key in keys:
    myStr = {"set__criteria__" + str(key) : data['criteria'][key]}
    task.update(**myStr)
```

* **Update with RAW QUERY**
```
task = TaskElement.objects.get(task_id=data['task_id'])
task.update(__raw__={'$set': {'tags': 'coding'}})
```
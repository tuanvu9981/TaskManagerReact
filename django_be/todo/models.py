from django.db import models
from django.utils import timezone
from mongoengine import Document, EmbeddedDocument, fields
from bson import ObjectId
# Create your models here.

class TaskElement(Document):
    _id = fields.ObjectIdField(default=ObjectId, primary_key=True)
    taskTitle = fields.StringField(max_length=150)
    startDate = fields.DateField(default=timezone.now)
    deadline = fields.DateField()
    priority = fields.StringField(max_length=20, choices=("High","Average","Low","None"))
    isDone = fields.BooleanField(default=False)
    criteria = fields.DictField()

class TopicElement(Document):
    _id = fields.ObjectIdField(default=ObjectId, primary_key=True)
    topicTitle = fields.StringField(max_length=100)
    solvedTaskNum = fields.IntField(default=0)
    totalTaskNum = fields.IntField(default=0)
    taskList = fields.ListField(fields.ReferenceField(document_type=TaskElement))

""" This two class represents EmbeddedDocumentField & List """
# class TaskElement(EmbeddedDocument):
#     _id = fields.ObjectIdField(default=ObjectId, primary_key=True)
#     taskTitle = fields.StringField(max_length=150)
#     startDate = fields.DateField(default=timezone.now)
#     deadline = fields.DateField()
#     priority = fields.StringField(max_length=20, choices=("High","Average","Low","None"))
#     isDone = fields.BooleanField(default=False)
#     criteria = fields.DictField()
#
# class TopicElement(Document):
#     _id = fields.ObjectIdField(default=ObjectId, primary_key=True)
#     topicTitle = fields.StringField(max_length=100)
#     solvedTaskNum = fields.IntField(default=0)
#     totalTaskNum = fields.IntField(default=0)
#     taskList = fields.ListField(fields.EmbeddedDocumentField(document_type=TaskElement))

class Person(Document):
    _id = fields.ObjectIdField(default=ObjectId, primary_key=True)
    fullname = fields.StringField(max_length=100)
    avatarLink = fields.StringField(max_length=400)
    username = fields.StringField(max_length=100)
    password = fields.StringField(max_length=400)
    topicList = fields.ListField(fields.ReferenceField(document_type=TopicElement))
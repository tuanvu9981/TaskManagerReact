from django.db import models
from mongoengine import Document, fields
import datetime
# Create your models here.

class TaskElement(Document):
    title = fields.StringField(required=True, max_length=100)
    startDate = fields.DateField(default=datetime.datetime.now())
    deadline = fields.DateField(required=True)
    priority = fields.StringField(max_length=20)
    isDone = fields.BooleanField(required=True)
    criteriaList = fields.ListField()
    # Prepared for user's free criteria

class TopicElement(Document):
    taskNum = fields.IntField(default=0)
    taskList = fields.ListField(fields.EmbeddedDocumentListField(document_type="TaskElement"))

class Person(Document):
    name = fields.StringField(required=True, max_length=100)
    avatarLink = fields.StringField(required=True, max_length=400)
    username = fields.StringField(required=True, max_length=100)
    password = fields.StringField(required=True, max_length=400)
    topicList = fields.ListField(fields.ReferenceField(document_type=TopicElement))
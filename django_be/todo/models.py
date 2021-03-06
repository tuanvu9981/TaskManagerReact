from django.db import models
from django.utils import timezone
from mongoengine import Document, EmbeddedDocument, fields
from bson import ObjectId
# Create your models here.

class TaskElement(Document):
    task_id = fields.ObjectIdField(default=ObjectId, primary_key=True)
    taskTitle = fields.StringField(max_length=150)
    startDate = fields.DateField(default=timezone.now)
    deadline = fields.DateField()
    priority = fields.StringField(max_length=20, choices=("High","Average","Low","None"))
    isDone = fields.BooleanField(default=False)
    criteria = fields.DictField()

    def to_json(self, *args, **kwargs):
        return {
            "task_id" : str(self.pk),
            "taskTitle" : self.taskTitle,
            "startDate" : self.startDate,
            "deadline" : self.deadline,
            "priority" : self.priority,
            "isDone" : self.isDone,
            "criteria" : self.criteria
        }

class TopicElement(Document):
    topic_id = fields.ObjectIdField(default=ObjectId, primary_key=True)
    image = fields.StringField(default="topic_image.png", max_length=400)
    topicTitle = fields.StringField(max_length=100)
    solvedTaskNum = fields.IntField(default=0)
    totalTaskNum = fields.IntField(default=0)
    taskList = fields.ListField(fields.ReferenceField(document_type=TaskElement))

    def to_json(self, *args, **kwargs):

        taskListJson = []
        for task in self.taskList:
            taskListJson.append(task.to_json())

        return {
            "topic_id" : str(self.pk),
            "image": self.image,
            "topicTitle" : self.topicTitle,
            "solvedTaskNum" : self.solvedTaskNum,
            "totalTaskNum" : self.totalTaskNum,
            "taskList" : taskListJson
        }

    def to_DTO(self):
        return {
            "topic_id": str(self.pk),
            "topicTitle": self.topicTitle,
            "solvedTaskNum": self.solvedTaskNum,
            "totalTaskNum": self.totalTaskNum,
            "image": self.image,
        }

    def to_list(self):
        taskListJson = []
        for task in self.taskList:
            taskListJson.append(task.to_json())
        return taskListJson

""" This two class represents EmbeddedDocumentField & List """
# class TaskElement(EmbeddedDocument):
#     id = fields.ObjectIdField(default=ObjectId, primary_key=True)
#     taskTitle = fields.StringField(max_length=150)
#     startDate = fields.DateField(default=timezone.now)
#     deadline = fields.DateField()
#     priority = fields.StringField(max_length=20, choices=("High","Average","Low","None"))
#     isDone = fields.BooleanField(default=False)
#     criteria = fields.DictField()
#
# class TopicElement(Document):
#     id = fields.ObjectIdField(default=ObjectId, primary_key=True)
#     topicTitle = fields.StringField(max_length=100)
#     solvedTaskNum = fields.IntField(default=0)
#     totalTaskNum = fields.IntField(default=0)
#     taskList = fields.ListField(fields.EmbeddedDocumentField(document_type=TaskElement))

class Person(Document):
    person_id = fields.ObjectIdField(default=ObjectId, primary_key=True)
    fullname = fields.StringField(max_length=100)
    avatarLink = fields.StringField(max_length=400)
    username = fields.StringField(max_length=100)
    password = fields.StringField(max_length=400)
    email = fields.EmailField(max_length=100)
    topicList = fields.ListField(fields.ReferenceField(document_type=TopicElement))

    def to_json(self, *args, **kwargs):
        return {
            "person_id" : str(self.pk),
            "fullname" : self.fullname,
            "avatarLink": self.avatarLink,
            "email": self.email
        }
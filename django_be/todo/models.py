from django.db import models
from django.utils import timezone
# Create your models here.

class Person(models.Model):
    personId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    avatarLink = models.CharField(max_length=400)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=400)

class TopicElement(models.Model):
    topicElementId = models.AutoField(primary_key=True)
    topicTitle = models.CharField(max_length=100)
    solvedTaskNum = models.PositiveIntegerField(default=0)
    totalTaskNum = models.PositiveIntegerField(default=0)
    ownBy = models.ForeignKey(Person, on_delete=models.CASCADE)

class TaskElement(models.Model):
    taskElementId = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    startDate = models.DateField(default=timezone.now)
    deadline = models.DateField()
    priority = models.CharField(max_length=20, choices=(('1',"High"), ('2',"Average"), ('3',"Low"), ('4',"None")))
    isDone = models.BooleanField(default=False)
    containedBy = models.ForeignKey(TopicElement, on_delete=models.CASCADE)

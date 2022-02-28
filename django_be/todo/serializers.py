from rest_framework import serializers
from todo.models import *

class TaskElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskElement
        fields = (
            'title',
            'startDate',
            'deadline',
            'priority',
            'isDone',
            'criteriaList'
        )

class TopicElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicElement
        fields = (
            'taskNum',
            'taskList'
        )

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = (
            'name',
            'avatarLink'
            'username'
            'password'
            'topicList'
        )


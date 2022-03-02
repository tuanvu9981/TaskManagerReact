from rest_framework import serializers
from todo.models import *

class PersonSerializer(serializers.ModelSerializer):

    personalTopics = serializers.PrimaryKeyRelatedField(queryset=TopicElement.objects.all())

    class Meta:
        model = Person
        fields = (
            'personId',
            'name',
            'avatarLink'
            'username'
            'password'
        )


class TaskElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskElement
        fields = (
            'taskElementId',
            'title',
            'startDate',
            'deadline',
            'priority',
            'isDone',
        )

class TopicElementSerializer(serializers.ModelSerializer):

    TaskList = TaskElementSerializer(many=True)

    class Meta:
        model = TopicElement
        fields = (
            'topicElementId',
            'topicTitle',
            'solvedTaskNum',
            'totalTaskNum'
        )







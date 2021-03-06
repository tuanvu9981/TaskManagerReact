from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from todo.models import TopicElement, Person
import json
from bson import ObjectId

""" GET == SELECT | POST == CREATE | PUT == UPDATE | DELETE == DELETE """

@csrf_exempt
def createNewTopic(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        topic = TopicElement()
        topic.topicTitle = data['topicTitle']
        topic.save()

        owner = Person.objects.get(person_id=ObjectId(data['person_id']))
        owner.update(
            push__topicList = topic
        )
        return JsonResponse(
            data={
                "status" : "OK",
                "topic": topic.to_DTO(),
            }
        )
    return JsonResponse(
        data={"status" : "ERROR"}
    )

@csrf_exempt
def getAllTopicOfPerson(request):
    if request.method == 'GET':

        """ retrieve from param request """
        person_id = request.GET.get('person_id')
        owner = Person.objects.get(person_id=ObjectId(person_id))
        topicList = []

        for topic in owner.topicList:
            topicList.append(topic.to_DTO())

        return JsonResponse(
            data={
                "status" : "OK",
                "topicList" : topicList
            }
        )
    return JsonResponse(
        data={"status": "ERROR"}
    )

@csrf_exempt
def deleteOneTopic(request):
    if request.method == 'PUT':
        """ DELETE ONE TOPIC == UPDATE, PULLING OUT OF LIST """

        data = json.loads(request.body)

        owner = Person.objects.get(person_id=ObjectId(data['person_id']))
        topic = TopicElement.objects.get(topic_id=ObjectId(data['topic_id']))

        owner.update(
            pull__topicList = ObjectId(data['topic_id'])
        )
        topic.delete()

        return JsonResponse(
            data={
                "status" : "OK",
                "topicTitle" : topic.topicTitle
            }
        )
    return JsonResponse(
        data={"status" : "ERROR"}
    )

@csrf_exempt
def updateTopicTitle(request):
    if request.method == 'PUT':
        data = json.loads(request.body)

        topic = TopicElement.objects.get(topic_id=ObjectId(data['topic_id']))
        topic.update(
            topicTitle = data['new_title']
        )

        updated_topic = TopicElement.objects.get(topic_id=ObjectId(data['topic_id']))
        return JsonResponse(
            data={
                "status" : "OK",
                "updated_topic": updated_topic.to_json()
            }
        )
    return JsonResponse(
        data={"status": "ERROR"}
    )

@csrf_exempt
def getAllTaskByTopicId(request):
    if request.method == 'GET':
        topic_id = request.GET.get('topic_id')

        topic = TopicElement.objects.get(topic_id=ObjectId(topic_id))
        print(topic.to_list())
        return JsonResponse(
            data={
                "status" : "OK",
                "taskList" : topic.to_list()
            }
        )
    return JsonResponse(data={"status" : "ERROR"})
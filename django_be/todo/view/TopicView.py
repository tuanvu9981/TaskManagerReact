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
                "topic":{
                    "topic_id": str(topic.pk),
                    "topicTitle" : topic.topicTitle,
                    "solvedTaskNum": topic.solvedTaskNum,
                    "totalTaskNum" : topic.totalTaskNum
                },
                "owner":{
                    "person_id": str(owner.pk),
                    "fullname" : owner.fullname
                }
            }
        )
    return JsonResponse(
        data={"status" : "ERROR"}
    )

@csrf_exempt
def getAllTopicOfPerson(request):
    if request.method == 'GET':

        data = json.loads(request.body)

        owner = Person.objects.get(person_id=ObjectId(data['person_id']))
        topicList = []

        for topic in owner.topicList:
            topicList.append(topic.to_json())

        return JsonResponse(
            data={
                "status" : "OK",
                "topicList" : topicList
            }
        )
    return JsonResponse(
        data={"status": "ERROR"}
    )

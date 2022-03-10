from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from todo.models import TopicElement
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

        return JsonResponse(
            data={
                "status" : "OK",
                "topic":{
                    "topic_id": str(topic.pk),
                    "topicTitle" : topic.topicTitle,
                    "solvedTaskNum": topic.solvedTaskNum,
                    "totalTaskNum" : topic.totalTaskNum
                }
            }
        )
    return JsonResponse(
        data={"status" : "ERROR"}
    )
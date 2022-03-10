from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
import json
from bson import ObjectId
from todo.models import TaskElement, TopicElement

"""GET == SELECT | POST == CREATE | PUT == UPDATE | DELETE == DELETE """

@csrf_exempt
def createNewTask(request):
    if request.method == 'POST':

        """ BODY RAW REQUEST JSON """
        data = json.loads(request.body)

        task = TaskElement()
        task.taskTitle = data['taskTitle']
        task.priority = data['priority']
        task.deadline = data['deadline']
        task.startDate = data['startDate']
        task.save()

        topic = TopicElement.objects.get(topic_id=ObjectId(data['topic_id']))
        myQuery = {
            "totalTaskNum" : topic.totalTaskNum + 1,
            "push__taskList" : task
        }
        topic.update(**myQuery)

        return JsonResponse(
            data={
                "task" :{
                    "task_id": str(task.pk),
                    "taskTitle": task.taskTitle,
                    "priority": task.priority,
                    "startDate": task.startDate,
                    "deadline": task.deadline
                },
                "topic" :{
                    "topic_id": str(topic.pk),
                    "topicTitle": topic.topicTitle
                },
                "status" : "OK"
            }
        )
    return JsonResponse(
        data={ "status": "ERROR" }
    )

@csrf_exempt
def updateTaskStatus(request):
    if request.method == 'PUT':

        """ BODY RAW REQUEST JSON """
        data = json.loads(request.body)

        topic = TopicElement.objects.get(topic_id=ObjectId(data['topic_id']))
        task = TaskElement.objects.get(task_id=ObjectId(data['task_id']))
        task.update(isDone=data['isDone'])

        if (data['isDone'] == True):
            topic.update(solvedTaskNum = topic.solvedTaskNum + 1)
        else:
            topic.update(solvedTaskNum = topic.solvedTaskNum - 1)

        return JsonResponse(
            data={ "status" : "OK"}
        )
    return JsonResponse(
        data={"status": "ERROR"}
    )

@csrf_exempt
def deleteTask(request):
    if request.method == 'PUT':
        data = json.loads(request.body)

        topic = TopicElement.objects.get(topic_id=data['topic_id'])
        task = TaskElement.objects.get(task_id=ObjectId(data['task_id']))

        myQuery = {
            "pull__taskList" : task,
            "totalTaskNum" : topic.totalTaskNum - 1
        }
        topic.update(**myQuery)
        task.delete()
        return JsonResponse(
            data={
                "status": "OK",
                "topic":{
                    "topic_id" : str(topic.pk),
                    "topicTitle": topic.topicTitle
                },
                "task":{
                    "task_id": str(task.pk),
                    "taskTitle" : task.taskTitle
                }
            }
        )
    return JsonResponse(
        data={"status": "ERROR"}
    )

@csrf_exempt
def updateAddCriteria(request):
    if request.method == 'PUT':

        data = json.loads(request.body)
        task = TaskElement.objects.get(task_id=ObjectId(data['task_id']))

        # print(data['criteria'])

        keys = data['criteria'].keys()

        for key in keys:
            myStr = {"set__criteria__" + str(key) : data['criteria'][key]}
            task.update(**myStr)

        newTask = TaskElement.objects.get(task_id=ObjectId(data['task_id']))
        """ task.criteria didn't have enough updated data """

        return JsonResponse(
            data={
                "status": "OK",
                "task": {
                    "task_id": str(newTask.pk),
                    "taskTitle": newTask.taskTitle,
                    "priority": newTask.priority,
                    "startDate": newTask.startDate,
                    "deadline": newTask.deadline,
                    "criteria" : newTask.criteria
                }
            }
        )
    return JsonResponse(data={"status":"ERROR"})


@csrf_exempt
def getOneTaskDetail(request):
    if request.method == 'GET':
        data = json.loads(request.body)
        task = TaskElement.objects.get(task_id=data['task_id'])
        return JsonResponse(
            data={
                "status" : "OK",
                "task" : task.to_json()
            }
        )
    return JsonResponse(data={"status" : "ERROR"})


@csrf_exempt
def updateOneTask(request):
    if request.method == 'PUT':
        data = json.loads(request.body)
        task = TaskElement.objects.get(task_id=data['task_id'])
        myQuery = {
            "taskTitle": data['taskTitle'],
            "startDate": data['startDate'],
            "deadline": data['deadline'],
            "priority": data['priority'],
            "criteria": data['criteria']
        }
        task.update(**myQuery)
        return JsonResponse(
            data={
                "status" : "OK",
                "message" : "Update successfully !"
            }
        )
    return JsonResponse(data={"status" : "ERROR"})


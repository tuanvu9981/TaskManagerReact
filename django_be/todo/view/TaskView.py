from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
import json
from bson import ObjectId
from todo.models import TaskElement

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

        return JsonResponse(
            data={
                "task" :{
                    "task_id": str(task.pk),
                    "taskTitle": task.taskTitle,
                    "priority": task.priority,
                    "startDate": task.startDate,
                    "deadline": task.deadline
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

        task = TaskElement.objects.get(task_id=ObjectId(data['task_id']))
        task.update(
            isDone = data['isDone']
        )

        return JsonResponse(
            data={ "status" : "OK"}
        )
    return JsonResponse(
        data={"status": "ERROR"}
    )

@csrf_exempt
def deleteTask(request):
    if request.method == 'DELETE':
        data = json.loads(request.body)

        task = TaskElement.objects.get(task_id=ObjectId(data['task_id']))
        task.delete()
        return JsonResponse(
            data={"status": "OK"}
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
def getAllTask(request):
    if request.method == 'GET':

        """ GET ALL OBJ: objects.all() --> GET FIRST OBJECT: objects.first() """
        task = TaskElement.objects.all()
        taskList = []

        for i in task:
            taskList.append(i.to_json())

        return JsonResponse(
            data={
                "status" : "OK",
                "taskList" : taskList
            }
        )
    return JsonResponse(data={"status":"ERROR"})
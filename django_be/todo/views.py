from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from django.utils import timezone
from mongoengine import connect, disconnect

from todo.models import *
import json
from django.utils.dateparse import parse_date

# Create your views here.

def setup():
    connect(
        db="todo",
        host="localhost",
        port=27017
    )


@api_view(['GET', 'PUT', 'DELETE', 'POST'])
@csrf_exempt
def addOneTask(request):
    if request.method == 'POST':
        try:
            """ BODY RAW JSON REQUEST """
            # data = json.loads(request.body)
            # username = data['username']
            # realname = data['realname']

            """ FORM-DATA REQUEST """
            # username = request.POST['username']
            # realname = request.POST['realname']

            setup()
            person = Person()
            person.username = request.POST['username']
            person.fullname = request.POST['fullname']
            person.password = request.POST['password']
            person.save()

            print(person.__dict__)
            disconnect()

            # print("username = {}, realname = {}".format(username, realname))

            return JsonResponse(
                data={
                    "person" : json.dumps(person.__dict__),
                    "status" : "OK"
                }
            )
        except:
            print("Something wrong!\n")
    return JsonResponse(data={"status": "ERR", "message" : "Error Happened"})

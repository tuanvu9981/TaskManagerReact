from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from todo.models import Person
import json
from bson import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash

"""GET == SELECT | POST == CREATE | PUT == UPDATE | DELETE == DELETE """

@csrf_exempt
def signUp(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        person_search = Person.objects(username=data['username'])
        if (person_search.count() !=  0):
            return JsonResponse(
                data={
                    "status" : "ERROR_DUP",
                    "message": "Username already existed !"
                }
            )

        person = Person()
        person.username = data['username']
        person.fullname = data['fullname']
        person.password = generate_password_hash(data['password'])
        person.avatarLink = "default_avatar.png"
        person.save()

        return JsonResponse(
            data={
                "person" : {
                    "person_id": str(person.id),
                    "username": person.username,
                    "fullname": person.fullname,
                    "password": person.password,
                    "avatarLink": person.avatarLink
                },
                "status" : "OK"
            }
        )

    return JsonResponse(data={"status" : "ERROR"})

@csrf_exempt
def signIn(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        username_input = data['username']
        password_input = data['password']

        person = Person.objects.get(username=username_input)
        if (len(person) != 0):
            if check_password_hash(person.password, password_input):
                return JsonResponse(
                    data={
                        "status" : "OK",
                        "message" : "Login successfully",
                        "person" :{
                            "username" : person.username,
                            "avatarLink" : person.avatarLink,
                            "fullname": person.fullname,
                            "person_id": str(person.pk)
                        }
                    }
                )
            else:
                return JsonResponse(
                    data={
                        "status" : "ERROR_PW",
                        "message": "Password Incorrect !"
                    }
                )
        else:
            return JsonResponse(
                data={
                    "status" : "ERROR_UN",
                    "message": "Username doesn't exist"
                }
            )
    return JsonResponse(data={"status" : "ERROR"})
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

        person_search = Person.objects(username=data['username'].strip())
        if (person_search.count() !=  0):
            return JsonResponse(
                data={
                    "status" : "ERROR_DUP",
                    "message": "Username already existed !"
                }
            )

        person = Person()
        person.username = data['username'].strip()
        person.fullname = data['fullname'].strip()
        person.email = data['email'].strip()
        person.password = generate_password_hash(data['password'].strip())
        person.avatarLink = "default_avatar.png"
        person.save()

        return JsonResponse(
            data={
                "person" : person.to_json(),
                "status" : "OK"
            }
        )

    return JsonResponse(data={"status" : "ERROR"})

@csrf_exempt
def signIn(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        username_input = data['username'].strip()
        password_input = data['password'].strip()

        person_search = Person.objects(username=username_input)

        if (person_search.count() != 0):
            person = Person.objects.get(username=username_input)
            if check_password_hash(person.password, password_input):
                return JsonResponse(
                    data={
                        "status" : "OK",
                        "message" : "Login successfully",
                        "person" : person.to_json()
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
    return JsonResponse(
        data={
            "status" : "ERROR",
            "message" : "Network Problem occurred !"
        })

@csrf_exempt
def updateAvatar(request):
    if request.method == 'PUT':

        data = json.loads(request.body)

        person = Person.objects.get(person_id=ObjectId(data['person_id']))
        person.update(
            avatarLink = data['avatarLink']
        )

        new_person = Person.objects.get(person_id=ObjectId(data['person_id']))
        return JsonResponse(
            data={
                "status" : "OK",
                "new_person": new_person.to_json()
            }
        )
    return JsonResponse(data={"status": "ERROR"})

@csrf_exempt
def updatePassword(request):
    if request.method == 'PUT':
        data = json.loads(request.body)

        person = Person.objects.get(person_id=ObjectId(data['person_id']))

        if (check_password_hash(person.password, data['old_password']) == False) :
            return JsonResponse(
                data={
                    "status" : "ERROR_PW",
                    "message" : "Old Password Incorrect !"
                }
            )

        person.update(
            password = generate_password_hash(data['new_password'])
        )
        return JsonResponse(
            data={
                "status": "OK",
                "message": "Password updated successfully !"
            }
        )
    return JsonResponse(data={"status": "ERROR"})


""" GET ALL OBJ: objects.all() --> GET FIRST OBJECT: objects.first() """
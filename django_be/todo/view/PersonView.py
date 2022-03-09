from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from todo.models import Person

# Create your views here.

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

            #setup()
            person = Person()

            person.username = request.POST['username']
            person.fullname = request.POST['fullname']
            person.password = request.POST['password']
            person.save()

            #disconnect()

            # print("username = {}, realname = {}".format(request.POST['username'], request.POST['fullname']))

            return JsonResponse(
                data={
                    "person" : {
                        "id": str(person.id),
                        "username": person.username,
                        "fullname": person.fullname,
                        "password": person.password
                    },
                    "status" : "OK"
                }
            )
        except:
            print("Something wrong!\n")
    return JsonResponse(data={"status": "ERR", "message" : "Error Happened"})

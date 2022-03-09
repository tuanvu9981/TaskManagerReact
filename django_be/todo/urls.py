from todo.view import PersonView, TaskView
from django.urls import path

urlpatterns = [
    path('add', PersonView.addOneTask),
    path('addTask', TaskView.createNewTask),
    path('updateAddCriteria', TaskView.updateAddCriteria)
]
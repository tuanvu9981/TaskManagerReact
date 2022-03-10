from todo.view import PersonView, TopicView, TaskView
from django.urls import path

urlpatterns = [
    path('signUp', PersonView.signUp),
    path('signIn', PersonView.signIn),

    path('createNewTask', TaskView.createNewTask),
    path('updateAddCriteria', TaskView.updateAddCriteria),
    path('getAllTask', TaskView.getAllTask),

    path('createNewTopic', TopicView.createNewTopic),
    path('getAllTopicOfPerson', TopicView.getAllTopicOfPerson),
    path('deleteOneTopic', TopicView.deleteOneTopic),
    path('updateTopicTitle', TopicView.updateTopicTitle)
]
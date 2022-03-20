from todo.view import PersonView, TopicView, TaskView
from django.urls import path

urlpatterns = [
    path('signUp', PersonView.signUp),
    path('signIn', PersonView.signIn),
    path('updateAvatar', PersonView.updateAvatar),
    path('updatePassword', PersonView.updatePassword),

    path('createNewTopic', TopicView.createNewTopic),
    path('getAllTopicOfPerson', TopicView.getAllTopicOfPerson),
    path('deleteOneTopic', TopicView.deleteOneTopic),
    path('updateTopicTitle', TopicView.updateTopicTitle),
    path('getOneTopicDetail', TopicView.getOneTopicDetail),

    path('createNewTask', TaskView.createNewTask),
    path('getOneTaskDetail', TaskView.getOneTaskDetail),
    path('deleteTask', TaskView.deleteTask),
    path('updateOneTask', TaskView.updateOneTask),
    path('updateAddCriteria', TaskView.updateAddCriteria),
    path('updateTaskStatus', TaskView.updateTaskStatus)
]

""" 
    [DONE] 'signUp'
    [DONE] 'signIn' 
    'updateAvatar'
    'updatePassword'

    [DONE] 'createNewTopic'
    [DONE] 'getAllTopicOfPerson'
    [DONE] 'deleteOneTopic'
    'updateTopicTitle'
    'getOneTopicDetail'

    'createNewTask'
    'getOneTaskDetail'
    'deleteTask'
    'updateOneTask'
    'updateAddCriteria'
    'updateTaskStatus'
"""
from django.conf.urls import url
from todo import views
from django.urls import path

urlpatterns = [
    path('add',views.addOneTask)
]
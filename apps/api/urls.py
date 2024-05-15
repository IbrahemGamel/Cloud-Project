from django.urls import path, re_path
from apps.api import views

urlpatterns = [

    # The home page
    path('student/add', views.add_student, name='add_student'),
    path('student/delete', views.remove_student, name='remove_student'),
]

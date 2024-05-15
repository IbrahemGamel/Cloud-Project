from django import template
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader

from apps.home.models import Student

def index(request):
    student_list = Student.objects.all()

    context = {
        'segment': 'index',
        'student_list': student_list
    }
    html_template = loader.get_template('home/index.html')
    return HttpResponse(html_template.render(context, request))


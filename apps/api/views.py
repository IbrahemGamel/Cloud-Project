from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse, HttpRequest

# Create your views here.
from apps.home.models import Student

import json
def add_student(request):
    name = request.POST.get('studentName')
    id = request.POST.get('studentId')
    position = request.POST.get('studentPosition')
    gpa = request.POST.get('studentGPA')
    
    student, created = Student.objects.get_or_create(
        id=id
    )
    if created:
        student.name=name
        student.position=position
        student.gpa=gpa
        student.save()
        return JsonResponse({}, status=200)
    else:
        return JsonResponse({'error': 'student already in exists'}, status=400)
    
def remove_student(reuqest: HttpRequest):
    try:
        id = json.loads(reuqest.body.decode())['id']
    except:
        return JsonResponse({'error': 'something wrong in request body'}, status=400)        
    try:
        student = Student.objects.get(id=int(id))
        print(student)
        student.delete()
        return JsonResponse({}, status=200)
    except Student.DoesNotExist:
        print('not found')
        return JsonResponse({'error': 'student not found'}, status=400)
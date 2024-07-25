from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

def stats_view(request):
    data = {
        'status': 'success',
        'data': {
            'key1': 'value1',
            'key2': 'value2'
        }
    }
    return JsonResponse(data)


def index(request):
    return HttpResponse("This is the index page.")
from rest_framework import viewsets
from Tasks.serializers import TaskSerializer
from Tasks.models import Task


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

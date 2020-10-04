from django.db import models
import uuid


class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=50)
    done = models.BooleanField(default=False)

    class Meta:
        db_table = "Tasks"

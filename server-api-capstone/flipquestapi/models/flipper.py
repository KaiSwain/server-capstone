from django.db import models
from django.contrib.auth.models import User


class Flipper(models.Model):
    user = models.OneToOneField(User, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=15)
    coins = models.IntegerField(null=0, blank=0)
    created_at = models.DateField()
    
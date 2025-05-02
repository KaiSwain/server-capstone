from django.db import models
from django.contrib.auth.models import User
from .theme import Theme

class Flipper(models.Model):
    user = models.OneToOneField(User, on_delete=models.DO_NOTHING)
    username = models.CharField(max_length=15)
    coins = models.IntegerField(null=0, blank=0)
    created_at = models.DateField()
    theme = models.ForeignKey(Theme, on_delete=models.DO_NOTHING, default=1)

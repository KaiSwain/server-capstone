from django.db import models

class Category(models.Model):
    tag = models.CharField(max_length=20)
    
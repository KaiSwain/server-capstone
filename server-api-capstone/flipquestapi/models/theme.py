from django.db import models

class Theme(models.Model):
    name = models.CharField(max_length=20)
    background = models.CharField()
    card_color = models.CharField()
    font_color = models.CharField()
    
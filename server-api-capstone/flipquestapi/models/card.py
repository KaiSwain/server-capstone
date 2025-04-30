from django.db import models
from .deck import Deck


class Card(models.Model):
    front = models.CharField(max_length=20)
    back = models.CharField(max_length=30)
    deck = models.ForeignKey(Deck, on_delete=models.DO_NOTHING)
    difficulty = models.CharField()

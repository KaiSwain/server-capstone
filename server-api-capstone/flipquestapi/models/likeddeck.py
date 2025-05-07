from django.db import models
from .flipper import Flipper
from .deck import Deck

class Likeddeck(models.Model):
    deck = models.ForeignKey(Deck, on_delete=models.CASCADE)
    flipper = models.ForeignKey(Flipper, on_delete=models.CASCADE)
    liked_at = models.DateField()
    
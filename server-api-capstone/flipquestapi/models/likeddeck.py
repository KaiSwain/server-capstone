from django.db import models
from .flipper import Flipper
from .deck import Deck

class Likeddeck(models.Model):
    deck = models.OneToOneField(Deck, on_delete=models.DO_NOTHING)
    flipper = models.OneToOneField(Flipper, on_delete=models.DO_NOTHING)
    liked_at = models.DateField()
    
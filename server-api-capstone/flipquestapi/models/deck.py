from django.db import models
from .flipper import Flipper

from .category import Category

class Deck(models.Model):
    title = models.CharField(max_length=15, blank=False)
    description = models.CharField(max_length=40, blank=False)
    created_at = models.DateField(blank=False)
    difficulty = models.CharField()
    creator = models.ForeignKey(Flipper, on_delete=models.DO_NOTHING)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    
    @property
    def cards(self):
        from flipquestapi.views.card import CardSerializer
        from .card import Card
        cards = Card.objects.filter(deck=self.id)
        serializer = CardSerializer(cards, many=True)
        return serializer.data
    
    def is_owner(self, request):
        flipper = Flipper.objects.get(user=request.user)
        if self.creator == flipper:
            return True
        else:
            return False
    
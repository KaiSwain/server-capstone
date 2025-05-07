from django.db import models
from .flipper import Flipper



class Deck(models.Model):
    title = models.CharField(max_length=15, blank=False)
    description = models.CharField(max_length=40, blank=False)
    created_at = models.DateField(blank=False)
    difficulty = models.CharField()
    creator = models.ForeignKey(Flipper, on_delete=models.SET_NULL, null=True)
    category = models.CharField()
    
    @property
    def cards(self):
        from flipquestapi.views.card import CardSerializer
        from .card import Card
        cards = Card.objects.filter(deck=self.id)
        serializer = CardSerializer(cards, many=True)
        return serializer.data
    
    def is_owner(self, request):
        try:
            flipper = Flipper.objects.get(user=request.user)
            return self.creator == flipper
        except Flipper.DoesNotExist:
            return False
        
    def is_liked(self, request):
        try:
            from .likeddeck import Likeddeck
            flipper = Flipper.objects.get(user=request.user)
            if Likeddeck.objects.filter(flipper=flipper, deck=self).exists():
                return True
            return False
        except Flipper.DoesNotExist:
            return False
    
    @property
    def likes(self):
        from .likeddeck import Likeddeck
        likes = Likeddeck.objects.filter(deck = self)
        return len(likes)
    
    
import datetime
from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from rest_framework.decorators import action
from flipquestapi.models.likeddeck import Likeddeck
from flipquestapi.models.flipper import Flipper

class LikedDeckView(ViewSet):

    @action(detail=False, methods=["post"])
    def toggle(self, request):
        from flipquestapi.models.deck import Deck
        try:
            flipper = Flipper.objects.get(user=request.auth.user)
            deck_id = request.data.get("deck")

            deck = Deck.objects.get(pk=deck_id)

            # Check if the like already exists
            like = Likeddeck.objects.filter(deck=deck, flipper=flipper).first()

            if like:
                like.delete()
                return Response({"message": "Unliked."}, status=status.HTTP_204_NO_CONTENT)
            else:
                Likeddeck.objects.create(
                    deck=deck,
                    flipper=flipper,
                    liked_at=datetime.date.today()
                )
                return Response({"message": "Deck liked successfully."}, status=status.HTTP_201_CREATED)

        except Exception as ex:
            return Response({"error": str(ex)}, status=status.HTTP_400_BAD_REQUEST)
        
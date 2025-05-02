from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from flipquestapi.models.deck import Deck
from flipquestapi.models.flipper import Flipper
from flipquestapi.models.category import Category


class DeckSerializer(serializers.ModelSerializer):
    is_owner = serializers.SerializerMethodField()
    class Meta:
        model = Deck
        fields = (
            "id",
            "title",
            "description",
            "created_at",
            "creator",
            "difficulty",
            "category",
            "cards",
            "is_owner"
        )
        depth = 1
    
    def get_is_owner(self,obj):
        request = self.context.get("request")
        if request:
            return obj.is_owner(request)
        return False

class DeckView(ViewSet):

    def list(self, request):
        try:
            decks = Deck.objects.all()
            serializer = DeckSerializer(decks, many=True, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as ex:
            return Response({"error": str(ex)}, status=status.HTTP_404_NOT_FOUND)
        
    def create(self, request):
        try:
            deck = Deck()
            flipper = Flipper.objects.get(user=request.auth.user)
            category = Category.objects.get(pk=request.data['category'])
            deck.title = request.data['title']
            deck.description = request.data['description']
            deck.created_at = request.data['created_at']
            deck.creator = flipper
            deck.category = category
            deck.difficulty = request.data['difficulty']
            deck.save()
            return Response("done", status=status.HTTP_201_CREATED)
        except Exception as ex:
            return Response({"can not create":str(ex)}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def retrieve(self, request, pk=True):
        try:
            deck = Deck.objects.get(pk=pk)
            serializer = DeckSerializer(deck, many=False, context={"request":request})
            return Response(serializer.data)
        except Exception as ex:
            return Response({"error":str(ex)}, status=status.HTTP_404_NOT_FOUND)
        
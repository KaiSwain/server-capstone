from django.http import HttpResponseServerError
import datetime
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from flipquestapi.models.deck import Deck
from flipquestapi.models.card import Card
from flipquestapi.models.flipper import Flipper
from flipquestapi.models.category import Category
from flipquestapi.models.likeddeck import Likeddeck
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action


class DeckSerializer(serializers.ModelSerializer):
    is_owner = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
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
            "is_owner",
            "is_liked",
            "likes"
        )
        depth = 1
    
    def get_is_owner(self,obj):
        request = self.context.get("request")
        if request:
            return obj.is_owner(request)
        return False
    
    def get_is_liked(self,obj):
        request = self.context.get("request")
        if request:
            return obj.is_liked(request)
        return False

class DeckView(ViewSet):

    permission_classes=[AllowAny]

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
            deck.title = request.data['title']
            deck.description = request.data['description']
            deck.created_at = datetime.datetime.today()
            deck.creator = flipper
            deck.category = request.data['category']
            deck.difficulty = request.data['difficulty']
            deck.save()
            for card_data in request.data["cards"]:
                Card.objects.create(
                front=card_data["front"],
                back=card_data["back"],
                difficulty=card_data["difficulty"],
                deck=deck
                )

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
        
    def destroy(self, request, pk):
        
        try:
            deck = Deck.objects.get(pk=pk)
            if deck.is_owner(request):
                deck.delete()
                return Response("deck deleted", status=status.HTTP_204_NO_CONTENT)
            return Response("You are not the owner", status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except Exception as ex:
            return Response({"cant delete": str(ex) }, status=status.HTTP_406_NOT_ACCEPTABLE)
            
    def update(self, request, pk):
        
        try:
            deck = Deck.objects.get(pk=pk)
            deck.title = request.data.get("title")
            deck.description = request.data.get("description")
            deck.difficulty = request.data.get("difficulty")
            deck.save()
            return Response({"DECK UPDATED": str(deck.id)})
        except Exception as ex:
            return Response({"Not updated": str(ex)}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=["get"])
    def likeddecks(self, request):
        try:
            flipper = Flipper.objects.get(user=request.auth.user)
            liked_deck_entries = Likeddeck.objects.filter(flipper=flipper)
            liked_decks = [entry.deck for entry in liked_deck_entries]

            serializer = DeckSerializer(liked_decks, many=True, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Flipper.DoesNotExist:
            return Response({"error": "Flipper not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as ex:
            return Response({"error": str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    @action(detail=False, methods=["get"])
    def owned(self, request):
        try:
            flipper = Flipper.objects.get(user=request.auth.user)
            owned_decks = Deck.objects.filter(creator=flipper)  # This links to their actual decks

            serializer = DeckSerializer(owned_decks, many=True, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Flipper.DoesNotExist:
            return Response({"error": "Flipper not found."}, status=status.HTTP_404_NOT_FOUND)

        except Exception as ex:
            return Response({"error": str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
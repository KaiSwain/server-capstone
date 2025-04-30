from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from flipquestapi.models import Flipper

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def user_profile(request):
    """Returns the current user's profile information"""
    try:
        # Get the associated Flipper profile
        flipper = Flipper.objects.get(user=request.user)
        
        # Return user and profile data
        return Response({
            'user_id': request.user.id,
            'email': request.user.email,
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
            'username': flipper.name,
            'coins': flipper.coins,
            'created_at': flipper.created_at,
            'flipper_id': flipper.id
        })
    except Flipper.DoesNotExist:
        return Response({'error': 'User profile not found'}, status=404)
    except Exception as ex:
        return Response({'error': str(ex)}, status=500)
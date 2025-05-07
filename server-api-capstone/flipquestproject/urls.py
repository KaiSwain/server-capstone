from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from flipquestapi.views.deck import DeckView
from flipquestapi.views.auth import login_user, register_user
from flipquestapi.views.flipper import user_profile
from flipquestapi.views.likeddeck import LikedDeckView

router = routers.DefaultRouter(trailing_slash=False)
router.register("decks", DeckView, "deck")
router.register("like_deck", LikedDeckView, "like" )


urlpatterns = [
    path('', include(router.urls)),
    path('register', register_user),
    path('login', login_user),
    path('admin/', admin.site.urls),
    path('user/profile/', user_profile)
    
] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


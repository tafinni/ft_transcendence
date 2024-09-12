"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from authentication.views import authentication_views
from authentication.views import friends_views
from authentication.views import profile_views
from authentication.views import match_views
from authentication.views import tournaments_views
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.generic import RedirectView

urlpatterns = [
    path('home/', authentication_views.home, name='home'),
    path('admin/', admin.site.urls),

    path('register/', authentication_views.register_page, name='register'),
    path('login/', authentication_views.login_page, name='login'),
    path('logout/', authentication_views.logout_page, name='logout'),

    path('update_profile/', profile_views.update_profile, name='update_profile'),
    path('profile/', profile_views.profile, name='profile'),
    path('change_password/', profile_views.change_password, name='change_password'),
    path('public_profile/', profile_views.public_profile, name='public_profile'),

    path('match_history/', match_views.match_history, name='match_history'),
    path('public_match_history/', match_views.public_match_history, name='public_match_history'),
    path('add_result/', match_views.add_result, name='add_result'),

    path('add_friend/', friends_views.add_friend, name='add_friend'),
    path('remove_friend/', friends_views.remove_friend, name='remove_friend'),
    path('accept_friend_request/', friends_views.accept_friend_request, name='accept_friend_request'),
    path('decline_friend_request/', friends_views.decline_friend_request, name='decline_friend_request'),

    path('invite_to_tournament/', tournaments_views.invite_to_tournament, name='invite_to_tournament'),
    path('accept_tournament_invitation/', tournaments_views.accept_tournament_invitation, name='accept_tournament_invitation'),
    path('decline_tournament_invitation/', tournaments_views.decline_tournament_invitation, name='decline_tournament_invitation'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += staticfiles_urlpatterns()

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
from authentication.views import *
#from authentication.views import login_page, register_page, home, logout_page, update_profile
#from  authentication.views import match_history
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.generic import RedirectView

urlpatterns = [
    path('home/', home, name='home'),
    path('admin/', admin.site.urls),
#    path('pong_app/', include('pong_app.urls')),
#    path('stats/', include('pong_app.urls')),
    path('', include('pong_app.urls')),
    path('register/', register_page, name='register'),
    path('login/', login_page, name='login'),
    path('logout/', logout_page, name='logout'),
    path('update_profile/', update_profile, name='update_profile'),
    path('profile/', profile, name='profile'),
    path('match_history/', views.match_history, name='match_history'),
    path('change_password/', views.change_password, name='change_password'),
    path('add_friend/', views.add_friend, name='add_friend')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += staticfiles_urlpatterns()

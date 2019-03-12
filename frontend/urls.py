from django.contrib import admin
from django.urls import path

from .views import IndexView


app_name='frontend'


urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('dispatchcall/', IndexView.as_view(), name='dispatchcall'),
    path('scene/', IndexView.as_view(), name='scene'),
]
from django.contrib import admin
from django.urls import path

from .views import IndexView, DispatcherView


app_name='frontend'


urlpatterns = [

    path('dispatchcall/', DispatcherView.as_view(), name='dispatchcall'),
    path('dispatchcall/<int:pk>/scene/', IndexView.as_view(), name='scene'),
]
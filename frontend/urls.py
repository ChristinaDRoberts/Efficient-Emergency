from django.contrib import admin
from django.urls import path

from .views import IndexView, DispatcherView, EMTView


app_name='frontend'


urlpatterns = [

    path('dispatchcall/', DispatcherView.as_view(), name='dispatchcall'),




    path('dispatchcall/<int:dispatch_call_id>/scene/', IndexView.as_view(), name='scene'),

    #this will be the scene the ems or trauma unit will be able to pull up
    # pulls up frontend er view
    path('dispatchcall/<int:dispatch_call_id>/er/', EMTView.as_view(), name='sceneER'),

]
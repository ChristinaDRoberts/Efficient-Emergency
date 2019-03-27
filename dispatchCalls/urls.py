from django.conf.urls import url

from .views import EREMSView
from django.urls import path


urlpatterns = [
    path('dispatchcall/er/<int:dispatch_call_id>/', EREMSView.as_view(), name='sceneER'),
]

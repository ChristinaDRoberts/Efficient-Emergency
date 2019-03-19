from django.urls import path
from api.views import DispatchViewSet, ClientImageViewSet, SendTextView
from django.views.decorators.csrf import csrf_exempt


app_name="api"


urlpatterns = [
 # since we are looking for json data from our api we need to have our message route
 # use the
  path('scene/', ClientImageViewSet.as_view({'get': 'list', 'post': 'create'})),
  path('dispatchcall/<int:dispatch_call_id>/scene/', ClientImageViewSet.as_view({'get': 'list'}), name="urlToSend"),
  path('dispatchcall/', DispatchViewSet.as_view({'get': 'list', 'post': 'create'})),
  path('sendtext/<int:dispatch_call_id>/', csrf_exempt(SendTextView.as_view())),
]


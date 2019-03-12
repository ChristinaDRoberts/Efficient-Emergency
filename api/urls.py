from django.urls import path
from api.views import DispatchViewSet, ClientImageViewSet
#


app_name="api"


urlpatterns = [
 # since we are looking for json data from our api we need to have our message route
 # use the
  path('scene/', ClientImageViewSet.as_view({'get': 'list', 'post': 'create'})),
  path('dispatchcall/', DispatchViewSet.as_view({'get': 'list', 'post': 'create'}))

]

# queryset for scenes with filter for ony scenes matched to the call
# api/calls/10/scene/(get)
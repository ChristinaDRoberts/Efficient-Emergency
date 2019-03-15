# https://www.django-rest-framework.org/tutorial/6-viewsets-and-routers/


from rest_framework import viewsets
from .serializers import ClientSerializer, DispatchSerializer
from dispatchCalls.models import Client, DispatchCall
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework import mixins





class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


class ClientImageViewSet(viewsets.ModelViewSet):
    authentication_classes = (CsrfExemptSessionAuthentication, SessionAuthentication, BasicAuthentication)
    serializer_class = ClientSerializer
    queryset = Client.objects.all()

    #change this query set to get only items for this scene #
    def get_queryset(self):
        return Client.objects.filter(dispatchCall_id = self.kwargs.get("dispatch_call_id") )


    #Authentication is the mechanism of associating an incoming request with a set of identifying credentials,
    # such as the user the request came from



class DispatchViewSet(viewsets.ModelViewSet, mixins.RetrieveModelMixin,):
        authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
        serializer_class = DispatchSerializer

        def retrieve(self, request,  *args, **kwargs):
            pass

        def get_queryset(self):
            return DispatchCall.objects.filter(user=self.request.user)


        def perform_create(self, serializer):
            serializer.save(user=self.request.user)



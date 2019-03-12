from rest_framework import viewsets
from .serializers import ClientSerializer, DispatchSerializer

from dispatchCalls.models import Client, DispatchCall
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


class ClientImageViewSet(viewsets.ModelViewSet):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    serializer_class = ClientSerializer
    queryset = Client.objects.all()

    # def perform_create(self, serializer):
    # serializer.save(user=self.request.user)


class DispatchViewSet(viewsets.ModelViewSet):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    serializer_class = DispatchSerializer
    queryset = DispatchCall.objects.all()


    # 8.4 huber for value capturing
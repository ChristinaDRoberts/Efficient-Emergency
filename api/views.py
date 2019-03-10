from rest_framework import viewsets
from .serializers import ClientSerializer

from frontend.models import Client
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


class ApiViewSet(viewsets.ModelViewSet):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    serializer_class = ClientSerializer
    queryset = Client.objects.all().order_by('-id')[:25]

    # def perform_create(self, serializer):
    # serializer.save(user=self.request.user)

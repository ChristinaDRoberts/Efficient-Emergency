# https://www.django-rest-framework.org/tutorial/6-viewsets-and-routers/


from rest_framework import viewsets
from .serializers import ClientSerializer, DispatchSerializer
from dispatchCalls.models import Client, DispatchCall
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


class ClientImageViewSet(viewsets.ModelViewSet):
    authentication_classes = (CsrfExemptSessionAuthentication, SessionAuthentication, BasicAuthentication)
    serializer_class = ClientSerializer
    queryset = Client.objects.all()

    #The simplest style of permission would be to allow access to any authenticated user, and deny access to any
    # unauthenticated user. This corresponds to the IsAuthenticated
    # permission_classes = (IsAuthenticated)

    # def perform_create(self, serializer):
    # serializer.save(user=self.request.user)



    #Authentication is the mechanism of associating an incoming request with a set of identifying credentials,
    # such as the user the request came from
    def post(self, request):
        content = {

        }
        return Response(content)

    def data(self, request, format=None):
        return Response(data)


class DispatchViewSet(viewsets.ModelViewSet):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    serializer_class = DispatchSerializer
    queryset = DispatchCall.objects.all()


    # 8.4 huber for value capturing
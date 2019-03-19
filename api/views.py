# https://www.django-rest-framework.org/tutorial/6-viewsets-and-routers/
from twilio.rest import Client as TwilioClient
from django.urls import reverse
import requests
import os
from django.http import HttpResponse
from django.views import View
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

    # queryset = Client.objects.all()

    # change this query set to get only items for this scene #
    def get_queryset(self):
        return Client.objects.filter(dispatchCall_id=self.kwargs.get("dispatch_call_id"))

    # Authentication is the mechanism of associating an incoming request with a set of identifying credentials,
    # such as the user the request came from


class DispatchViewSet(viewsets.ModelViewSet, mixins.RetrieveModelMixin, ):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    serializer_class = DispatchSerializer

    def retrieve(self, request, *args, **kwargs):
        pass

    def get_queryset(self):
        return DispatchCall.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SendTextView(View):

    # 1
    def post(self, request, **kwargs):
        # phone_number is key in the dictionary of POST recieved back from http"
        phone_number = request.POST["phone"]
        call_id = self.kwargs.get("dispatch_call_id")
        phone_number = phone_number.replace("-", "")
        print(phone_number)
        print(call_id)

        URL = "https://efficient-emergency.herokuapp.com"

        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = TwilioClient(account_sid, auth_token)

        # I have the call id in my api for each call record,
        # I need to extract the call record id number and concatenate into a link to
        # populate in here. use requests for api.
        # format phone number to +8884446666
        message = client.messages.create(
            body=URL + reverse("frontend:scene", kwargs={"dispatch_call_id": call_id}),
            from_='+18646893583',
            to="=" + phone_number
        )

        print(message.sid)

        return HttpResponse('Sent!')

# 2 twilio api request / requesting twilio, data(link) self.post['phone']
# new url
# use reverse
# link dispatchcall/#/scene

# Download the helper library from https://www.twilio.com/docs/python/install


# 3 send twilio response back


# api endpoint has value catpuring, points to sendTextView

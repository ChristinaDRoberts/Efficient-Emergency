#
# from django.http import HttpResponse
#
#
# def sms_response(request):
#     return HttpResponse("Hello, world.")

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from twilio.twiml.messaging_response import MessagingResponse


@csrf_exempt
def sms_response(request):
    # Start our TwiML response
    resp = MessagingResponse()

    # Add a text message
    msg = resp.message("Check out this sweet owl!")

    # Add a picture message
    msg.media("https://demo.twilio.com/owl.png")

    return HttpResponse(str(resp))
from django.db import models
from phone_field import PhoneField
from django.contrib.auth import get_user_model


User = get_user_model()



class DispatchCall(models.Model):
    # this field captures the dispatcher whop logged in and saves record to call list
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    # external library to input an acutal phone number formatted as twilio requires
    phone = PhoneField(blank=True, help_text='Contact phone number')
    # timestamp on every new call
    date = models.DateField(auto_now=True)


class Client(models.Model):
    #image client upload
    image = models.ImageField(blank=True, upload_to='media/')
    #links it to the call record that dipatch created
    dispatchCall = models.ForeignKey('DispatchCall',  on_delete=models.CASCADE, null=True)

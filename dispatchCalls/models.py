from django.db import models
from phone_field import PhoneField
from django.contrib.auth import get_user_model


User = get_user_model()



class DispatchCall(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    phone = PhoneField(blank=True, help_text='Contact phone number')
    # date = models.DateField(auto_now=False, auto_now_add=False)


class Client(models.Model):
    image = models.ImageField(blank=True, upload_to='media/')
    dispatchCall = models.ForeignKey('DispatchCall',  on_delete=models.CASCADE)

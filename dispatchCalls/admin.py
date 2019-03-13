from django.contrib import admin
from .models import Client, DispatchCall


# Register your models here.
admin.site.register(Client)
admin.site.register(DispatchCall)

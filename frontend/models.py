from django.db import models


class Client(models.Model):
    image = models.FileField(blank=True, upload_to='media/')
    # description = models.CharField(max_length=255, null=True)
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
# from rest_framework import serializers
from frontend.models import Client



class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'
        depth = 1







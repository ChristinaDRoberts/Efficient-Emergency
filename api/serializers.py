from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
# from rest_framework import serializers
from dispatchCalls.models import Client, DispatchCall



class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'






class DispatchSerializer (serializers.ModelSerializer):
    class Meta:
        model = DispatchCall
        fields = '__all__'
        depth = 1

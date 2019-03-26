from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
# from rest_framework import serializers
from dispatchCalls.models import Client, DispatchCall, ER



class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'



class ERSerializer(serializers.ModelSerializer):
    class Meta:
        model = ER
        fields = '__all__'


class DispatchSerializer (serializers.ModelSerializer):
    class Meta:
        model = DispatchCall
        # fields = '__all__'
        fields = ["id", "phone", "date", "user", "scene_images"]
        depth = 1

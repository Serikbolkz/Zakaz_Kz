from rest_framework import serializers
from .models import B2BUser

class B2BUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = B2BUser
        fields = '__all__'
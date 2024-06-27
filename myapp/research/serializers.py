from rest_framework import serializers
from .models import Chercheur, ProjetDeRecherche, Publication
from django.contrib.auth.models import User

class ChercheurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chercheur
        fields = ['id', 'nom', 'specialite']

class ProjetDeRechercheSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjetDeRecherche
        fields = ['id', 'titre', 'description', 'date_debut', 'date_fin_prevue', 'chef_de_projet', 'chercheurs']

class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = ['id', 'titre', 'resume', 'projet_associe', 'date_publication']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
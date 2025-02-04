# research/views.py

from rest_framework import viewsets, generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import render, redirect, get_object_or_404
from .models import Chercheur, ProjetDeRecherche, Publication
from .forms import ChercheurForm, ProjetDeRechercheForm, PublicationForm
from .serializers import ChercheurSerializer, ProjetDeRechercheSerializer, PublicationSerializer, RegisterSerializer
import csv
from django.http import HttpResponse

# Views for admin

def liste_chercheurs(request):
    permission_classes = (IsAuthenticated,)
    chercheurs = Chercheur.objects.all()
    return render(request, 'chercheur/liste.html', {'chercheurs': chercheurs})

def detail_chercheur(request, chercheur_id):
    chercheur = get_object_or_404(Chercheur, pk=chercheur_id)
    return render(request, 'chercheur/detail.html', {'chercheur': chercheur})

def modifier_chercheur(request, chercheur_id):
    chercheur = get_object_or_404(Chercheur, pk=chercheur_id)
    if request.method == 'POST':
        form = ChercheurForm(request.POST, instance=chercheur)
        if form.is_valid():
            form.save()
            return redirect('liste_chercheurs')
    else:
        form = ChercheurForm(instance=chercheur)
    return render(request, 'chercheur/modifier.html', {'form': form, 'chercheur': chercheur})

def supprimer_chercheur(request, chercheur_id):
    chercheur = get_object_or_404(Chercheur, pk=chercheur_id)
    if request.method == 'POST':
        chercheur.delete()
        return redirect('liste_chercheurs')
    return render(request, 'chercheur/supprimer.html', {'chercheur': chercheur})

# Views for API

class ChercheurViewSet(viewsets.ModelViewSet):
    queryset = Chercheur.objects.all()
    serializer_class = ChercheurSerializer
    permission_classes = [IsAuthenticated]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_chercheur_by_id(request, id):
    try:
        chercheur = Chercheur.objects.get(pk=id)
        serializer = ChercheurSerializer(chercheur)
        return Response(serializer.data)
    except Chercheur.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

def export_chercheurs_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="chercheurs.csv"'

    writer = csv.writer(response)
    writer.writerow(['Nom', 'Spécialité'])
    chercheurs = Chercheur.objects.all().values_list('nom', 'specialite')
    for chercheur in chercheurs:
        writer.writerow(chercheur)

    return response

class ProjetDeRechercheViewSet(viewsets.ModelViewSet):
    queryset = ProjetDeRecherche.objects.all()
    serializer_class = ProjetDeRechercheSerializer
    permission_classes = [IsAuthenticated]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_projet_by_id(request, id):
    try:
        projet = ProjetDeRecherche.objects.get(pk=id)
        serializer = ProjetDeRechercheSerializer(projet)
        return Response(serializer.data)
    except ProjetDeRecherche.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

def export_projets_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="projets.csv"'

    writer = csv.writer(response)
    writer.writerow(['Titre', 'Description', 'Date Début', 'Date Fin Prévue', 'Chef de Projet', 'Chercheurs'])

    projets = ProjetDeRecherche.objects.all()
    for projet in projets:
        chercheurs = projet.chercheurs.all()
        chercheurs_noms = ', '.join([chercheur.nom for chercheur in chercheurs])
        writer.writerow([
            projet.titre,
            projet.description,
            projet.date_debut,
            projet.date_fin_prevue,
            projet.chef_de_projet.nom,
            chercheurs_noms
        ])

    return response


class PublicationViewSet(viewsets.ModelViewSet):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer
    permission_classes = [IsAuthenticated]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_publication_by_id(request, id):
    try:
        publication = Publication.objects.get(pk=id)
        serializer = PublicationSerializer(publication)
        return Response(serializer.data)
    except Publication.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


def export_publications_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="publications.csv"'

    writer = csv.writer(response)
    writer.writerow(['Titre', 'Resume', 'Projet associé', 'Date de publication'])

    publications = Publication.objects.all()
    for publication in publications:
        writer.writerow([
            publication.titre,
            publication.resume,
            publication.projet_associe.titre,
            publication.date_publication
        ])

    return response


# Views for authentication in front

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

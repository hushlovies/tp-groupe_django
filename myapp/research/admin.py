# research/admin.py

from django.contrib import admin
from .models import Chercheur, ProjetDeRecherche, Publication

# admin.site.register(Chercheur)
# admin.site.register(ProjetDeRecherche)
# admin.site.register(Publication)


@admin.register(Chercheur)
class ChercheurAdmin(admin.ModelAdmin):
    list_display = ('nom', 'specialite')  # Champs à afficher dans la liste
    search_fields = ('nom', 'specialite')  # Champs à inclure dans la recherche
    list_filter = ('specialite',)  # Filtres latéraux
    ordering = ('nom',)  # Tri par défaut


@admin.register(ProjetDeRecherche)
class ProjetDeRechercheAdmin(admin.ModelAdmin):
    list_display = ('titre', 'date_debut', 'date_fin_prevue', 'chef_de_projet')  # Champs à afficher dans la liste
    list_filter = ('date_debut', 'chef_de_projet')  # Filtres latéraux
    ordering = ('-date_debut',)  # Tri par défaut (par date de début décroissante)
    filter_horizontal = ('chercheurs',)


@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = ('titre', 'projet_associe', 'date_publication')  # Champs à afficher dans la liste
    list_filter = ('date_publication', 'projet_associe')  # Filtres latéraux
    ordering = ('-date_publication',) 
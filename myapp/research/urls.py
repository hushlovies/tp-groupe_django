from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'chercheurs', views.ChercheurViewSet)
router.register(r'projets', views.ProjetDeRechercheViewSet)
router.register(r'publications', views.PublicationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('chercheurs/', views.liste_chercheurs, name='liste_chercheurs'),
    path('export/chercheurs/', views.export_chercheurs_csv, name='export_chercheurs_csv'),
    path('chercheurs/<int:id>/', views.get_chercheur_by_id, name='get_chercheur_by_id'),
 
    path('chercheurs/modifier/<int:chercheur_id>/', views.modifier_chercheur, name='modifier_chercheur'),
    path('chercheurs/supprimer/<int:chercheur_id>/', views.supprimer_chercheur, name='supprimer_chercheur'),
    
    path('projets/', views.ProjetDeRechercheViewSet.as_view({'get': 'list', 'post': 'create'}), name='projets-list'),
    path('export/projets/', views.export_projets_csv, name='export_projets_csv'),
    path('projets/<int:pk>/', views.ProjetDeRechercheViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='projet-detail'),
    path('publications/', views.PublicationViewSet.as_view({'get': 'list', 'post': 'create'}), name='publications-list'),
    path('publications/<int:pk>/', views.PublicationViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='publication-detail'),
]

from django.urls import path
from .views import PatientCreateView, PatientUpdateView

urlpatterns = [
    path('', PatientCreateView.as_view()),         # POST
    path('<int:pk>/', PatientUpdateView.as_view()), # PATCH
]

from django.urls import path
from .views import WordAPIView

urlpatterns = [
    path('', WordAPIView.as_view()),
]

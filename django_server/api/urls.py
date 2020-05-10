from django.urls import path
from .views import WordAPIView
from .views import MyWordAPIView, DetailTodo

urlpatterns = [
    path('<int:pk>/', DetailTodo.as_view()),
    path('word/', WordAPIView.as_view(), name='word'),
    path('myword/', MyWordAPIView.as_view(), name='myword'),
]

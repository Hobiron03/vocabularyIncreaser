from django.urls import path
from .views import WordAPIView
from .views import MyWordAPIView, DetailTodo, AddMyWordAPIView, DeleteMyWordAPIView

urlpatterns = [
    path('<int:pk>/', DetailTodo.as_view()),
    path('word/', WordAPIView.as_view(), name='word'),
    path('fetchmyword/', MyWordAPIView.as_view(), name='myword'),
    path('addmyword/', AddMyWordAPIView.as_view(), name='addmyword'),
    path('deletemyword/', DeleteMyWordAPIView.as_view(), name='deletemyword'),
]

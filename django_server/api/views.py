from django.shortcuts import render
from rest_framework import generics
from word.models import Word
from .serializers import WordSerializer
# Create your views here.


class WordAPIView(generics.ListAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer

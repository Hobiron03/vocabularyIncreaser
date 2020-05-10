from django.shortcuts import render
from rest_framework import generics
from .models import Word
from .serializers import WordSerializer
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponse
from django.core import serializers
import json

# Create your views here.


class DetailTodo(generics.RetrieveAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer


class WordAPIView(generics.ListAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer


class MyWordAPIView(generics.ListAPIView):
    def get(self, request):
        id = request.user.id
        queryset = Word.objects.filter(user_id=id)
        json_serializer = serializers.get_serializer("json")()
        qs_json = json_serializer.serialize(
            queryset, ensure_ascii=False)

        return HttpResponse(qs_json)

    # queryset = Word.objects.filter(user_id=id)
    # serializer_class = WordSerializer

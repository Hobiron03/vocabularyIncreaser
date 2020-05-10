from django.shortcuts import render
from rest_framework import generics
from .models import Word
from .serializers import WordSerializer
from rest_framework.response import Response
from rest_framework import status
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

    def post(self, request):
        new_word = Word.objects.create(
            user_id=request.user.id,
            word=request.POST.get('word'),
            mean=request.POST.get('mean'),
            pronounce=request.POST.get('pronounce'),
            genre=request.POST.get('genre'),
            color=request.POST.get('color'),
        )

        new_word.save()

        return Response(status=status.HTTP_201_CREATED)

from django.shortcuts import render
from rest_framework import generics
from .models import Word
from django.contrib.auth.models import User
from django.contrib.auth import logout
from .serializers import WordSerializer
from rest_framework.permissions import IsAuthenticated
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


class SignUpAPIView(generics.CreateAPIView):
    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')

        if username is None or password is None:
            return Response(status.HTTP_400_BAD_REQUEST)

        try:
            User.objects.get(username=username)
            return Response(status.HTTP_400_BAD_REQUEST)
        except:
            user = User.objects.create_user(username, '', password)
            return Response(status.HTTP_201_CREATED)


class LogoutAPIView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        logout(request)

        return Response(status.HTTP_200_OK)


class MyWordAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user_id = request.user.id
        queryset = Word.objects.filter(user_id=user_id)
        json_serializer = serializers.get_serializer("json")()
        qs_json = json_serializer.serialize(
            queryset, ensure_ascii=False)

        return HttpResponse(qs_json)


class AddMyWordAPIView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

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


class DeleteMyWordAPIView(generics.DestroyAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        word_id = request.POST.get('id')
        Word.objects.filter(pk=word_id).delete()
        return Response(status=status.HTTP_200_OK)


class UpdateMyWordAPIView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        word_id = request.POST.get('id')

        print(word_id)

        if word_id is None:
            return Response(status=status.HTTP_403_FORBIDDEN)

        Word.objects.filter(pk=word_id).update(
            word=request.POST.get('word'),
            mean=request.POST.get('mean'),
            pronounce=request.POST.get('pronounce'),
            genre=request.POST.get('genre'),
            color=request.POST.get('color'),
        )
        return Response(status=status.HTTP_200_OK)

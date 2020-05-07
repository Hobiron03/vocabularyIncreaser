from django.shortcuts import render
from django.views.generic import ListView
from .models import Word

# Create your views here.


class WordListView(ListView):
    model = Word
    template_name = 'word_list.html'

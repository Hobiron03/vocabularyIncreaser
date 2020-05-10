from rest_framework import serializers
from word.models import Word


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ('id', 'user_id', 'word', 'pronounce',
                  'mean', 'genre', 'color',)

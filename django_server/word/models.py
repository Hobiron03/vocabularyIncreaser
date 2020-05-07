from django.db import models

# Create your models here.


class Word(models.Model):
    user_id = models.IntegerField()
    word = models.CharField(max_length=100)
    mean = models.CharField(max_length=100)
    pronounce = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    color = models.CharField(max_length=100)

    def __str__(self):
        return self.word

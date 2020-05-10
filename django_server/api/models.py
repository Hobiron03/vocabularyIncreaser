from django.db import models

# Create your models here.


class Word(models.Model):
    user_id = models.IntegerField()
    word = models.CharField(max_length=100)
    mean = models.CharField(max_length=100, blank=True, null=True)
    pronounce = models.CharField(max_length=100,  blank=True, null=True)
    genre = models.CharField(max_length=100, blank=True, null=True)
    color = models.CharField(max_length=100,  blank=True, null=True)

    def __str__(self):
        return self.word

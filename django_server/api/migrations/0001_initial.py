# Generated by Django 2.2 on 2020-05-10 09:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Word',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField()),
                ('word', models.CharField(max_length=100)),
                ('mean', models.CharField(max_length=100)),
                ('pronounce', models.CharField(max_length=100)),
                ('genre', models.CharField(max_length=100)),
                ('color', models.CharField(max_length=100)),
            ],
        ),
    ]
# Generated by Django 2.1.7 on 2019-03-11 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0002_client_descriptiom'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='client',
            name='descriptiom',
        ),
        migrations.AlterField(
            model_name='client',
            name='image',
            field=models.FileField(blank=True, upload_to=''),
        ),
    ]

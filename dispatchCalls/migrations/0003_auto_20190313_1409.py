# Generated by Django 2.1.7 on 2019-03-13 14:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dispatchCalls', '0002_dispatchcall_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='dispatchCall',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='dispatchCalls.DispatchCall'),
        ),
    ]
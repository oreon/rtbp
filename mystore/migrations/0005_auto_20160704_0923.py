# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-07-04 13:23
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
        ('mystore', '0004_auto_20160526_1654'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='customerType',
            field=models.CharField(blank=True, choices=[('0', 'BRONZE'), ('1', 'SILVER'), ('2', 'GOLD')], max_length=1),
        ),
        migrations.AddField(
            model_name='employee',
            name='appUser',
            field=models.OneToOneField(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, related_name='appUser', to='users.AppUser'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='customer',
            name='firstName',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='customer',
            name='lastName',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='employee',
            name='firstName',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='employee',
            name='lastName',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='product',
            name='name',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterUniqueTogether(
            name='orderitem',
            unique_together=set([('customerOrder', 'product')]),
        ),
    ]
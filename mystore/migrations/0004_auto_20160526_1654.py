# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-26 20:54
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mystore', '0003_product_displaytill'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='orderitem',
            unique_together=set([('product', 'customerOrder')]),
        ),
    ]

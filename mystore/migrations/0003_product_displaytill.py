# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-20 19:16
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('mystore', '0002_customerreview'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='displayTill',
            field=models.DateField(blank=True, default=datetime.datetime(2016, 5, 20, 19, 16, 17, 604857, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
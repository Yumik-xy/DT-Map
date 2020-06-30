from django.db import models

from django.db import models


# Create your models here.
class dt_user(models.Model):
    id = models.PositiveIntegerField(help_text='UID必须唯一！例如：00001234', verbose_name='个人UID', primary_key=True,
                                     unique=True)
    name = models.CharField(max_length=12, verbose_name='姓名')
    phone = models.CharField(max_length=11, verbose_name='手机号')
    time = models.DateTimeField(verbose_name='注册时间')
    openid = models.CharField(max_length=64, verbose_name='微信openid')

    class Meta:
        verbose_name_plural = '注册用户查询'
        verbose_name = '一个用户'
        db_table = 'user'


class dt_notifies(models.Model):
    notify_id = models.PositiveIntegerField(verbose_name='新闻ID', primary_key=True,
                                            unique=True)
    time = models.DateTimeField(verbose_name='发布时间')
    notify_title = models.CharField(max_length=40, verbose_name='标题')
    notify_abstract = models.CharField(max_length=60, verbose_name='摘要')
    notify_content = models.TextField(verbose_name='正文')

    class Meta:
        verbose_name_plural = '新闻ID路径'
        verbose_name = '一条新闻'
        db_table = 'notifies'

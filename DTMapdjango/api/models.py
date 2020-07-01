from django.db import models

from django.db import models

# Create your models here.
from django.utils import timezone


class dt_user(models.Model):
    id = models.PositiveIntegerField(help_text='UID必须唯一！例如：00001234', verbose_name='个人UID', primary_key=True,
                                     unique=True)
    name = models.CharField(max_length=12, verbose_name='姓名')
    phone = models.CharField(max_length=11, verbose_name='手机号')
    time = models.DateTimeField(verbose_name='注册时间')
    openid = models.CharField(max_length=64, verbose_name='微信openid')

    class Meta:
        verbose_name_plural = '注册用户查询'
        verbose_name = '用户'
        db_table = 'user'


class dt_notifies(models.Model):
    notify_id = models.PositiveIntegerField(verbose_name='新闻ID', primary_key=True,
                                            unique=True)
    time = models.DateTimeField(verbose_name='发布时间', default=timezone.now)
    notify_title = models.CharField(max_length=40, verbose_name='标题')
    notify_abstract = models.CharField(max_length=60, verbose_name='摘要')
    notify_content = models.TextField(verbose_name='正文')
    read_num = models.IntegerField(verbose_name='已读数', default=0, help_text='默认请保持0', editable=False)

    class Meta:
        verbose_name_plural = '新闻ID路径'
        verbose_name = '新闻'
        db_table = 'notifies'

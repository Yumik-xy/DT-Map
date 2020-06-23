from django.db import models


from django.db import models


# Create your models here.
class dtmap(models.Model):
    id = models.IntegerField(help_text='UID必须唯一！例如：00001234', verbose_name='个人UID', primary_key=True, unique=True)
    name = models.TextField(max_length=20, verbose_name='姓名')
    phone = models.CharField(max_length=11, verbose_name='手机号')
    time = models.DateTimeField(verbose_name='注册时间', blank=True)

    class Meta:
        verbose_name_plural = '注册用户查询'
        verbose_name = 'ID'
        db_table = 'user'

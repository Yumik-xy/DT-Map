from django.contrib import admin

# Register your models here.

from django.contrib.auth.models import User
from api.models import dtmap


class dtmapAdmin(admin.ModelAdmin):
    search_fields = ('id', 'name', 'phone', 'time')  # 根据属性搜索
    list_display = ('id', 'name', 'phone', 'time')  # 列表显示的属性
    # list_filter = ('id',)  # 筛选
    pass


admin.site.register(dtmap, dtmapAdmin)

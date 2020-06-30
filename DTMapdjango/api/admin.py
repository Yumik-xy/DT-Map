from django.contrib import admin

# Register your models here.

from django.contrib.auth.models import User
from api.models import dt_user, dt_notifies


class dt_userAdmin(admin.ModelAdmin):
    search_fields = ('id', 'name', 'phone', 'time')  # 根据属性搜索
    list_display = ('id', 'name', 'phone', 'time')  # 列表显示的属性
    list_filter = ('id',)  # 筛选
    pass


class dt_notifiesAdmin(admin.ModelAdmin):
    search_fields = ('notify_id', 'notify_title', 'notify_abstract', 'notify_content')  # 根据属性搜索
    list_display = ('notify_id', 'notify_title', 'notify_abstract', 'notify_content')  # 列表显示的属性
    list_filter = ('notify_id', 'notify_title',)  # 筛选
    pass


admin.site.register(dt_user, dt_userAdmin)
admin.site.register(dt_notifies, dt_notifiesAdmin)

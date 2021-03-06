import datetime
import os
import time
import json

from django.http import JsonResponse

from api.method import method
from django.db.models import Max, Min
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core import serializers

from .models import dt_user
from .models import dt_notifies


# Create your views here.


class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get('code')
        PHONE = request.data.get('phone')
        print(request.data, 'login')
        openid = method.GetOpenid(code)
        if openid == "":
            return Response({'status': False, 'message': 'codeid错误'})
        try:
            db = dt_user.objects.get(openid=openid)
        except:
            return Response({'status': False, 'message': '未注册！'})
        if not db.phone == PHONE:
            return Response({'status': False, 'message': '校验不通过'})
        return Response({'status': True, 'uid': str(db.id).zfill(8)})


class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            print(request.data)
            phone = request.data.get('phone')
            name = request.data.get('name')
            encoder = request.data.get('encoder')
            code = request.data.get('code')
            verification_code = request.data.get('verification_code')
            decoder = method.aes_decode(encoder)
            codes = decoder.split('-')
            stamp = float(time.time())
            max_id = dt_user.objects.all().aggregate(Max('id')).get('id__max') + 1
            openid = method.GetOpenid(code)
        except:
            return Response({'status': False, 'message': '未知错误！'})
        if not (phone == codes[2] and stamp - float(codes[0]) <= 90.0 and verification_code == codes[
            1] and openid != ""):
            if stamp - float(codes[0]) > 90.0:
                return Response({'status': False, 'message': '验证码失效！'})
            elif phone != codes[2]:
                return Response({'status': False, 'message': '手机号错误！'})
            elif verification_code != codes[1]:
                return Response({'status': False, 'message': '验证码错误！'})
            elif openid == "":
                return Response({'status': False, 'message': 'codeid错误！'})
            else:
                return Response({'status': False, 'message': '未知错误！'})
        db = dt_user.objects.create(id=max_id, name=name, phone=phone,
                                    time=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), openid=openid)
        db.save()
        return Response({'status': True, 'uid': str(max_id).zfill(8)})


class GetCodeView(APIView):
    # get的方法需求
    # 1.获取手机号
    # 2.对手机号进行校验
    # 3.生成随机验证码
    # 4.发送验证码（有效期60s） [一般情况下购买服务发短信]
    # 5.生成时间戳base64加密
    def get(self, request, *args, **kwargs):
        print(request.query_params)
        # 1.获取手机号
        # 2.1.对手机号进行校验
        ser = method.GetCodeSerializers(data=request.query_params)
        if not ser.is_valid():
            return Response({'status': False, 'message': '手机号格式错误'})
        phone = ser.validated_data.get('phone')
        # 2.2.判断手机号的唯一
        try:
            phonen = dt_user.objects.filter(phone=phone)
        except:
            phonen = None
        if phonen:
            return Response({'status': False, 'message': '手机号存在！'})
        # 3.生成随机验证码
        import random as rd
        random_code = str(rd.randint(100000, 999999))
        print(random_code)
        # 4.发送验证码（有效期60s） [一般情况下购买服务发短信]
        # TODO 完成验证码的发送，考虑到初赛阶段，不发送，后端可见即可！
        # 5.生成时间戳base64加密
        stamp = str(time.time())
        url = '{0}-{1}-{2}'.format(stamp, random_code, phone)
        encoder = method.aes_encode(url)
        # 6.返回加密数据
        return Response({'status': True, 'encoder': encoder})


class ImageView(APIView):
    # 上传图片的方法
    def post(self, request, *args, **kwargs):
        # print(request.data)
        # 1.获取身份证正反面以及摊点证明
        # 2.由于设定问题，导致微信每次只能上传一张图片，所以文件名会从微信端接受保存
        try:
            image = request.FILES['image']
            name = request.data.get('name')
            phone = request.data.get('phone')
            image_path = 'Registration/' + phone + '_' + name + '.jpg'
        except:
            return Response({'status': False, 'message': '缺乏信息！'})
        if not os.path.exists(image_path):
            with open(image_path, 'wb+') as f:
                f.write(image.read())
                f.close()
                return Response({'status': True})
        return Response({'status': False})


class GetNotify(APIView):
    def get(self, request, *args, **kwargs):
        min_id = dt_notifies.objects.all().aggregate(Min('notify_id')).get('notify_id__min')
        Getid = int(request.query_params.get('findid', '-200'))
        readid = int(request.query_params.get('readid', '-200'))
        if Getid != -200:
            if Getid == -1:
                notifies = dt_notifies.objects.order_by('-notify_id').filter().values()[:10]
                json_data = list(notifies)
                return Response({'status': True, 'data': json_data})
            elif Getid <= min_id:
                return Response({'status': False, 'message': '没有更多消息了'})
            else:
                notifies = dt_notifies.objects.order_by('-notify_id').filter(notify_id__lt=Getid).values()[:10]
                print(notifies)
                json_data = list(notifies)
                return Response({'status': True, 'data': json_data})
        elif readid != -200:
            db = dt_notifies.objects.get(notify_id=readid)
            db.read_num += 1
            print(db.read_num)
            db.save()
            return Response({'status': True, 'data': db.read_num})
        else:
            return Response({'status': False, 'message': '参数错误'})

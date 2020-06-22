import time
import base64

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.exceptions import ValidationError


# Create your views here.

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            print(request.data)
            phone = request.data.get('phone')
            encoder = request.data.get('encoder')
            verification_code = request.data.get('verification_code')
            decoder = base64.b64decode(encoder).decode('utf-8')
            codes = decoder.split('-')
            stamp = float(time.time())
        except:
            return Response({'status': False, 'message': '未获取验证码！'})
        else:
            if not (phone == codes[2] and stamp - float(codes[0]) <= 90.0 and verification_code == codes[1]):
                print('false')
                return Response({'status': False, 'message': '验证码错误！'})
            else:
                return Response({'status': True, 'uid': '1123124'})

# 对手机号进行格式校验的部分
def phone_validator(value):
    import re
    if not re.match("^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$", value):
        raise ValidationError('手机号格式错误')


class GetCOdeSerializers(serializers.Serializer):
    phone = serializers.CharField(label='手机号', validators=[phone_validator, ])


class GetCodeView(APIView):
    # get的方法需求
    # 1.获取手机号
    # 2.对手机号进行校验
    # 3.生成随机验证码
    # 4.发送验证码（有效期30s）
    # 5.保留验证码，手机号等待返回校验
    #   conn.set('phonenumber', 'code', ex=30)
    #   conn.get('phonenumber')
    def get(self, request, *args, **kwargs):
        print(request.query_params)
        # 1.获取手机号
        # 2.对手机号进行校验
        ser = GetCOdeSerializers(data=request.query_params)
        if not ser.is_valid():
            return Response({'status': False, 'message': '手机号格式错误'})
        phone = ser.validated_data.get('phone')
        # 3.生成随机验证码
        import random as rd
        random_code = str(rd.randint(1000, 9999))
        print(random_code)
        # 4.发送验证码（有效期60s） [一般情况下购买服务发短信]
        # TODO 完成验证码的发送，考虑到初赛阶段，不发送，后端可见即可！
        # 5.生成时间戳base64加密
        stamp = str(time.time())
        url = '{0}-{1}-{2}'.format(stamp, random_code, phone)
        encoder = base64.b64encode(url.encode("utf-8")).decode('utf-8')
        # 6.返回加密数据
        return Response({'status': True, 'encoder': encoder})

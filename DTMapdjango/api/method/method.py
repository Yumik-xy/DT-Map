import requests
import base64

from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from Crypto.Cipher import AES

APPID = 'wx207fabe088d7faef'
SECRET = '5c0b7392990ef009d4f17340a46f991d'
KEY = 'dtmap321dtmap321dtmap321dtmap321'


# 获取openid的部分
def GetOpenid(coder):
    if not all([coder]):
        return ""
    url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APPID + '&secret=' + SECRET + '&js_code=' + coder + '&grant_type=authorization_code'
    res = requests.get(url=url)
    try:
        openid = res.json()['openid']
    except:
        print(res.json()['errmsg'])
        return ""
    print(openid)
    return openid


# 对手机号进行格式校验的部分
def phone_validator(value):
    import re
    if not re.match("^(1[3-9])\\d{9}$", value):
        raise ValidationError('手机号格式错误')


class GetCodeSerializers(serializers.Serializer):
    phone = serializers.CharField(label='手机号', validators=[phone_validator, ])


# AES解密
def aes_decode(data):
    try:
        aes = AES.new(str.encode(KEY), AES.MODE_ECB)  # 初始化加密器
        decrypted_text = aes.decrypt(base64.decodebytes(bytes(data, encoding='utf8'))).decode("utf8")  # 解密
        decrypted_text = decrypted_text[:-ord(decrypted_text[-1])]  # 去除多余补位
    except:
        pass
    return decrypted_text


# AES加密
def aes_encode(data):
    while len(data) % 16 != 0:  # 补足字符串长度为16的倍数
        data += (16 - len(data) % 16) * chr(16 - len(data) % 16)
    data = str.encode(data)
    aes = AES.new(str.encode(KEY), AES.MODE_ECB)  # 初始化加密器
    return str(base64.encodebytes(aes.encrypt(data)), encoding='utf8').replace('\n', '')  # 加密



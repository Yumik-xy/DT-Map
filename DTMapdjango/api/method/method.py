import requests
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

# 获取openid的部分
def GetOpenid(coder):
    APPID = 'wx207fabe088d7faef'
    SECRET = '5c0b7392990ef009d4f17340a46f991d'
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
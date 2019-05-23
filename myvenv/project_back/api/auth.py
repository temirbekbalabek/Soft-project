from .serializers import UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = (IsAuthenticated,)

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(['POST'])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data.get('user')
    token, created = Token.objects.get_or_create(user=user)
    is_staff = user.is_staff
    # if user.is_staff:
    #     return Response('is staff')
    return Response({'token': token.key, 'is_staff': is_staff, 'id': user.id})


@api_view(['POST'])
def logout(request):
    # print(request.auth)
    request.auth.delete()
    return Response('Successfully deleted')
#
#
# @api_view(['GET'])
# @permission_classes((IsAuthenticated,))
# def this_user(request):
#     print(request.user)
#     serializer = UserProfileSerializer(request.user)
#     return Response(serializer.data)
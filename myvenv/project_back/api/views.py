from .models import Book,Category,Review, Author, Client, Cart
from .serializers import BookSerializer,CategorySerializer,ReviewSerializer, AuthorSerializer, ClientSerializer, CartSerializer, FeedbackSerializer
from rest_framework.decorators import api_view
from rest_framework import filters
from rest_framework import generics
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import UserManager
from django_filters.rest_framework import DjangoFilterBackend



class ClientList(generics.ListCreateAPIView):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()


class ClientDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()


class BookList(generics.ListCreateAPIView):
    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter,
                       filters.OrderingFilter)
    serializer_class = BookSerializer
    queryset = Book.objects.all()
    search_fields = ('title',)
    # permission_classes = (IsAuthenticated,)

class CategoryList(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class ReviewList(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

class ReviewListOfOneBook(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = (IsAuthenticated,)


    def get_queryset(self):
        try:
            book = Book.objects.get(id=self.kwargs.get('pk'))
        except Review.DoesNotExist:
            raise Http404
        queryset = book.books.all()
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AuthorList(generics.ListCreateAPIView):
    serializer_class = AuthorSerializer
    queryset = Author.objects.all()


class CategoryBooks(generics.ListAPIView):
    serializer_class = BookSerializer
    permission_classes = (AllowAny, )

    def get_queryset(self):
        try:
            category = Category.objects.get(id=self.kwargs.get('pk'))
        except Review.DoesNotExist:
            raise Http404
        queryset = category.books.all()
        return queryset


class BookCreate(generics.CreateAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        try:
            category = Category.objects.get(id=self.kwargs.get('pk'))
        except Review.DoesNotExist:
            raise Http404
        queryset = category.books.all()
        return queryset

    def perform_create(self, serializer):
        serializer.save(category=Category.objects.get(id=self.kwargs.get('pk')),
                        author=Author.objects.get(id = self.kwargs.get('pk2')))

class AuthorBooks(generics.ListAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        try:
            author = Author.objects.get(id=self.kwargs.get('pk'))
        except Author.DoesNotExist:
            raise Http404
        queryset = author.books.all()
        return queryset


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class AuthorDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AuthorSerializer
    queryset = Author.objects.all()


class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BookSerializer
    queryset = Book.objects.all()


class Carts(generics.ListCreateAPIView):
    serializer_class = CartSerializer
    queryset = Cart.objects.all()


class CartDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CartSerializer
    queryset = Cart.objects.all()

class FeedbackList(generics.ListCreateAPIView):
    def get_queryset(self):
        try:
            book = Book.objects.get(id=self.kwargs.get('pk'))
        except Book.DoesNotExist:
            raise Http404
        return book.feedback_set.all()

    serializer_class = FeedbackSerializer
    permission_classes = (AllowAny, )
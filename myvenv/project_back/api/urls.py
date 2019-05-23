from django.urls import path
from . import views
from . import auth

urlpatterns = [
    path('carts/<int:pk>/', views.CartDetail.as_view()),
    path('carts/', views.Carts.as_view()),

    path('clients/', views.ClientList.as_view()),
    path('clients/<int:pk>/', views.ClientDetail.as_view()),

    path('books/', views.BookList.as_view()),
    path('books/<int:pk>/reviews/', views.ReviewListOfOneBook.as_view()),
    path('books/<int:pk>/', views.BookDetail.as_view()),

    path('categories/', views.CategoryList.as_view()),
    path('categories/<int:pk>/', views.CategoryDetail.as_view()),
    path('categories/<int:pk>/books/', views.CategoryBooks.as_view()),
    path('categories/<int:pk>/books/<int:pk2>/', views.BookCreate.as_view()),

    path('authors/', views.AuthorList.as_view()),
    path('authors/<int:pk>/', views.AuthorDetail.as_view()),
    path('authors/<int:pk>/books/', views.AuthorBooks.as_view()),

    path('reviews/', views.ReviewList.as_view()),
    path('users/', auth.UserList.as_view()),
    path('users/<int:pk>/', auth.UserDetail.as_view()),

    path('login/', auth.login),
    path('logout/', auth.logout),

    path('books/<int:pk>/feedback/', views.FeedbackList.as_view()),
]

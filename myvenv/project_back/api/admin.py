from django.contrib import admin
from .models import Book, Category, Author, Review, Client, Cart, Feedback


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'category_id', 'author_id', 'quantity', 'price')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'surname', 'date_of_birth', 'date_of_death')


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'text', 'creation_date')


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'client')

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('client', 'date', 'comment', 'book')

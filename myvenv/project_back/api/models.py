from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Author(models.Model):
    name = models.CharField(max_length=200)
    surname = models.CharField(max_length=200)
    date_of_birth = models.CharField(max_length=200)
    date_of_death = models.CharField(max_length=200)

    class Meta:
        verbose_name = 'Author'
        verbose_name_plural = 'Authors'

    def __str__(self):
        return '{} {}'.format(self.name, self.surname)


class Category(models.Model):
    name = models.CharField(max_length=200)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return '{}'.format(self.name)


class Client(models.Model):
    name = models.CharField(max_length=200)
    surname = models.CharField(max_length=200)
    username = models.CharField(max_length=200, default=None, null=True)
    password = models.CharField(max_length=200, default=None, null=True)
    email = models.CharField(max_length=200, default=None, null=True)
    phone = models.CharField(max_length=200, default=None, null=True)
    # coach = models.ForeignKey(Coach, on_delete=models.CASCADE, default=None, null=True)
    image = models.CharField(max_length=400, default='https://cdn1.vectorstock.com/i/1000x1000/82/55/anonymous-user-circle-icon-vector-18958255.jpg', null=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1, related_name='books')
    description = models.TextField()
    year = models.IntegerField()
    page_amount = models.IntegerField()
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')
    image = models.CharField(max_length=400)
    quantity = models.IntegerField(default=50)
    price = models.IntegerField(default=2000)
    user_profile = models.ForeignKey(User, on_delete=models.CASCADE, default=1, related_name='book')

    class Meta:
        verbose_name = 'Book'
        verbose_name_plural = 'Books'

    def __str__(self):
        return '{}'.format(self.title)


class Cart(models.Model):
    client = models.OneToOneField(Client, on_delete=models.CASCADE, default=None, null=True)
    books = models.ManyToManyField(Book, default=None, null=True)

    def __str__(self):
        return '{} {}'.format(self.client.name, self.client.surname)


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='books', default=1)
    text = models.CharField(max_length=600)
    creation_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Review'
        verbose_name_plural = 'Reviews'

class Feedback(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, default=None, null=True)
    date = models.DateTimeField()
    comment = models.TextField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE, default=None, null=True)

    def __str__(self):
        return self.client.name
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Book, Author, Category, Review, Client, Cart, Feedback


class AuthorSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Author
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)

    class Meta:
        model = Category
        fields = ('id', 'name')


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')

    # def create(self,validated_data):
    #     return User.objects.create_user(**validated_data)


class ClientSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    surname = serializers.CharField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    email = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)
    # age = serializers.IntegerField(required=True)
    # status = serializers.CharField(required=True)
    # registered_date = serializers.DateTimeField(required=True)
    image = serializers.CharField()
    # coach_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Client
        fields = ('id', 'name', 'surname', 'username', 'password', 'email', 'phone', 'image')


class CartSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    client = ClientSerializer()

    class Meta:
        model = Cart
        fields = ('id', 'client', 'books')

    def create(self, validated_data):
        """
        Create and return a new `Message` instance, given the validated data.
        """
        client_data = validated_data.pop('client', None)
        if client_data:
            client = Client.objects.get_or_create(**client_data)[0]
            validated_data['client'] = client
        book = Book.objects.get(id=1)
        c = Cart(client=validated_data['client'])
        c.save()
        c.books.add(book)
        return c

    def update(self, instance, validated_data):
        client_data = validated_data.pop('client', None)
        if client_data:
            client = Client.objects.get_or_create(**client_data)[0]
            validated_data['client'] = client
        instance.client = validated_data.get('client', instance.client)
        instance.save()
        instance.books.set(validated_data.get('books', instance.books))
        instance.save()
        return instance


class BookSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    category = CategorySerializer()
    author = AuthorSerializer()
    user_profile = UserSerializer(read_only=True)
    class Meta:
        model = Book
        fields = ('id', 'title', 'category', 'description', 'year',  'author', 'page_amount', 'image',
                  'quantity', 'price', 'user_profile')

    def create(self, validated_data):
        """
        Create and return a new `Message` instance, given the validated data.
        """
        category_data = validated_data.pop('category', None)
        if category_data:
            category = Category.objects.get_or_create(**category_data)[0]
            validated_data['category'] = category
        author_data = validated_data.pop('author', None)
        if author_data:
            author = Author.objects.get_or_create(**author_data)[0]
            validated_data['author'] = author

        return Book.objects.create(**validated_data)


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'

class FeedbackSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    client_id = serializers.IntegerField(required=True)
    date = serializers.DateTimeField(required=True)
    comment = serializers.CharField(required=True)
    book_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = Feedback
        fields = ('id', 'client_id', 'date', 'comment', 'book_id')

    def create(self, validated_data):
        return Feedback.objects.create(**validated_data)
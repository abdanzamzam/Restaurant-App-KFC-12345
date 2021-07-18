# Restaurant App (KFC)

## 1. User

### POST Register User

```
http://localhost:3000/register
```

#### BODY form-data

| Key      | Value                  |
| -------- | ---------------------- |
| name     | Abdan Zam Zam Ramadhan |
| email    | abdan.dev@gmail.com    |
| password | abdan123               |
| role     | admin                  |

```js
// response output

{
    "status": 201,
    "data": {
        "id": 1,
        "name": "Abdan Zam Zam Ramadhan",
        "email": "abdan.dev@gmail.com",
        "role": "admin"
    },
    "message": "User created successfully"
}
```

### POST Login User

```
http://localhost:3000/register
```

#### BODY form-data

| Key      | Value                  |
| -------- | ---------------------- |
| name     | Abdan Zam Zam Ramadhan |
| email    | abdan.dev@gmail.com    |
| password | abdan123               |
| role     | admin                  |

```js
// response output

{
    "status": 200,
    "data": {
        "id": 1,
        "name": "Abdan Zam Zam Ramadhan",
        "email": "abdan.dev@gmail.com"
    },
    "message": "Login successfully"
}
```

## 2. Food

### GET Show All Foods

```
http://localhost:3000/foods
```

```js
// response output

{
    "status": 200,
    "data": [
        {
            "id": 1,
            "name": "Es Cendol Dawet",
            "description": "Ini adalah minuman es cendol dawet",
            "price": 30000,
            "imgUrl": "https://www.image.com/es-cendol.jpg",
            "authorId": 1,
            "categoryId": 2
        },
        {
            "id": 2,
            "name": "Nasi Uduh Mantep Pol",
            "description": "Ini adalah nasi uduk mantep pol",
            "price": 20000,
            "imgUrl": "https://www.image.com/nasi-uduk.jpg",
            "authorId": 1,
            "categoryId": 3
        }
    ],
    "message": "Get data food successfully"
}
```

### GET Show Food by Id

```
http://localhost:3000/foods/1
```

```js
// response output

{
    "status": 200,
    "data": {
        "id": 1,
        "name": "Es Cendol Dawet",
        "description": "Ini adalah minuman es cendol dawet",
        "price": 30000,
        "imgUrl": "https://www.image.com/es-cendol.jpg",
        "authorId": 1,
        "categoryId": 2
        "createdAt": "2021-07-06T01:16:33.869Z",
        "updatedAt": "2021-07-06T01:23:09.394Z"
    },
    "message": "Get data food successfully"
}
```

### POST Create Food

```
http://localhost:3000/foods/create
```

#### BODY form-data

| Key         | Value                            |
| ----------- | -------------------------------- |
| name        | Cendol Rasa Cendol               |
| description | Ini adalah cendol rasa cendol    |
| price       | 30000                            |
| imageUrl    | https://www.image.com/cendol.png |
| authorId    | 1                                |
| categoryId  | 1                                |

```js
// response output

{
    "status": 201,
    "data": {
        "id": 3,
        "name": "Cendol Rasa Cendol ",
        "description": "Ini adalah cendol rasa cendol",
        "price": 30000,
        "imgUrl": "https://www.image.com/cendol.png",
        "authorId": 1,
        "categoryId": 1,
        "updatedAt": "2021-07-06T01:16:33.869Z",
        "createdAt": "2021-07-06T01:16:33.869Z"
    },
    "message": "Created food successfully"
}
```

### PUT Update Food

```
http://localhost:3000/foods/update/3
```

| Key         | Value                              |
| ----------- | ---------------------------------- |
| name        | Cendol Rasa Cendol + Es            |
| description | Ini adalah cendol rasa cendol + es |
| price       | 35000                              |
| imageUrl    | https://www.image.com/cendol.png   |
| authorId    | 1                                  |
| categoryId  | 1                                  |

```js
// response output

{
    "status": 200,
    "data": {
        "id": "3",
        "name": "Cendol Rasa Cendol + Es",
        "description": "Ini adalah drink 23",
        "price": "35000",
        "imgUrl": "https://www.image.com/cendol.png",
        "authorId": "1",
        "categoryId": "1"
    },
    "message": "Updated food successfully"
}
```

### DEL Delete Food

```
http://localhost:3000/foods/delete/3
```

```js
{
    "status": 200,
    "id": "3",
    "message": "Delete food successfully"
}
```

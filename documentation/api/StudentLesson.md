### [Back](./Main.md)

# Student Lesson

## **REQEST LESSON**

Type: `Post`  
Role: `Student`  
Path: `????????????`  
RequestBody:

```
{
    "subject": String,
    "topic": String,
    "details": String,
    "pictures": Array, // of String
    "language": String,
    "tutorAge":
    {
        min: Number,
        max: Number
    },
    "price":
    {
        min: Number,
        max: Number
    }

    ?????????
}
```

ResponseBody:

```
{
    "lessonId": String,

   ????????
}
```

<br>

## **LESSON REQUEST STATUS**

Type: `Get`  
Role: `Student`  
Path: `????????????`  
RequestBody:

```
{
    "lessonId": String,

    ?????????
}
```

ResponseBody:

```
{
    "status": String,
    "lessonId": String

   ????????
}
```

<br>

## **APPROVE LESSON OFFER**

Type: `Post`  
Role: `Student`  
Path: `????????????`  
RequestBody:

```
{
    "answer": Boolean

    ?????????
}
```

ResponseBody:

```
{
    "lessonId": String,

   ????????
}
```

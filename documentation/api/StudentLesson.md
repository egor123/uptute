### [Back](./Main.md)

# Student Lesson

## **INITIALIZE LESSON**

Type: `Post`  
Role: `Student`  
Path: `/lessons/init/{userUUID}`  
RequestBody:

```
{
    "subject": String,
<!--     "topic": String, -->
    "details": String,
<!--     "pictures": Array, // of String
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
    } -->
}
```

ResponseBody:

```
{
    "lessonId": String,
}
```

<br>

## **STOP LESSON**

Type: `Delete`  
Role: `Student`  
Path: `/lessons/{lessonId}`  

<br>

## **GET LESSON LOGS**

Type: `Get`  
Role: `Student`  
Path: `/lessons/{lessonId}`  

ResponseBody:

```
{
    "lessonId": String,
    "logs": Array
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

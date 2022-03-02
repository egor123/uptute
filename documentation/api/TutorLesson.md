### [Back](./Main.md)

# TUTOR LESSON

## **GET LESSONS**

Type: `Get`  
Role: `Tutor`  
Path: `/lessons/open`

ResponseBody:

```
{
    "lessons": Array
}
```
<!-- ResponseBody:

```
{
    "lessons":
    [
        {
            "id": String,
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
        },
        ...
    ],

   ????????
}
``` -->

<br>

## **OFFER A LESSON**

Type: `Post`  
Role: `Tutor`  
Path: `/{lessonId}/offer/{userUUID}`

<br>

## **GET LESSON STATUS**

Type: `Get`  
Role: `Tutor`  
Path: `????????????`  
RequestBody:

```
{
    "lessonId": String

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

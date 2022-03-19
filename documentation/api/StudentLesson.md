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
Path: `/lessons/{lessonId}/{userUUID}`  

<br>

## **GET OFFERS**

Type: `Get`  
Role: `Student`  
Path: `/lessons/{lessonId}/offers`  

ResponseBody:

```
{
    "tutors": Array,
}
```

<br>


## **REJECT LESSON OFFER**

Type: `Post`  
Role: `Student`  
Path: `/lessons/{lessonId}/{tutorUUID}/reject/{userUUID}`  

<br>

## **ACCEPT LESSON OFFER**

Type: `Post`  
Role: `Student`  
Path: `/lessons/{lessonId}/{tutorUUID}/accept/{userUUID}`  

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

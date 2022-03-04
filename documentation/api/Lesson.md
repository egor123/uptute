### [Back](./Main.md)

# ULTIMATE Lesson

## **CREATE LESSON**

Type: `Post`  
Role: `Student`  
Path: `/lessons/create/{userUUID}`  
RequestBody:

```
{
    "subject": String,
    "details": String,
}
```

ResponseBody: CreateLogResponse

<br>

## **CANCEL LOG**

Type: `Post`  
Role: `Student, Tutor` //depends on ctx  
Path: `/lessons/logs/{logId}/close/{userUUID}`  

ResponseBody: CreateLogResponse

<br>

## **CREATE OFFER**

Type: `Post`  
Role: `Tutor`
Path: `/lessons/logs/{logId}/offer/{userUUID}`  

ResponseBody: CreateLogResponse

<br>

## **CREATE OFFER**

Type: `Post`  
Role: `Student`
Path: `/lessons/logs/{logId}/accept/{userUUID}`  

ResponseBody: CreateLogResponse

<br>

## **INITIATE CONFERENCE**

Type: `Post`  
Role: `Tutor`
Path: `/lessons/logs/{logId}/init/{userUUID}`  

ResponseBody: CreateLogResponse

<br>

## **CHECK FOR OFFERS**

Type: `Get`  
Role: `Student`
Path: `/lessons/logs/{logId}/offer/{userUUID}`  

ResponseBody: OserveLogResponse

<br>

## **CHECK FOR ACCEPTED**

Type: `Get`  
Role: `Tutor`
Path: `/lessons/logs/{logId}/accepted/{userUUID}`  

ResponseBody: OserveLogResponse

<br>

## **GET OPEN LESSONS**

Type: `Get`  
Role: `Tutor`
Path: `/lessons/open/{userUUID}`  

ResponseBody: 

```
{
    "lessons": Array
}
```

Lesson:

```
{
    "lessonId": Long,
    "logId": Long,
    "details": String
}
```

<br>

## **GET OPEN LESSONS**

Type: `Get`  
Role: `Moderator`
Path: `/lessons/{lessonId}/{userUUID}`  

Lesson:

```
{
    "lessonId": Long,
    "logs": Array //array of LessonLog
}
```

<br>

## **--------------**

CreateLogResponse:

```
{
    "lessonId": Long,
    "logId": Long
}
```

OserveLogResponse:

```
{
    "lessonId": Long,
    "logId": Long
    "childLogs": Array //array of LessonLog
}
```

LessonLog:

```
{
    "id": Long,
    "type": String,
    "createdAt": String, //???Object???
    "createdBy": String,
    "details": String //required conversion to object
}
```
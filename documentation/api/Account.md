### [Back](./Main.md)

# Account

## **UPGRADE TO STUDENT**

Type: `POST`  
Path: `/account/me/student`

RequestBody:

```
{
    "firstName": String,
    "lastName": String,
    "grade": Number,
    "birthday": String,
}
```

ResponseBody:

```
{
    "jwt": String,
    "tokenType": "Bearer",
    "refrershToken": String,
    "UUID": String,
    "roles": Array
}
```

## **UPGRADE TO TUTOR**

Type: `POST`  
Path: `/account/me/tutor`

RequestBody:

```
{
    "conferenceLink": String,
}
```

ResponseBody:

```
{
    "jwt": String,
    "tokenType": "Bearer",
    "refrershToken": String,
    "UUID": String,
    "roles": Array
}
```

## **GET USER DETAILS**

Type: `Get`  
Path: `/account/me`

ResponseBody:

```
{
    "firstName": String,
    "lastName": String,
    "email": String,
    "grade": Number,
    "birthday": String,
    "conferenceLink": String,
}
```

## **GET STUDENT DETAILS**

Type: `Get`  
Path: `/account/{UUID}/student`

ResponseBody:

```
{
    "firstName": String,
    "lastName": String,
    "grade": Number,
    "birthday": String,
}
```

## **GET TUTOR DETAILS**

Type: `Get`  
Path: `/account/{UUID}/tutor`

ResponseBody:

```
{
    "firstName": String,
    "lastName": String,
    "birthday": String,
}
```

## **UPDATE USER DETAILS**

Type: `Patch`  
Path: `/account/me`  
RequestBody:

```
{
    "firstName": String,
    "lastName": String,
    "email": String,
    "birthday": String,
}
```

ResponseBody:

```
{
    "firstName": String,
    "lastName": String,
    "email": String,
    "birthday": String,
}
```

## **UPDATE STUDENT DETAILS**

Type: `Patch`  
Path: `/account/me/student`  
RequestBody:

```
{
    "grade": Number,
}
```

ResponseBody:

```
{
    "grade": Number,
}
```

## **UPDATE STUDENT DETAILS**

Type: `Patch`  
Path: `/account/me/student`  
RequestBody:

```
{
    "conferenceLink": String,
}
```

ResponseBody:

```
{
    "conferenceLink": String,
}
```

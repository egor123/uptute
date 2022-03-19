### [Back](./Main.md)

# Tutor

## **UPGRADE TO TUTOR**

Type: `Post`  
Role: `Student`  
Path: `account/{UUID}/tutor`  
RequestBody:

```
{
    "motto": String,
    "description": String,
    "zoomLink": String,
    "subjects": Array, // of String
    "gradesYouTeach":
    {
        min: Number,
        max: Number
    },
    "languages": Array // of String
}
```

> Needs to be a student

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

<br>

## **GET TUTOR INFO**

Type: `Get`  
Path: `/account/{UUID}/tutor`  
ResponseBody:

```
{
    "motto": String,
    "description": String,
    "zoomLink": String,
    "subjects": Array, // of String
    "gradesYouTeach":
    {
        min: Number,
        max: Number
    },
    "languages": Array // of String,



}
```

TO ALLOCATE

    "pricePerHour": Number,
    "rating": Number,
    "hoursTaught": Number,
    "comments": Array, // of String

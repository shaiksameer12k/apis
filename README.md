<!--! School Management Apis -->

<!-- ? Get Token (method:POST)-->

<!-- https://apis-re1c.onrender.com/api/getToken -->

<!-- parameters to send (body) -->
<!--
 {
  "username": "shaiksameer12k@gmail.com",
  "password": "sameer@67"
 }
-->

<!--? Get Teachers Data Api (method:GET) -->

<!-- https://apis-re1c.onrender.com/api/getTeachersData -->

<!-- to search particular Teacher  -->

<!--! Note:if you see any thing in double arrows << some thing should come dynamic >> -->

<!--   https://apis-re1c.onrender.com/api/getTeachersData/<<teacherID>>    -->

<!--? post new Teachers Data Api (method:POST)-->

<!--   https://apis-re1c.onrender.com/api/getTeachersData   -->

<!-- parameters to send (body) -->
<!--
 [
    {
        "teacherName": "string",
        "mobileNumber": "string",
        "gender": "string",
        "classTeacher": "string"
     }
]
 -->

<!--? update Teachers Data Api (method:PUT)-->

<!--   https://apis-re1c.onrender.com/api/getTeachersData   -->

<!-- parameters to send (body) -->
<!--
 [
    {
        "teacherName": "string",
        "mobileNumber": "string",
        "teacherId": "number",
        "gender": "string",
        "classTeacher": "string"
     }
]
 -->

<!--? Delete Teachers Data Api (method:DELETE)-->

<!--! Note if you see any thing in double arrows << some thing should come dynamic >> -->

 <!--    https://apis-re1c.onrender.com/api/getTeachersData?teacherId= <<Send TeacherId of Teacher>>       -->

<!--? Admin Sign  Api (method:POST)-->

<!--   https://apis-re1c.onrender.com/api/signInApi   -->

<!-- parameters to send (body) -->
<!--
 [
    {
       "firstName": "String",
  "lastName": "String",
  "dateOfBirth": "String",
  "mobileNumber": "String",
  "email": "String",
  "gender": "String",
  "userName": "String",
  "nationality": "String"
     }
]
 -->

<!--? get admin data Api (method:GET)-->

<!--   https://apis-re1c.onrender.com/api/adminData   -->

<!--? Admin Login  Api (method:POST)-->

<!--   https://apis-re1c.onrender.com/api/loginApi   -->

<!-- parameters to send (body) -->
<!--
 {
  "userName": "shaiksameer",
  "password":"sameer@123"
}
 -->

<!-- ? Change Password Api (method:POST) -->

 <!-- https://apis-re1c.onrender.com/api/api/changePswApi    -->
<!--
 {
   "EmpId": Number,
  "oldPassword": "String",
  "newPassword":"String"
}
 -->

<!-- ? forget Password Api (method:POST) -->

 <!-- https://apis-re1c.onrender.com/api/api/forgetPswApi    -->
<!--
{
  "userName": "String"
}
 -->

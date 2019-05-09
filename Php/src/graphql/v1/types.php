<?php
//import grapql modules
require_once __DIR__ .'\..\..\..\vendor\autoload.php';

//import modules
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\InputObjectType;

//model type for users
$userType = new ObjectType([
    'name' => 'User',
    'fields' => [
        'id' => Type::int(),
        'firstname' => Type::string(),
        'lastname' => Type::string(),
        'password' => Type::string()
    ]
]);

//model type for users as input of query
$inputUserType = new InputObjectType([
    'name' => 'InputUser',
    'fields' => [
        'id' => Type::int(),
        'firstname' => Type::string(),
        'lastname' => Type::string(),
        'password' => Type::string()
    ]
]);

//model type for responses
$responseType = new ObjectType([
    'name' => 'Response',
    'fields' => [
        'status' => Type::int(),
        'info' => Type::string()
    ]
]);
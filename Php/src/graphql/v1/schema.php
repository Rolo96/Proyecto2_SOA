<?php
//import grapql modules
require_once __DIR__ .'\..\..\..\vendor\autoload.php';

//import modules
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Server\StandardServer;

//import graphql types
include __DIR__ . '\types.php';

try {
    //schema for queries
    $queryType = new ObjectType([
        'name' => 'Query',
        'fields' => [
            'User' => [
                'type' => $userType,
                'args' => [
                    'id' => ['type' => Type::int()]
                ],
                'resolve' => function($parent, $args){
					$db_connection = pg_connect("host=isilo.db.elephantsql.com dbname=ztetdqoh user=ztetdqoh 
					password=CNmtyv-H9nQXTjlaEXD7knm97CaOr1sc");
                    $id = $args['id'];
                    $result = pg_query($db_connection, 
                    "select * from USERS 
                    where id =".$id);
                    $row = pg_fetch_all($result);
                    $jeison = json_encode($row[0], JSON_NUMERIC_CHECK);
                    return json_decode($jeison);
                }
            ],
            'Users' => [
                'type' => Type::listOf($userType),
                'resolve' => function(){
					$db_connection = pg_connect("host=isilo.db.elephantsql.com dbname=ztetdqoh user=ztetdqoh 
					password=CNmtyv-H9nQXTjlaEXD7knm97CaOr1sc");
					$result = pg_query($db_connection, 
                    "select * from users");
					$row = pg_fetch_all($result);
					$jeison = json_encode($row, JSON_NUMERIC_CHECK);
					if($jeison == "false")
						return json_decode("[]");
					return json_decode($jeison);
                }
            ]
        ],
	]);

	//schema for mutations
    $mutationType = new ObjectType([
        'name' => 'Mutation',
        'fields' => [
            'CreateUser' => [
                'type' => $responseType,
                'args' => [
                    'user' => ['type' => $inputUserType]
                ],
                'resolve' => function($parent, $args){
					$db_connection = pg_connect("host=isilo.db.elephantsql.com dbname=ztetdqoh user=ztetdqoh 
					password=CNmtyv-H9nQXTjlaEXD7knm97CaOr1sc");
                    $user = $args['user'];
                    $values = $user['id'].",'".$user['firstname']."','".$user['lastname'].
                    "','".base64_encode($user['password'])."'";
                    pg_send_query($db_connection, 
                    "insert into users(id, firstname, lastname, password) 
                    values (".$values.")");
                    $result = pg_result_error(pg_get_result($db_connection));
                    if($result == ""){
                        return json_decode("{\"status\":0, \"info\":\"created\"}");
                    }
                    return json_decode("{\"status\":-1, \"info\":\"error\"}");
                }
            ],
            'UpdateUser' => [
                'type' => $responseType,
                'args' => [
                    'user' => ['type' => $inputUserType]
                ],
                'resolve' => function($parent, $args){
					$db_connection = pg_connect("host=isilo.db.elephantsql.com dbname=ztetdqoh user=ztetdqoh 
					password=CNmtyv-H9nQXTjlaEXD7knm97CaOr1sc");
                    $user = $args['user'];
                    pg_send_query($db_connection, 
                    "update users
					set firstname = '".$user['firstname']."', lastname = '".$user['lastname'].
					"', password = '".base64_encode($user['password'])."'
                    where id = ".$user['id']);
                    $result = pg_result_error(pg_get_result($db_connection));
                    if($result == ""){
                        return json_decode("{\"status\":0, \"info\":\"updated\"}");
                    }                        
                    return json_decode("{\"status\":-1, \"info\":\"error\"}");
                }
            ],
            'DeleteUser' => [
                'type' => $responseType,
                'args' => [
                    'id' => ['type' => Type::int()]
                ],
                'resolve' => function($parent, $args){
					$db_connection = pg_connect("host=isilo.db.elephantsql.com dbname=ztetdqoh user=ztetdqoh 
					password=CNmtyv-H9nQXTjlaEXD7knm97CaOr1sc");
                    $id = $args['id'];
                    pg_send_query($db_connection, 
                    "delete from users
                    where id = ".$id);
                    $result = pg_result_error(pg_get_result($db_connection));
                    if($result == ""){
                        return json_decode("{\"status\":0, \"info\":\"deleted\"}");
                    }                
                    return json_decode("{\"info\":\"error\"}");
                }
            ]
        ],
		]);
	
	//schema creation
    $schema = new Schema([
        'query' => $queryType,
        'mutation' => $mutationType,
    ]);

	//server creation
    $server = new StandardServer([
        'schema' => $schema
    ]);

    $server->handleRequest();
} catch(\Exception $e) {
    StandardServer::send500Error($e);
}

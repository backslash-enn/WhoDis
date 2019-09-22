<?php

//Delete sessions and redirects to login screen
session_start();

$inData = getRequestInfo();

$user_id = $_SESSION["user_id"];
returnWithError($user_id, "Successfully logged out.");
unset($_SESSION["user_id"]);
session_destroy();
//header('Location: https://managerofcontacts.live');


function getRequestInfo()
{
	return json_decode(file_get_contents('php://input'), true);
}

function sendAsJSON($obj)
{
	header('Content-type: application/json');
	echo $obj;
}

function returnWithError($user_id, $err)
{
	$retValue = '{"id":"' . $user_id . '", "username":"", "error":"' . $err . '"}';
	sendAsJson( $retValue );
}

?>
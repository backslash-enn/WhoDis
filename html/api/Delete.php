<?php

session_start();

$inData = getRequestInfo();

//Database parameters
$db_user = "localhost";
$db_username = "frontend";
$db_pw = "simpleyetEffective2019!";
$db_name = "user";

//Contact's parameters
$contactID = $inData["contact_id"];
$user_id;

//Connect to the database
$conn = new mysqli($db_user, $db_username, $db_pw, $db_name);
if ($conn->connect_error)
{
	returnWithError($conn->connect_error);
}
else
{
	//Checking for valid sessions
	if (!isset($_SESSION["user_id"]))
	{
		returnWithError("User not logged in.");
		return;
	}
	else
	{
		$user_id = $_SESSION["user_id"];
	}

	//First check that the contact actually exists in the user's list
	$sql = "SELECT name FROM `contacts` where contact_id = '" . $contactID . "' AND user_id = '" . $user_id . "'";
	$result = $conn->query($sql);
	if ($result->num_rows <= 0)
	{
		returnWithError("Contact does not exist.");
	}
	else
	{
		//Delete the contact based on the contact id given
		$sql = "DELETE FROM `contacts` where contact_id = '" . $contactID . "' AND user_id = '" . $user_id . "'";
		if($conn->query($sql) === FALSE)
		{
			returnWithError("Error deleting contact.");
		}
	}

	$conn->close();
}

function getRequestInfo()
{
	return json_decode(file_get_contents('php://input'), true);
}

function sendAsJSON($obj)
{
	header('Content-type: application/json');
	echo $obj;
}

function returnWithError($err)
{
	$retValue = '{"id":0,"username":"","error":"' . $err . '"}';
	sendAsJson( $retValue );
}

function returnWithInfo($username, $id)
{
	$retValue = '{"id":' . $id . ',"username":"' . $username . '","error":""}';
	sendAsJson( $retValue );
}

?>
<?php

session_start();

$inData = getRequestInfo();

//Database parameters
$db_user = "localhost";
$db_username = "frontend";
$db_pw = "simpleyetEffective2019!";
$db_name = "user";

//Contact's parameters
$favorite = $inData["favorite"];
$contact_id = $inData["contact_id"];

//Connect to the database
$conn = new mysqli($db_user, $db_username, $db_pw, $db_name);
if ($conn->connect_error)
{
	returnWithError($conn->connect_error);
}
else
{
	//Checking for valid session
	if (!isset($_SESSION["user_id"]))
	{
		returnWithError("User not logged in.");
		return;	
	}
	else
	{
		$user_id = $_SESSION["user_id"];
	}
		
	//Update according to the parameters given
	//Checks for possible SQL injections and prevents it
	$sql = $conn->prepare("UPDATE `contacts` SET favorite = ? WHERE contact_id = ?");
	$sql->bind_param('ii', $favorite, $contact_id);

	if (empty($contact_id) || $sql->execute() == FALSE)
	{
		returnWithError("Unable to edit contact.");
	}
	else
	{
		returnWithInfo($favorite, "Successfully edited contact.");
	}

	$sql->free_result();
	$sql->close();
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
	$retValue = '{"error":"' . $err . '"}';
	sendAsJson( $retValue );
}

function returnWithInfo($favorite, $err)
	{
		$retValue = '{"favorite":"' . $favorite . '",
					  "error":"' . $err . '"}';
	sendAsJSON($retValue);
}

?>
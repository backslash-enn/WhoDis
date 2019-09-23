<?php

session_start();

$inData = getRequestInfo();

//Database parameters
$db_user = "localhost";
$db_username = "frontend";
$db_pw = "simpleyetEffective2019!";	
$db_name = "user";

//Contact's parameters
$contact_id = $inData["contact_id"];
$user_id = -1;

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
	//Checks for possible SQL injections and prevents it
	$sql = $conn->prepare("SELECT name FROM `contacts` where contact_id = ? AND user_id = ?");
	$sql->bind_param('ii', $contact_id, $user_id);
	$sql->execute();

	$result = $sql->get_result();
	if ($result->num_rows <= 0)
	{
		returnWithError("Contact does not exist.");
	}
	else
	{
		$sql->free_result();
		$sql->close();

		//Delete the contact based on the contact id given
		//Checks for possible SQL injections and prevents it
		$sql = $conn->prepare("DELETE FROM `contacts` where contact_id = ? AND user_id = ?");
		$sql->bind_param('ii', $contact_id, $user_id);
		if($sql->execute() === FALSE)
		{
			returnWithError("Unable to delete contact.");
		}
		else
		{
			returnWithError("Successfully deleted contact.");
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
	$retValue = '{"error":"' . $err . '"}';
	sendAsJson( $retValue );
}

?>
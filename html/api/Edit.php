<?php

session_start();

$inData = getRequestInfo();

//Database parameters
$db_user = "localhost";
$db_username = "frontend";
$db_pw = "simpleyetEffective2019!";
$db_name = "user";

//Contact's parameters
$name = $inData["name"];
$phoneNumber = $inData["phone_number"];
$email = $inData["email"];
$favColor = $inData["fav_color"];
$notes = $inData["notes"];
$primStrAddr = $inData["primary_street_addr"];
$birthday = $inData["birthday"];
$favorite = $inData["favorite"];
$contact_id = $inData["contact_id"];
$pp_index = $inData["pp_index"];

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
	$sql = $conn->prepare("UPDATE `contacts` SET name = ?, phone_number = ?, email = ?, fav_color= ?, notes = ?,
												 primary_street_addr = ?, birthday = ?, pp_index = ?, favorite = ?
											 WHERE contact_id = ?");
	$sql->bind_param('sssssssiii', $name, $phoneNumber, $email, $favColor, $notes, $primStrAddr, $birthday, $pp_index, $favColor, $contact_id);

	if (empty($contact_id) || $sql->execute() == FALSE)
	{
		returnWithError("Unable to edit contact.");
	}
	else
	{
		returnWithInfo($name, $phoneNumber, $email, $favColor, $notes, $primStrAddr, $birthday, $pp_index, $favorite, "Successfully edited contact.");
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

function returnWithInfo($name, $favColor, $notes, $primStrAddr, $phoneNumber, $birthday, $pp_index, $favorite, $err)
	{
		$retValue = '{"name":"' . $name . '",
					"fav_color":"' . $favColor . '",
					"notes":"' . $notes . '",
					"primary_street_addr":"' . $primStrAddr . '",
					"phone_number":"' . $phoneNumber . '",
					"birthday":"' . $birthday . '",
					"pp_index":"' . $pp_index . '",
					"favorite":"' . $favorite . '",
					"error":"' . $err . '"}';
	sendAsJSON($retValue);
}

?>
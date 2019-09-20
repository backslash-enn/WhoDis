<?php
session_start();

$inData = getRequestInfo();

//Database parameters
$db_user = "localhost";
$db_username = "frontend";
$db_pw = "simpleyetEffective2019!";	
$db_name = "user";

//Contact's parameters
$firstName = $inData["first_name"];
$lastName = $inData["last_name"];
$favColor = $inData["fav_color"];
$notes = $inData["notes"];
$primStrAddr = $inData["primary_street_addr"];
$sndStrAddr = $inData["second_street_addr"];
$city = $inData["city"];
$state = $inData["state"];
$country = $inData["country"];
$zip = $inData["zip"];
$phoneNumber = $inData["phone_number"];
$birthday = $inData["birthday"];
$favorite = $inData["favorite"];
$user_id = -1;

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
	}
	else
	{
		$user_id = $_SESSION["user_id"];
	}

	//Create the contact with given information
	$sql = "INSERT INTO `contacts` (first_name, last_name, fav_color, notes, primary_street_addr, second_street_addr, city, state, country, zip, phone_number, birthday, favorite, user_id) 
			VALUES ('" . $firstName . "', '" . $lastName . "', '" . $favColor . "', '" . $notes . "', '" . $primStrAddr . "', '" . $sndStrAddr . "', '" . $city . "', '" . $state . "',
					'" . $country . "', $zip, $phoneNumber, $birthday, $favorite, $user_id)";

	if ($conn->query($sql) === FALSE)
	{
		returnWithError("Unable to create contact.");
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
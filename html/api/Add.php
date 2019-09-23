<?php

$inData = getRequestInfo();

//Database parameters
$db_user = "localhost";
$db_username = "frontend";
$db_pw = "simpleyetEffective2019!";
$db_name = "user";

//User parameters
$name = $inData["name"];
$username = $inData["username"];
$password = $inData["password"];

//Conect to the database
$conn = new mysqli($db_user, $db_username, $db_pw, $db_name);
if ($conn->connect_error)
{
	returnWithError($conn->connect_error);
}
else
{
	//Checks the database to make sure the username isn't taken already
	$sql = "SELECT user_id FROM `login` where username = '" . $username . "'";
	$result = $conn->query($sql);
	if ($result->num_rows > 0)
	{
		returnWithError("Username already in use.");
        return;
	}
	else
	{
		//Insert the user's information into the database
		//Hash the password for better security
		$password = hash('sha256', $password);
		$sql = "INSERT INTO `login` (name, username, password) VALUES ('" . $name . "', '" . $username . "', '" . $password . "')";
		
		if($conn->query($sql) == FALSE)
		{
			returnWithError("Unable to add user.");
		}
		else
		{
			returnWithError("User successfully added.");
		}
	}

	$conn->close();
    return;
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

function returnWithError( $err )
{
	$retValue = '{"id":0,"username":"","error":"' . $err . '"}';
	sendAsJson( $retValue );
}

function returnWithInfo( $username, $id )
{
	$retValue = '{"id":' . $id . ',"username":"' . $username . '","error":""}';
	sendAsJson( $retValue );
}

?>
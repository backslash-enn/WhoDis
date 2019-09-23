<?php

session_start();

$inData = getRequestInfo();

//Database parameters
$db_user = "localhost";
$db_username = "frontend";
$db_pw = "simpleyetEffective2019!";
$db_name = "user";

//User parameters
$username = $inData["username"];
$password = $inData["password"];
$name = "error name";
$user_id = -1;

//Connect to the database
$conn = new mysqli($db_user, $db_username, $db_pw, $db_name);
if ($conn->connect_error)
{
	returnWithError($conn->connect_error);
}
else
{
	//Check the user's username and password in the database
	$password = hash('sha256', $password);
	$sql = "SELECT user_id, name FROM `login` where username = '" . $username . "' AND password = '" . $password . "'";
	$result = $conn->query($sql);
	if ($result->num_rows > 0)
	{
		$row = $result->fetch_assoc();
		//Create new session based on the user's id and name
		$user_id = $row["user_id"];
		$name = $row["name"];
		$_SESSION["user_id"] = $user_id;
		$_SESSION["name"] = $name;
        if(isset($_SESSION["user_id"])){
            returnWithError($user_id, $name, "Success");
        }
        else{
            returnWithError($user_id, $name, "Failure");
        }
	}
	else
	{
		returnWithError($user_id, $name, "No records found");
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

function returnWithError($user_id, $name, $err)
{
	$retValue = '{"user_id":"' . $user_id . '", "name":"' . $name . '", "error":"' . $err . '"}';
	sendAsJson( $retValue );
}

?>
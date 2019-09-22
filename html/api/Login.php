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
//$user_id = -1;
//$username = "kart";
//$password = "hahah";

//Connect to the database
$conn = new mysqli($db_user, $db_username, $db_pw, $db_name);
if ($conn->connect_error)
{
	returnWithError($conn->connect_error);
}
else
{
	//Check the user's username and password in the database
	$sql = "SELECT user_id FROM `login` where username = '" . $username . "' AND password = '" . $password . "'";
	$result = $conn->query($sql);
	if ($result->num_rows > 0)
	{
		$row = $result->fetch_assoc();
		//Create new session based on the user's id
		$user_id = $row["user_id"];
		$_SESSION["user_id"] = $user_id;
//		returnWithInfo($username, $user_id);
        if(isset($_SESSION["user_id"])){
            returnWithError("Success");
        }
        else{
            returnWithError("Failure");
        }
	}
	else
	{
		returnWithError("No records found");
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

function returnWithInfo($username, $user_id)
{
	$retValue = '{"id":' . $user_id . ',"username":"' . $username . '","error":""}';
	sendAsJson( $retValue );
}

?>
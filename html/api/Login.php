<?php
	session_start();

	$inData = getRequestInfo();
	
	$db_user = "localhost";
	$db_username = "frontend";
	$db_pw = "simpleyetEffective2019!";
	$db_name = "user";
	
	$id = 0;
	$username = $inData["username"];
	$password = $inData["password"];
	
	$conn = new mysqli($db_user, $db_username, $db_pw, $db_name);
	if ($conn->connect_error)
	{
		returnWithError($conn->connect_error);
	}
	else
	{
		$sql = "SELECT user_id FROM login where username = '" . $username . "' AND password = '" . $password . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$id = $row["user_id"];

			$_SESSION["user_id"] = $id;
			returnWithInfo( $username, $id );
		}
		else
		{
			returnWithError( "No Records Found" );
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
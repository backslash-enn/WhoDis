<?php

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
		$sql = "SELECT user_id FROM login where username = '" . $username . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			returnWithError("Username already in use.");
		}
		else
		{
			$sql = "INSERT INTO login (username, password) VALUES ('" . $username . "','" . $password . "')";
			$result = $conn->query($sql);

			if($conn->query($sql) === TRUE)
			{
				returnWithInfo($username, 0);
			}
			else
			{
				returnWithError($conn->connect_error);
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
<?php

	$inData = getRequestInfo();
	
	$db_user = "localhost";
	$db_username = "frontend";
	$db_pw = "simpleyetEffective2019!";
	$db_name = "user";
	
	$contactID = $inData["contact_id"];
	$userID = $inData["user_id"];
	
	$conn = new mysqli($db_user, $db_username, $db_pw, $db_name);
	if ($conn->connect_error)
	{
		returnWithError($conn->connect_error);
	}
	else
	{
		$sql = "SELECT name FROM contacts where contact_id = '" . $contactID . "' AND user_id = '" . $userID . "'";
		$result = $conn->query($sql);
		if ($result->num_rows <= 0)
		{
			returnWithError("Contact does not exist.");
        }
        else
        {
            $sql = "DELETE FROM contacts where contact_id = '" . $contactID . "' AND user_id = '" . $userID . "'";
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
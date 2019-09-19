<?php

	$inData = getRequestInfo();
	
	$db_user = "localhost";
	$db_username = "frontend";
	$db_pw = "simpleyetEffective2019!";
	$db_name = "user";

	$firstName = $inData["first_name"];
	$lastName = $inData["last_name"];
	$nickName = $inData["nick_name"];
	$favColor = $inData["fav_color"];
	$bio = $inData["bio"];
	$primStrAddr = $inData["primary_street_addr"];
	$sndStrAddr = $inData["second_street_addr"];
	$city = $inData["city"];
	$state = $inData["state"];
	$country = $inData["country"];
	$zip = $inData["zip"];
	$creationDate = SELECT CAST(getdate() AS date);
	$favorite = 0;
	
	$conn = new mysqli($db_user, $db_username, $db_pw, $db_name);
	if ($conn->connect_error)
	{
		returnWithError($conn->connect_error);
	}
	else
	{
		$sql = "INSERT INTO contacts (first_name, last_name, nick_name, fav_color, bio, primary_street_addr, second_street_addr, city, state, country, zip, creation_date, favorite) 
				VALUES ('" . $firstName . "' , '" . $lastName . "' , '" . $nickName . "' , '" . $favColor . "' , '" . $bio . "' , '" . $primStrAddr . "' , '" . $sndStrAddr . "' ,
						'" . $city . "' , '" . $state . "' , '" . $country . "' , '" . $zip . "' , '" . $creationDate . "' , '" . $favorite . "')";

		if ($conn->query($sql) === FALSE)
		{
			returnWithError($conn->connect_error);
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
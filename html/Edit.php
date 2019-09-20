<?php

	$inData = getRequestInfo();
	
	$db_user = "localhost";
	$db_username = "frontend";
	$db_pw = "simpleyetEffective2019!";
    $db_name = "user";
    
    $firstName = $inData["first_name"];
	$lastName = $inData["last_name"];
	$favColor = $inData["fav_color"];
	$fullname = $inData["fullname"];
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
	$contactID = $inData["contact_id"];
    
	$conn = new mysqli($db_user, $db_username, $db_pw, $db_name);
	if ($conn->connect_error)
	{
		returnWithError($conn->connect_error);
    }
	else
	{
        $sql = "UPDATE `contacts` SET /*first_name = '" . $firstName . "', 
                                      last_name = '" . $lastName . "',
                                      fav_color= '" . $favColor . "',
                                      notes = '" . $notes . "',
                                      primary_street_addr = '" . $primStrAddr . "',
                                      second_street_addr = '" . $sndStrAddr . "',
                                      city = '" . $city . "',
                                      state = '" . $state . "',
                                      country = '" . $country . "',
				      fullname = '" . $fullname . "',
                                      zip = '" . $zip . "',
                                      phone_number = '" . $phoneNumber . "',*/
                                      birthday = $birthday,
                                      /*favorite = '" . $favorite . "'*/
                                WHERE contact_id = '" . $contactID . "'";

        if($conn->query($sql) === FALSE)
        {
            returnWithError("Unable to edit contact.");
        }
        else
        {
            returnWithError("Successfully edited.");
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

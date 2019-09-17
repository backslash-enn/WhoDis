<?php

$inData = getRequestInfo();

$searchResults = "";
$searchCount = 0;

$connection = new mysqli("localhost", "frontend", "simpleyetEffective2019!", "user");

if ($conn->connect_error) 
{
    errorReturn($connection->connect_error);
}

else
{
//    passing in two separate values, one for first time and one for last name. If one of those isn't present, ask Angular to pass in null
    $query = "SELECT first_name, last_name, nick_name, fav_color, bio, primary_street_addr, second_street_addr, city, state, country, zip, favorite from `contacts` where first_name LIKE '%".$inData["first_name"]."%' OR last_name LIKE '%".$inData["last_name"]."%' OR  nick_name LIKE '%".$inData["first_name"]."%' OR nick_name LIKE '%".$inData["last_name"]."%'";
    $result = $connection->query($query);
    if($result->num_rows > 0)
    {
        while($row = $result->fetch_assoc())
        {
            if($searchCount > 0)
            {
                $searchResults .= ",";
            }
            $searchCount++;
            $searchResults .= '"' . $row["first_name"] . '" "' . $row["last_name"] . '" "' . $row["nicl_name"] . '" "' . $row["fav_color"] . '" "' . $row["bio"] . '" "' . $row["parimary_street_addr"] . '" "' . $row["second_street_addr"] . '" "' . $row["city"] . '" "' . $row["state"] . '" "' . $row["country"] . '" "' . $row["zip"] . '" "' . $row["favorite"] . '"';
        }
    }
    else
    {
        errorReturn("No Records Found");
    }
    $connection->close();
}

returnInfo ($searchResults);

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson( $obj )
{
    header('Content-type: application/json');
    echo $obj;
}

function errorReturn ($error)
{
    $value = '{"id":0,"firstName":"","lastName":"","error":"'.$err.'"}';
    sendResultInfoJson($value);
}

function returnInfo( $searchResults )
{
    $retValue = '{"results":[' . $searchResults . '],"error":""}';
    sendResultInfoAsJson( $retValue );
}

?>
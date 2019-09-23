<?php

session_start();

$inData = getRequestInfo();

$searchResults = "";
$searchCount = 0;
$user_id = -1;
$connection = new mysqli("localhost", "frontend", "simpleyetEffective2019!", "user");
$search = $inData["search"];

if ($connection->connect_error) 
{
    errorReturn("cannot connect to db");
}

else
{
//    passing in one values, it should contain field to search either by first or last name or both.
    
    if(!isset($_SESSION["user_id"]))
    {
        errorReturn("User not logged in!");
        return;
    }
    else
    {
        $user_id = $_SESSION["user_id"];
    }
    
    $name_given = $inData["search"];
    if (strlen($name_given) <= 0)
    {
        //Checks for possible SQL injections and prevents it
        $query = $connection->prepare("SELECT * from `contacts` where user_id = ?");
        $query->bind_param('i', $user_id);
    }
    else
    {
        /*
        //getting the results from searching
        $query = $connection->prepare("SELECT * from `contacts` where user_id = ? AND name LIKE '%".$inData["search"]."%'");
        $query->bind_param('i')
        */
    }

    $query->execute();
    $result = $query->get_result();
    if($result->num_rows > 0)
    {
        while($row = $result->fetch_assoc())
        {
            if($searchCount > 0)
            {
                $searchResults .= ",";
            }
            $searchCount++;
            $searchResults .= '{"name" : "' . $row["name"] . '", "fav_color" : "' . $row["fav_color"] . '", "phone_number" : "' . $row["phone_number"] . '", "email" : "' . $row["email"] . '","birthday" : "' . $row["birthday"] . '", "notes" : "' . $row["notes"] . '", "primary_street_addr" : "' . $row["primary_street_addr"] . '", "favorite" : "' . $row["favorite"] . '", "contact_id" : "' . $row["contact_id"] . '", "pp_index" : "' . $row["pp_index"] . '"}';
        }
    }
    else
    {
        errorReturn("No Records Found");
        return;
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
    $value = '{"error":"'.$error.'"}';
    sendResultInfoJson($value);
}

function returnInfo( $searchResults )
{
    $retValue = '{"results":[' . $searchResults . '],"error":""}';
    sendResultInfoAsJson( $retValue );
}

?>

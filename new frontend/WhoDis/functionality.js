function displayContactInfo(b){

    var contact_info = document.getElementById('contactinfo');
    var welcome_msg = document.getElementById('welcome');
    switch (b.id){
        case "Harry Otter":
            if (contact_info.style.display === "block")
            {
                contact_info.style.display = "none";
                welcome_msg.style.display = "block";
            }
            else
            {
                contact_info.style.display = "block";
                welcome_msg.style.display = "none";
            } 
            break;
        case "Harry Otter 2":
            if (contact_info.style.display === "block")
                contact_info.style.display = "none";
            else   
                contact_info.style.display = "block";
            break;
    }
    // if (x.style.display === "block"){
    //     x.style.opacity = '0';
    //     x.style.display = "none";
    // }
    // else {
    //     x.style.display = "block";
    //     x.style.opacity = '1';
    // }

}


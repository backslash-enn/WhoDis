function displayContactInfo(b){

    var contact_details = document.getElementById('contactdetails');
    var welcome_msg = document.getElementById('welcome');
    var left_panel = document.getElementById('leftpanel');
    switch (b.id){
        case "Harry Otter":
            if (contact_details.style.display === "block")
            {
                left_panel.style.animation = 'none';
                left_panel.offsetHeight;

                left_panel.style.animation = "swap-leftpanel-slide .4s linear forwards";
                left_panel.style.animationTimingFunction = "cubic-bezier(0, .85, .31, .99)";

                setTimeout(function() {
                    contact_details.style.display = "none";
                    welcome_msg.style.display = "block";
                }, 100);
            }
            else
            {
                left_panel.style.animation = 'none';
                left_panel.offsetHeight;
                
                left_panel.style.animation = "swap-leftpanel-slide .4s linear forwards";
                left_panel.style.animationTimingFunction = "cubic-bezier(0, .85, .31, .99)";

                setTimeout(function() {
                    contact_details.style.display = "block";
                    welcome_msg.style.display = "none";
                }, 100);
            } 
            break;
        case "Harry Otter 2":
            if (contact_details.style.display === "block")
                contact_info.style.display = "none";
            else   
                contact_details.style.display = "block";
            break;
    }
}


function sendMailJs() {

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;

    // Check if name or email is empty
    if (name.trim() === '' || email.trim() === '') {
        alert("Name and email are required fields");
        return; // Exit the function early
    }

    var params = {
        name: name,
        email: email,
        message: document.getElementById("message").value,
        phone: document.getElementById("phone").value

    };

    const serviceID = "service_7c40sqm";
    const templateID = "template_dy9gs4u";




    emailjs.send(serviceID, templateID, params)
        .then(
            res => {
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("message").value = "";
                document.getElementById("phone").value = "";

                console.log(res);
                alert("your message sent succesfully");


            }
        ).catch((err) => console.log(err));

}



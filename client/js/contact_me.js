"use strict";

$(function() {
    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            

            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();
            
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                               $.getScript("https://cdn.emailjs.com/dist/email.min.js", function(){
                                                emailjs.init("user_gC78M2EkHiBkgAnHP1gSo");
                    emailjs.send("gunshipmailer","contact_form",{name: name, notes: message + " -- phone: " + phone + " -- email: " + email});

                    });
                    // Enable button & show success message
                    $("#btnSubmit").attr("disabled", false);
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');
                                            $('#contactForm').trigger("reset");
                                            
                                            
                                            
                                 

//     var nodemailer =  require('nodemailer');
//                         // create reusable transport method (opens pool of SMTP connections)
                        
//     let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: "gunshipmailer@gmail.com",
//         pass: "gunshipWeb"
//     }
// });


// let mailOptions = {
//     from: "Fred Foo ✔ <foo@blurdybloop.com>", // sender address
//     to: "gunshipwebdesign@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world ✔", // plaintext body
//     html: "<b>Hello world ✔</b>" // html body
// }
  
//             // get values from FORM
//             mailOptions.from = $("input#email").val();
//             mailOptions.to = "gunshipwebdesign@gmail.com";
//             mailOptions.subject = ("Contact Form Message from " + $("input#name").val());
//             mailOptions.text = ($("textarea#message").val() + "  ---  " + $("input#phone").val());
//             var firstName = $("input#name").val(); 
                        
//                         transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message %s sent: %s', info.messageId, info.response);
// });
  

                    //clear all fields
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});
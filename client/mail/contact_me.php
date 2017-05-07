<?php
// Check for empty fields
require("sendgrid-php.php");


if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['phone']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
   $name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = 
	
	
	
$from = new SendGrid\Email(null, "gunshipwebdesignContact@gmail.com");
$subject = "Contact Form Message";
$to = new SendGrid\Email(null, "gunshipwebdesign@gmail.com");
$content = new SendGrid\Content("text/plain", "You have received a new message 
from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: 
   $email_address\n\nPhone: $phone\n\nMessage:\n$message");
$mail = new SendGrid\Mail($from, $subject, $to, $content);

$apiKey = getenv('SENDGRID_API_KEY');
$sg = new \SendGrid($apiKey);

$response = $sg->client->mail()->send()->post($mail);
echo $response->statusCode();
echo $response->headers();
echo $response->body();















	
// Create the email and send the message
$to = 'gunshipwebdesign@gmail.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Website Contact Form:  $name";
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nMessage:\n$message";
$headers = "From: noreply@yourdomain.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";
$mail=mail($to, "Subject: $email_subject",$message );
if($mail){
echo "Thank you for using our mail form";
}else{
echo "Mail sending failed."; 
}
return true;			
?>

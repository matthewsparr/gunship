<?php
// Check for empty fields
require("sendgrid-php.php");
require("Mail.php");
error_log("log test");


if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['phone']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	error_log("did not get info");
	return false;
   }
   error_log("got all info");
   $name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
	
	
	
$from = new SendGrid\Email(null, "gunshipwebdesignContact@gmail.com");
$subject = "Contact Form Message";
$to = new SendGrid\Email(null, "gunshipwebdesign@gmail.com");
$content = new SendGrid\Content("text/plain", "You have received a new message 
from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: 
$email_address\n\nPhone: $phone\n\nMessage:\n$message");
$mail = new SendGrid\Mail($from, $subject, $to, $content);

$apiKey = getenv('SENDGRID_API_KEY');
$sg = new \SendGrid($apiKey);
   error_log("about to send email");

$response = $sg->client->mail()->send()->post($mail);
echo $response->statusCode();
echo $response->headers();
echo $response->body();
?>

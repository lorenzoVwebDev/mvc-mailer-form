<?php
require __DIR__.'//..//..//..//vendor//autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;



class Mailer {
  private $name;
  private $surname;
  private $birthdate;
  private $type;
  private $email;
  private $table;

 function __construct($mailArray) {
  $this->name = $mailArray[0];
  $this->surname = $mailArray[1];
  $this->birthdate = $mailArray[2];
  $this->type = $mailArray[3];
  $this->email = $mailArray[4];
  $this->table = $mailArray[5];
  }

  function sendTableMail() {

    try {
      $mail = new PHPMailer(true);
      $mail->Debugoutput = function($str, $level) {
        error_log($str, 3, __DIR__."//..//..//..//logs//mailDebugOutput". date('mdy').".txt");
      };
      $mail->isSMTP();
      $mail->Host = 'smtp.gmail.com';
      $mail->SMTPAuth = true;
      $mail->Username = 'lorenzoviganego1@gmail.com';
      $mail->Password = 'gpom nsmp myjc wiuz';
      $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
      $mail->Port = 587;
      $mail->SMTPDebug = 3;
    
      $mail->setFrom('lorenzoviganego@gmail.com', 'LorenzoVwebdev');
      $users = array (
        array (
          $this->name . " " .$this->surname,
          $this->email
        )
        );
    
        foreach ($users as $user) {
          $mail->addAddress($user[1]);
    
          $mail->IsHTML(true);
          $mail->Subject = 'MVC mailer form portfolio project';
          $mail->Body = "Hi ". $user[0]. " thank you so much for visiting my website, I hope that you liked it and that you will come back again!"."\n";
          $mail->Body .= "Here is the ".$this->type." table that you have requeste, please contact me for collaboration/enterprise work proposals!";
          $mail->Body .= $this->table;
          $mail->Body .= '<table width="100%" style="background-color: #121212; color: white; font-family: Arial, sans-serif; padding: 20px; text-align: left;">
    <tr>
        <td colspan="4" style="text-align: center; font-size: 18px; font-weight: bold; padding-bottom: 15px;">
            Get connected with me on social networks!
        </td>
    </tr>
    <tr>
        <td width="25%" style="padding: 10px;">
            <img src="logo_url" width="40" style="vertical-align: middle;"> 
            <strong>Abstract</strong><br>
            <span style="font-size: 12px; color: #ccc;">PHP mailer System</span>
        </td>
        <td width="25%" style="padding: 10px;">
            <strong>Libraries/Frameworks</strong><br>
            <span style="font-size: 12px; color: #ccc;">PHP<br>PHPmailer<br>Sass</span>
        </td>
        <td width="25%" style="padding: 10px;">
            <strong>Other React Repositories</strong><br>
            <a href="https://apachebackend.lorenzo-viganego.com/mvc-dog-application/public/" style="color: #ccc; text-decoration: none; font-size: 12px;">Dog Application</a><br>
            <a href="https://apachebackend.lorenzo-viganego.com/exceptionlogpr/" style="color: #ccc; text-decoration: none; font-size: 12px;">Exception Logger</a><br>
        </td>
        <td width="25%" style="padding: 10px;">
            <strong>Contacts</strong><br>
            <span style="font-size: 12px; color: #ccc;">
                📍 Rome, Italy <br>
                📧 <a href="mailto:lorenzoviganego.work@libero.it" style="color: #ccc; text-decoration: none;">lorenzoviganego.work@libero.it</a><br>
                📞 <a href="tel:+393517431574" style="color: #ccc; text-decoration: none;">+39 351 743 1574</a>
            </span>
        </td>
    </tr>
    <tr>
        <td colspan="4" style="text-align: center; font-size: 12px; color: #ccc; padding-top: 15px; border-top: 1px solid #444;">
            © 2024 by Lorenzo Viganego || All Rights Reserved.
        </td>
    </tr>
</table>
';
          $mail->send();
    
          $mail->clearAddresses();
        }

     } catch (Exception $e) {
/*       print $e; */
     }
  }
}

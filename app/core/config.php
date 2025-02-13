<?php
require(__DIR__. '/../../vendor/autoload.php');

use Dotenv\Dotenv;
//load the .env file
$dotenv = Dotenv::createImmutable(__DIR__. '/../../');
$dotenv->load();

if ($_SERVER['SERVER_NAME'] == 'mvc-mailer-form') {
  define('EMAIL_USERNAME', $_ENV['EMAIL_USERNAME']);
  define('EMAIL_PASSWORD', $_ENV['EMAIL_PASSWORD']);
  define('LOGS', __DIR__."\\..\\..\\". "logs");
  define('ROOT', 'http://mvc-mailer-form/');
  define('DBHOST', 'localhost');
  define('DBNAME', 'lorenzo1');
  define('DBUSER', 'root');
  define('DBPASSWORD', $_ENV['DB_PASSWORD']);
} else {
  /*   we can use this ROOT constant in a index.php file to define a path <a href="<?= ROOT ?>path/to/page">Click Here</a>; The <?= ROOT?> syntax is a shorthand for <php? echo ROOT; ?>*/
  define('LOGS', __DIR__."//..//..//". "logs");
  define('ROOT', 'https://apachebackend.lorenzo-viganego.com/mvc-mailer-form/');
  define('DBHOST', 'localhost');
  define('DBNAME', 'lorenzo1');
  define('DBUSER', 'root');
  define('DBPASSWORD', $_ENV['DB_PASSWORD']);
};

//used to set debug mode on or off, in debug mode on we are goin to show all the errors, is used only in development modality, once that the application is online is must be set as false in order to not show users what errors happen
define('DEBUG', true);


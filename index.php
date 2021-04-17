<?php
require_once 'stats.php';
$ref = isset($_SERVER['HTTP_REFERER']) ?  $_SERVER['HTTP_REFERER'] : null;
$ua = $_SERVER['HTTP_USER_AGENT'];
stats(
    $_SERVER['REMOTE_ADDR'], 
    $ref,
    $ua, 
    gethostbyaddr($ua)
);
$content = "Software developer, Information Systems Engineer, and  teacher on ";
$content.= "IT-related courses. PHP/Python. Native Spanish and fluent English.";
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="description" content="<?php echo $content;?>">
        <meta name="viewport" content="width=device-width">
        <title>Juan Marquez - Software developer</title>
        <link rel="stylesheet" href="style.css" type="text/css">
        <script src="main.js"></script>
    </head>
    <body onkeyup="keypressing(event);">
        <div id="x">
            <div class="option" onclick="executeFromSelect('cv');">Show CV</div>
            <div class="option" onclick="executeFromSelect('printable');">
                Download printable CV (pdf)
            </div>
            <div class="option" onclick="executeFromSelect('github');">
                My Github repositories
            </div>
            <div class="option" onclick="executeFromSelect('teaching');">
                My online classes
            </div>
            <div class="option" onclick="executeFromSelect('contact');">
                Contact me!
            </div>
            <div class="option" onclick="executeFromSelect('quotes');">
                Read an inspiring quote
            </div>
            <div class="option" onclick="executeFromSelect('help');">
                Show terminal help
            </div>
        </div>
        <div class="terminal" id="terminal">
            <pre style="margin: 0 auto; width: 60%; min-width: 50em;">

  888888                                              
    "88b                                              
     888                                              
     888 888  888  8888b.  88888b.  .d8888b   .d88b.  
     888 888  888     "88b 888 "88b 88K      d8P  Y8b 
     888 888  888 .d888888 888  888 "Y8888b. 88888888 
     88P Y88b 888 888  888 888  888      X88 Y8b.     
     888  "Y88888 "Y888888 888  888  88888P'  "Y8888  
   .d88P   888b     d888                                            
 .d88P"    8888b   d8888                                           
888P"      88888b.d88888 
           888Y88888P888  8888b.  888d888 .d88888 888  888  .d88b. 88888888
           888 Y888P 888     "88b 888P"  d88" 888 888  888 d8P  Y8b   d88P
           888  Y8P  888 .d888888 888    888  888 888  888 88888888  d88P
           888   "   888 888  888 888    Y88b 888 Y88b 888 Y8b.     d88P
           888       888 "Y888888 888     "Y88888  "Y88888  "Y8888 88888888
                                              888
           (Type 'h' or 'help' to             888        Software Developer
            see available commands)           888
            </pre>
            
            <p class="hl center">
              <a href="es.php" onclick="event.stopPropagation();">Spanish Version</a>
            </p>
            <p class="commandLine"><span class="prompt">visitor@juansemarquez:~</span> 
            <noscript>
                <span class="hl">(This site requires javascript - won't work)</span>
            </noscript>
            <span class="command">
                <span id="currentCommand"></span><span class="cursor">_</span>
            </span></p>
          </div>
          <div id="contact">
            <a href="es.php" id="language">
                <strong>ES</strong>
            </a>
            <a href="https://www.linkedin.com/in/juan-sebasti%C3%A1n-marquez-2003b91b2/">
                <img src="linkedin.png" alt="LinkedIn Logo">
            </a>
            <a href="https://twitter.com/profejuanse">
                <img src="twitter.png" alt="Twitter Logo">
            </a>
            <a href="https://github.com/juansemarquez">
                <img src="github.png" alt="GitHub Logo">
            </a>
        </div>
    </body>
</html>

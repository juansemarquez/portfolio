window.onload = function() {
    // If we are on a narrow screen, show radio buttons to choose commands when
    // the user clicks or taps on the terminal.
    //if (window.innerWidth < 900) {
       document.querySelector('.terminal').addEventListener('click', showSelectOfCommands);
    // }
}

function showSelectOfCommands() {
    // Opens radio buttons for selecting command on mobile devices.
    document.getElementById("terminal").classList.add('blureado');
    let x = document.getElementById("x");
    x.style.display="block";
    x.style.zIndex=3;
    x.focus();
}

function executeFromSelect(commandSelected) {
    // Execute the command selected on radio buttons.
    let x = document.getElementById("x");
    x.style.display = "none";

    //Unselect all radio buttons
    var ele = document.getElementsByName("command");
    for(var i=0;i<ele.length;i++) {
        ele[i].checked = false;
    }

    document.getElementById("terminal").classList.remove('blureado');
    setTimeout( () => { 
        document.getElementById("currentCommand").innerHTML = commandSelected;
        }, 800);
    setTimeout( () => { 
        command(commandSelected) 
        }, 1000);
}

function keypressing(event) 
{
      // When the user presses a key:
      var x = event.key;
      var c = document.getElementById('currentCommand');

      // If it is a letter or a number, add it to the current command.
      if (x.length == 1) {
          c.innerHTML += x;
      }

      // If it is backspace, delete the last character.
      else if (x == 'Backspace' && c.innerHTML.length > 0) {
          c.innerHTML = c.innerHTML.slice(0, -1);
      } 

      // If it is Enter, execute the command.
      else if (x == 'Enter') {
          let commandEntered = c.innerHTML;
          command(commandEntered);
      }
}

function command(c) {
    // Receive a command and execute it.

    // Find the last command in terminal, remove it as "current command" and
    // add it as an already executed command:
    let last_command = document.querySelectorAll('.commandLine');
    last_command = last_command[last_command.length - 1];
    last_command.removeChild(last_command.lastChild);
    let commandSpan = document.createElement('span');
    commandSpan.innerHTML = c;
    last_command.appendChild(commandSpan);
    
    // Create the prompt line for a new (future) command:
    let newCommand = document.createElement('p');
    newCommand.className = 'commandLine';
    newCommand.innerHTML = '<p class="commandLine"><span class="prompt">visitor@juansemarquez:~</span> <span class="command"><span id="currentCommand"></span><span class="cursor">_</span></span>';

    // Prepare the response of the last command:
    let term = document.querySelector('.terminal');
    let responseParagraph = document.createElement('p');
    responseParagraph.className = 'response';
    responseParagraph.innerHTML = commandResponse(c);
    // Prevent firing the command selector if clicked:
    //responseParagraph.addEventListener('click',function (event){
    //    event.stopPropagation();
    //});

    // Append the response and the new command to the terminal:
    term.appendChild(responseParagraph);
    term.appendChild(newCommand);

    //On mobiles, if the user click on the response (eg: a link), it shouldn't
    //open the command selector list.
    //document.querySelector('.response').forEach = function(item, index) {
    //    item.preventDefault();
    //    item.addEventListener('click', void(0));
    //};
    

    //Scroll to the end of the terminal:
    term.scrollTop = term.scrollHeight;
}

function commandResponse(c) {
    let cm = c.toLowerCase();
    let text;
    switch(cm) {
        case 'help':
        case 'h':
            text = help();
            break;
        case 'c':
        case 'cv':
            text = cv(); 
            break;
        case 'p':
        case 'printable':
            text = printable();
            break;
        case 'g':
        case 'github':
            text = git();
            break;
        case 'teaching':
        case 't':
            text = teaching();
            break;
        case 'o':
        case 'contact':
            text = contact();
            break;
        case 'q':
        case 'quotes':
            text = quotes();
            break;
        default:
            text = "<strong>--- Unknown command: '" + c + "' ---</strong><br>";
            text+= help();
            break;
    }
    return text;
}


/**************************************
 * Specific command-related functions *
 **************************************/

function help() {
    let text = "<span class='highlight'>cv</span> or ";
    text += "<span class='highlight'>c</span> - ";
    text += 'Shows my CV (resume)<br>';

    text += "<span class='highlight'>printable</span> or ";
    text += "<span class='highlight'>p</span> - ";
    text += 'Download a <del>boring</del> formal pdf resume.<br>';

    text += "<span class='highlight'>github</span> or ";
    text += "<span class='highlight'>g</span> - ";
    text += 'Shows a link to my GitHub account.<br>';

    text += "<span class='highlight'>teaching</span> or ";
    text += "<span class='highlight'>t</span> - ";
    text += "Shows a link to my online classes (Spanish)</br>";

    text += "<span class='highlight'>contact</span> or ";
    text += "<span class='highlight'>o</span> - ";
    text += "Shows my email and social media profile links</br>";

    text += "<span class='highlight'>quotes</span> or ";
    text += "<span class='highlight'>q</span> - ";
    text += "Shows a randomly-picked inspiring quote</br>";
    
    text += "<span class='highlight'>help</span> or ";
    text += "<span class='highlight'>h</span> - ";
    text += "Prints this help</br>";

    return text;
}

function teaching() {
    let text = "I've been <strong class='hl'>teaching future IT ";
    text += "professionals</strong> for the last 10 years. If you'd like to ";
    text += " take a look at some of the material I created for my ";
    text += "students, you can follow these links (in Spanish): <br>"
    text += "- <a href='/gs2' target='_blank' onclick='event.stopPropagation();'>Gestión de Software II (Introduction to OOP with Python)</a><br>";
    text += "- <a href='/prog1' target='_blank' onclick='event.stopPropagation();'>Programación I (Introduction to OOP with PHP)</a><br>";
    text += "- <a href='/is2' target='_blank' onclick='event.stopPropagation();'>Ingeniería de Software II</a><br>";
    text += "- <a href='/bd' target='_blank' onclick='event.stopPropagation();'>Bases de Datos (Relational Databases)</a><br>";
    text += "- <a href='/bd2' target='_blank' onclick='event.stopPropagation();'>Bases de Datos 2</a><br>";
    return text;
}

function git() {
    let text = "See <a href='https://github.com/juansemarquez/' ";
    text += "target='_blank' onclick='event.stopPropagation();'>my Github repositories</a>!";
    return text;
}

function printable() {
    let text = "My CV should start downloading now. ";
    text += '(It works on my machine ¯\\_(ツ)_/¯ )<br>';
    text += " If it doesn't, you can <a href='JuanMarquez-cv.pdf' onclick='event.stopPropagation();'>";
    text += "download it by clicking here</a>.";
    window.location.href = 'JuanMarquez-cv.pdf';
    return text;
}

function cv() {
    let text = "Hi! I'm <strong class='hl'>Juanse Marquez</strong> and I'm a ";
    text += "<strong class='hl'>software developer</strong> based in Rosario, ";
    text += "Argentina.<br>";

    text += "I've been teaching IT-related subjects for the last 10 years, and";
    text += " I'm currently <strong class='hl'>looking for a position as a ";
    text += "developer</strong>.<br>";

    text += "I have a degree on <strong class='hl'>Information Systems ";
    text += "Engineering</strong>, and I write PHP and/or Python code.<br>";

    text += "I speak both native <strong class='hl'>Spanish</strong> and ";
    text += "fluent <strong class='hl'>English</strong>.<br>";

    text += "You can ";
    text += "<a href='https://github.com/juansemarquez' onclick='event.stopPropagation();'>";
    text += "check my projects on Github</a> or ";
    text += "<a href='#currentCommand' name='t' ";
    text += "onclick=\"event.stopPropagation();executeFromSelect('teaching')\">";
    text += "visit my online courses</a>. <br>";

    text += "Need more info? Check <a href='JuanMarquez-cv.pdf' onclick='event.stopPropagation();'>";
    text += "my complete cv</a>.";

    return text;
}

function contact() {
    let text = "<span class='hl'>Contact me!</span><br>";
    text += "- Send me an email: <a href='mailto: juanse@juansemarquez.com'>";
    text += "juanse@juansemarquez.com</a><br>";

    text += "- Find me on Twitter as ";
    text += "<a href='https://twitter.com/profejuanse' onclick='event.stopPropagation();'>";
    text += "@profejuanse</a><br> ";

    text += "- Check ";
    text += "<a href='https://www.linkedin.com/in/juan-sebasti%C3%A1n-marquez-2003b91b2'";
    text += " onclick='event.stopPropagation();'>my LinkedIn profile.</a><br>";

    text += "- Contact me ";
    text += "<a href='https://github.com/juansemarquez' onclick='event.stopPropagation();'>";
    text += "on GitHub</a><br>";

    return text;
}

function quotes() {
    let quotes = [
'"The best way to get started is to quit talking and begin doing." – Walt Disney',
'"The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty." – Winston Churchill',
'"If you are working on something that you really care about, you don\'t have to be pushed. The vision pulls you." – Steve Jobs',
'"People who are crazy enough to think they can change the world, are the ones who do." – Rob Siltanen',
'"Knowing is not enough; we must apply. Wishing is not enough; we must do." – Johann Wolfgang Von Goethe',
'"Whether you think you can or think you can\'t, you\'re right." – Henry Ford',
'"Creativity is intelligence having fun." – Albert Einstein',
'"You are never too old to set another goal or to dream a new dream." – C.S. Lewis',
'"I think goals should never be easy, they should force you to work, even if they are uncomfortable at the time." – Michael Phelps',
'"Today\'s accomplishments were yesterday\'s impossibilities." – Robert H. Schuller',
'"The only way to do great work is to love what you do. If you haven\'t found it yet, keep looking. Don\'t settle." – Steve Jobs',
'"You don\'t have to be great to start, but you have to start to be great." – Zig Ziglar',
'"I can\'t change the direction of the wind, but I can adjust my sails to always reach my destination." - Jimmy Dean',
'"Life is like riding a bicycle. To keep your balance, you must keep moving." - Albert Einstein',
'"If I cannot do great things, I can do small things in a great way."  - Martin Luther King Jr.',
'"Keep your face always toward the sunshine, and shadows will fall behind you." - Walt Whitman',
'"A person with a new idea is a crank, until the idea succeeds." - Mark Twain'
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
}

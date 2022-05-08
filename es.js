window.onload = function() {
    // If we are on a narrow screen, show radio buttons to choose commands when
    // the user clicks or taps on the terminal.
    if (window.innerWidth < 800) {
       document.querySelector('.terminal').addEventListener('click', showSelectOfCommands);
    }
}

function commandStats(comm) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
       if(this.readyState == 4 && this.status == 200) {
           console.log(this.responseText);
       }
    };
    request.open("POST","commandstats.php", true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send("command="+comm);
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

    commandStats(c);

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
    newCommand.innerHTML = '<p class="commandLine"><span class="prompt">visitas@juansemarquez:~</span> <span class="command"><span id="currentCommand"></span><span class="cursor">_</span></span>';

    // Prepare the response of the last command:
    let term = document.querySelector('.terminal');
    let responseParagraph = document.createElement('p');
    responseParagraph.className = 'response';
    responseParagraph.innerHTML = commandResponse(c);

    // Append the response and the new command to the terminal:
    term.appendChild(responseParagraph);
    term.appendChild(newCommand);

    //Scroll to the end of the terminal:
    term.scrollTop = term.scrollHeight;
}

function commandResponse(c) {
    let cm = c.toLowerCase();
    let text;
    switch(cm) {
        case 'help':
        case 'h':
        case 'ayuda':
        case 'a':
            text = help();
            break;
        case 'c':
        case 'cv':
            text = cv(); 
            break;
        case 'p':
        case 'pdf':
            text = printable();
            break;
        case 'g':
        case 'github':
            text = git();
            break;
        case 'docencia':
        case 'd':
        case 't':
        case 'teaching':
            text = teaching();
            break;
        case 'o':
        case 'contacto':
        case 'contact':
            text = contact();
            break;
        case 'q':
        case 'quotes':
        case 'frases':
        case 'f':
            text = quotes();
            break;
        case 'b':
        case 'blog':
            text = blog();
            break;
        default:
            text = "<strong>--- Commando desconocido: '" + c + "' ---</strong><br>";
            text+= help();
            break;
    }
    return text;
}


/**************************************
 * Specific command-related functions *
 **************************************/

function help() {
    let text = "<span class='highlight'>cv</span> o ";
    text += "<span class='highlight'>c</span> - ";
    text += 'Mostrar mi CV<br>';

    text += "<span class='highlight'>pdf</span> o ";
    text += "<span class='highlight'>p</span> - ";
    text += 'Descargar un CV <del>aburrido</del> formal en pdf.<br>';

    text += "<span class='highlight'>github</span> o ";
    text += "<span class='highlight'>g</span> - ";
    text += 'Mostrar un enlace a mi cuenta de GitHub.<br>';

    text += "<span class='highlight'>docencia</span> o ";
    text += "<span class='highlight'>d</span> - ";
    text += "Mostrar links a mis clases online</br>";

    text += "<span class='highlight'>contacto</span> u ";
    text += "<span class='highlight'>o</span> - ";
    text += "Mostrar mi mail y mis perfiles de redes sociales</br>";

    text += "<span class='highlight'>blog</span> o ";
    text += "<span class='highlight'>b</span> - ";
    text += "Muestra un enlace a mi blog personal</br>";

    text += "<span class='highlight'>frases</span> o ";
    text += "<span class='highlight'>f</span> - ";
    text += "Mostrar la frase del día</br>";
    
    text += "<span class='highlight'>ayuda</span> o ";
    text += "<span class='highlight'>a</span> - ";
    text += "Mostrar este mensaje de ayuda</br>";

    return text;
}

function teaching() {
    let text = "Desde hace 10 años, <strong class='hl'>doy clases a futuros ";
    text += "profesionales de TI</strong>. Parte del material que he ";
    text += "creado para mis estudiantes puede verse aquí: <br>";
    text += "- <a href='/gs2' target='_blank' onclick='event.stopPropagation();'>";
    text += "Gestión de Software II (Introducción a la POO con Python)</a><br>";
    text += "- <a href='/prog1' target='_blank' onclick='event.stopPropagation();'>";
    text += "Programación I (Introducción a la POO with PHP)</a><br>";
    text += "- <a href='/is2' target='_blank' onclick='event.stopPropagation();'>Ingeniería de Software II</a><br>";
    text += "- <a href='/bd' target='_blank' onclick='event.stopPropagation();'>Bases de Datos</a><br>";
    text += "- <a href='/bd2' target='_blank' onclick='event.stopPropagation();'>Bases de Datos 2</a><br>";
    return text;
}

function git() {
    let text = "Ver <a href='https://github.com/juansemarquez/' ";
    text += "target='_blank' onclick='event.stopPropagation();'>mis repositorios en Github</a>";
    return text;
}

function printable() {
    //let text = "My CV debería descargarse ahora mismo. ";
    //text += '(En mi máquina funciona ¯\\_(ツ)_/¯ )<br>';
    //text += " Si no comienza la descarga, se puede ";
    //text += "<a href='JuanMarquez-cv.pdf' onclick='event.stopPropagation();'>";
    //text += "descargar desde aquí</a>.";
    let text = "Como actualmente no estoy buscando trabajo, mi CV no está ";
    text += "públicamente disponible. Si necesitás más información, podés";
    text += "<a onclick='event.stopPropagation();command(\"contacto\");'> escribirme un mail</a>";
    //window.location.href = 'JuanMarquez-cv.pdf';
    return text;
}

function cv() {
    let text = "¡Hola! Me llamo <strong class='hl'>Juanse Marquez</strong>, soy ";
    text += "un <strong class='hl'>desarrollador de software</strong> de ";
    text += "Rosario, Argentina.<br><br>";

    text += "Doy clases en carreras de nivel superior de Informática desde hace";
    text += " 10 años, y actualmente <strong class='hl'>trabajo ";
    text += "como desarrollador PHP</strong>.<br><br>";

    text += "Soy <strong class='hl'>Ingeniero en Sistemas de ";
    text += "Información</strong> (UTN), y desarrollo en PHP y/o Python.<br><br>";

    text += "Puedo comunicarme tanto en ";
    text += "<strong class='hl'>castellano</strong> (nativo) ";
    text += "como en <strong class='hl'>inglés</strong> (avanzado).<br><br>";

    text += "Pueden echarle un vistazo a ";
    text += "<a href='https://github.com/juansemarquez' onclick='event.stopPropagation();'>";
    text += "mis proyectos en Github</a> o ";
    text += "<a href='#currentCommand' name='t' ";
    text += "onclick=\"event.stopPropagation();executeFromSelect('teaching')\">";
    text += "visitar parte de mis cursos online</a>. <br><br>";

    //text += "¿Más información? Pueden descargar ";
    //text += "<a href='JuanMarquez-cv.pdf' onclick='event.stopPropagation();'>";
    //text += "mi cv completo (pdf)</a>.";

    return text;
}

function contact() {
    let text = "<span class='hl'>¡Conversemos!</span><br>";
    text += "- Me encuentran en Twitter como ";
    text += "<a href='https://twitter.com/profejuanse' onclick='event.stopPropagation();'>";
    text += "@profejuanse</a><br> ";

    text += "- O bien pueden revisar ";
    text += "<a href='https://www.linkedin.com/in/juan-sebasti%C3%A1n-marquez-2003b91b2'";
    text += " onclick='event.stopPropagation();'>mi perfil en LinkedIn.</a><br>";

    text += "- O comunicartnos a través de ";
    text += "<a href='https://github.com/juansemarquez' onclick='event.stopPropagation();'>";
    text += "GitHub</a><br>";

    return text;
}

function blog() {
    let text = '<span class="hl">Mi blog</span><br>';
    text += "<a href='blog' onclick='event.stopPropagation();'>Ingresar</a>";
    return text;
}

function quotes() {
    let quotes = [
'"El amanecer es siempre una esperanza para el hombre" - J.R.R.Tolkien',
'"Para el que mira sin ver<br>la tierra es tierra nomás<br>nada le dice la pampa<br>ni el arroyo, ni el sauzal" - Atahualpa Yupanqui',
'"He sospechado alguna vez que la única cosa sin misterio es la felicidad, porque se justifica por sí sola" - Jorge Luis Borges',
'"La gente, por lo general, riñe porque no sabe discutir." - G.K.Chesterton',
'"La ciencia se compone de errores, que a su vez, son los pasos hacia la verdad."  - Julio Verne',
'"Retoñarán aladas de savia sin otoño<br>reliquias de mi cuerpo que pierdo en cada herida.<br>Porque soy como el árbol talado, que retoño:<br>aún tengo la vida." - Miguel Hernández',
'"La violencia es el último recurso del incompetente" - Isaac Asimov',
'"En la bondad se encierran todos los géneros de sabiduría." - Ernesto Sabato',
'"Es fácil conquistar al que piensa que está conquistado." - Antón Chéjov',
'"Todo movimiento, cualquiera que sea su causa, es creador." - Edgar Allan Poe',
'"Procuremos más ser padres de nuestro porvenir que hijos de nuestro pasado." - Miguel de Unamuno'
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
}

//Clears content so its not duplicated/repeated when clicking for another pokemon
function clearContent() {
  document.querySelector('h2').innerHTML = '';
  document.querySelector('img').src = '';
  document.querySelector('.shiny').src = '';
  document.querySelector('h4').innerHTML = '';
  document.querySelector('ul').innerHTML = ''; 
  document.querySelector('.abil').innerHTML = ''; 
  document.querySelector('.appear').innerHTML = '';
}



document.querySelector('button').addEventListener('click', getPokemon)

function getPokemon(){
  clearContent();
  const pokemonName = document.querySelector('input').value.toLowerCase()
  // Check if input is empty and alert
  if (pokemonName === '') {
    alert('Please enter a Pokémon name!');
    return; // used to exit the function
  }
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  //redisplays everything on click
  document.querySelector('#pokemon').style.display = 'flex';
  document.querySelector('#description').style.display = 'block';
  document.querySelector('#appearance').style.display = 'block';
  document.querySelector('#ability').style.display = 'block';
  document.querySelector('.abil').style.display = 'block';

  fetch(url)
      .then(res => res.json()) 
      .then(data => {
        console.log(data)
        //capitalizes the first letter
        const capitalize = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        document.querySelector('h2').innerText = capitalize;
        
        //Ultra Sun and Moon version - Picture
        //document.querySelector('img').src = data.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_default
        //document.querySelector('.shiny').src = data.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_shiny
        
        document.querySelector('img').src = data.sprites.front_default
        document.querySelector('.shiny').src = data.sprites.front_shiny
        //capitalizes the first letter again
        const capitalizeAgain = data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1);
        document.querySelector('h4').innerText = capitalizeAgain;
        //check if it has more than one object in array to display the pokemon type(pokemon only have 2 types so only have to check for [0] and [1])
        if (data.types.length > 1) {
          const capitalizeAgainTwo = data.types[1].type.name.charAt(0).toUpperCase() + data.types[1].type.name.slice(1);
          document.querySelector('.typeTwo').innerText = capitalizeAgainTwo;
        } else {
          document.querySelector('.typeTwo').innerText = "";
        } 
  
        //Stats
        data.stats.forEach(obj => {
          //create li to select multiple objects
          const li = document.createElement('li')
          //String interpolation to get the stat name and stat number together
          li.textContent = `${obj.stat.name}: ${obj.base_stat}`
          //append li to ul(aka put li into the ul)
          document.querySelector('ul').appendChild(li)
        })
        //Color list of stats
        const liColorOne = document.querySelectorAll('li')[0]; 
        liColorOne.style.border = '5px solid rgb(240, 65, 65)';
        liColorOne.style.background = 'rgb(240, 65, 65)'
        const liColorTwo = document.querySelectorAll('li')[1]; 
        liColorTwo.style.border = '5px solid orange';
        liColorTwo.style.background = 'orange'
        const liColorThree = document.querySelectorAll('li')[2]; 
        liColorThree.style.border = '5px solid yellow';
        liColorThree.style.background = 'yellow'
        const liColorFour = document.querySelectorAll('li')[3]; 
        liColorFour.style.border = '5px solid lightblue';
        liColorFour.style.background = 'lightblue'
        const liColorFive = document.querySelectorAll('li')[4]; 
        liColorFive.style.border = '5px solid lightgreen';
        liColorFive.style.background = 'lightgreen'
        const liColorSix = document.querySelectorAll('li')[5]; 
        liColorSix.style.border = '5px solid pink';
        liColorSix.style.background = 'pink'
        
        //Abilities
        data.abilities.forEach(objTwo => {
          const liTwo = document.createElement('li')
          liTwo.textContent = objTwo.ability.name
          document.querySelector('.abil').appendChild(liTwo)
        })
        //All game appearances
        data.game_indices.forEach(indices => {
          const liThree = document.createElement('li')
          liThree.textContent = indices.version.name
          document.querySelector('.appear').appendChild(liThree)
        })
    })
    .catch(err => {
      document.querySelector('#pokemon').style.display = 'none';
      document.querySelector('#description').style.display = 'none';
      document.querySelector('#appearance').style.display = 'none';
      document.querySelector('#ability').style.display = 'none';
      document.querySelector('.abil').style.display = 'none';
        alert('Check your Pokémon spelling! ')
        console.log(`error ${err}`)
    });
}


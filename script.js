// Write your JavaScript code here!

window.addEventListener("load", function(){
   // Variables for each HTMLElements
   let submitButton = document.getElementById("formSubmit");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let faultyItems = document.getElementById("faultyItems");
   let launchStatus = document.getElementById("launchStatus");

   // Planetary data for the astronauts to brief
   fetch("https://handlers.education.launchcode.org/static/planets.json")
   .then(function(response){
      response.json().then(function(data){
         let div = document.getElementById("missionTarget");
         div.innerHTML = 
         `  <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${data[3].name}</li>
               <li>Diameter: ${data[3].diameter}</li>
               <li>Star: ${data[3].star}</li>
               <li>Distance from Earth: ${data[3].distance}</li>
               <li>Number of Moons: ${data[3].moons}</li>
            </ol>
            <img src="${data[3].image}">
         `;
      });
   });

   // Used for displaying the faulty items
   function setFaultyDiv() {
      faultyItems.style.visibility = "visible";
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatus.style.color = "red";
   }

   submitButton.addEventListener("click", function(event){
      let pilotName = document.querySelector("input[name=pilotName]").value;
      let coPilotName = document.querySelector("input[name=copilotName]").value;
      let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
      let cargoMass = document.querySelector("input[name=cargoMass]").value;
      let formInfo = [pilotName, coPilotName, fuelLevel, cargoMass];

      pilotStatus.innerHTML = `${pilotName} is ready for launch`;
      copilotStatus.innerHTML = `${coPilotName} is ready for launch`;
      
      // if any of the inputs are blank it's going to return the alert
      for(let input of formInfo){
         if(input === ""){
            event.preventDefault()
            return alert("Make sure to enter valid information for each field");
         }
      }

      // According to the values it'll tell us if we are ready for launch or not
      if(parseInt(fuelLevel) < 10000 && parseInt(cargoMass) > 10000){
         setFaultyDiv();
         fuelStatus.innerHTML = 'There\'s not enough fuel for the journey';
         cargoStatus.innerHTML = "There's too much mass for the shuttle to take off.";
      }else if(parseInt(cargoMass) > 10000){
         setFaultyDiv();
         cargoStatus.innerHTML = "There's too much mass for the shuttle to take off.";
      }else if(parseInt(fuelLevel) < 10000){
         setFaultyDiv();
         fuelStatus.innerHTML = 'There\'s not enough fuel for the journey';
      }else{
         launchStatus.innerHTML = "Shuttle is ready for launch";
         launchStatus.style.color = "green";
      }
      event.preventDefault();
   });
});

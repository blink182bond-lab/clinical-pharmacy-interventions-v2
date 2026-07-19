const APP={

version:"2.0",

database:null,

init(){

console.log("Clinical Pharmacy V2");

console.log("Version",this.version);

this.load();

},

load(){

document.getElementById("totalInterventions").textContent=0;

document.getElementById("acceptedInterventions").textContent=0;

document.getElementById("departmentsCount").textContent=0;

document.getElementById("pharmacistsCount").textContent=0;

}

};

window.onload=()=>APP.init();

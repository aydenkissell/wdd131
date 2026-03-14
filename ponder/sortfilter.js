// simple sort example
const simpleList = ["oranges", "grapes", "lemons", "apples", "Bananas", "watermelons", "coconuts", "broccoli", "mango"];

simpleList.sort();
console.log(simpleList);


// compare function example
function compareFn(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
}


// object sort example
const products = [
  { productName: "Wireless Mouse", price: 29.99 },
  { productName: "Bluetooth Keyboard", price: 49.99 },
  { productName: "Laptop Stand", price: 39.99 }
];

products.sort((a, b) => a.price - b.price);
console.log(products);


// animals filter example
const animals = [
  { name: "Lion", traits: ["brave", "strong", "fierce", "wild"] },
  { name: "Elephant", traits: ["large", "gentle", "smart", "wild"] },
  { name: "Fox", traits: ["sly", "quick", "clever", "wild"] },
  { name: "Dog", traits: ["loyal", "friendly", "playful", "cuddly"] },
  { name: "Cat", traits: ["quiet", "independent", "curious", "cuddly"] }
];

const cuddlyAnimals = animals.filter(a => a.traits.includes("cuddly"));
console.log(cuddlyAnimals);


// ----------------------------
// HIKE APP
// ----------------------------

const hikes = [
{
name:"Teton Canyon",
description:"Beautiful hike near the Tetons",
distance:5,
difficulty:3,
tags:["mountains","river","forest"]
},
{
name:"Mesa Falls",
description:"Waterfall hike near Ashton",
distance:2,
difficulty:1,
tags:["waterfall","easy","family"]
},
{
name:"R Mountain",
description:"Popular Rexburg hike",
distance:3,
difficulty:2,
tags:["view","quick","local"]
},
{
name:"Table Rock",
description:"Steep hike with amazing views",
distance:7,
difficulty:4,
tags:["mountains","challenging","views"]
}
];


// show random hike initially
function showRandomHike(){
const random = hikes[Math.floor(Math.random()*hikes.length)];
displayHikes([random]);
}

showRandomHike();


// search function
function searchHikes(){

const searchTerm = document.getElementById("searchInput").value.toLowerCase();

const filtered = hikes.filter(hike =>
hike.name.toLowerCase().includes(searchTerm) ||
hike.description.toLowerCase().includes(searchTerm) ||
hike.tags.join(" ").toLowerCase().includes(searchTerm)
);


// sort by distance
filtered.sort((a,b)=> a.distance - b.distance);

displayHikes(filtered);

}


// display hikes
function displayHikes(list){

const results = document.getElementById("results");
results.innerHTML="";

list.forEach(hike =>{

const div = document.createElement("div");
div.classList.add("hike");

const boots = "🥾".repeat(hike.difficulty) + "▫️".repeat(5-hike.difficulty);

div.innerHTML = `
<h2>${hike.name}</h2>
<p>${hike.description}</p>
<p><strong>Distance:</strong> ${hike.distance} miles</p>
<p><strong>Difficulty:</strong> ${boots}</p>
`;

results.appendChild(div);

});

}
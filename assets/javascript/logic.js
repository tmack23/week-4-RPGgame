

var lockButtons = false;
var lockButtons2 = false;
var charPicked;
var charDefending;
var enemy = [];
var scoreCache = [];
var hitValue;
var score = true;
var charAttackHealth;
var charDefendHealth;
// for attack button to be used later
var b;
var audio = new Audio('https://p.scdn.co/mp3-preview/ed5a443bc86176135ebca8a114f66f4d814d4c90');

// objects of the characters
var knight = {
	name: "Knight",
	attack: 40,
	defense: 5,
	hitpoints: 200,
	 hitChance: 1
 }

var thief = {
	name: "Thief",
	attack: 30,
	defense: 4,
	hitpoints: 150,
	 hitChance: 1.5
 }

var ranger = {
	name: "Ranger",
	attack: 20,
	defense: 3,
	hitpoints: 120,
	 hitChance: 2
 }

var mage = {
	name:"Mage",
	attack: 10,
	defense: 2, 
	hitpoints: 100,
	 hitChance: 4 
 }

// function that sets up the selection and positioning of the char
$(document).ready(function(){

$("#knight, #thief, #ranger, #mage").on("click", function(){

if ($(this).attr('id') == 'knight' && !lockButtons) {
	$("#target1").append($("#thief"));
	$("#target2").append($("#ranger"));
	$("#target3").append($("#mage"));
	$("#target4").append($("#knight"));
		lockButtons = true;
		charPicked = knight;
	    charAttackHealth = $("#kHealth");
		enemy.push(thief, mage, ranger);
	
	$("#charChosen").text("Character Chosen");


}else if ($(this).attr('id') == 'thief' && !lockButtons) {
	$("#target1").append($("#knight"));
	$("#target2").append($("#ranger"));
	$("#target3").append($("#mage"));
	$("#target4").append($("#thief"));
		lockButtons = true;
		charPicked = thief;
		charAttackHealth = $("#tHealth");
		enemy.push(knight, mage, ranger);

	$("#charChosen").text("Character Chosen");


} else if ($(this).attr('id') == 'ranger' && !lockButtons) {
	$("#target1").append($("#thief"));
	$("#target2").append($("#knight"));
	$("#target3").append($("#mage"));
	$("#target4").append($("#ranger"));
		lockButtons = true;
		charPicked = ranger;
		charAttackHealth = $("#rHealth");
		enemy.push(thief, mage, knight);

	$("#charChosen").text("Character Chosen");


} else if ($(this).attr('id') == 'mage' && !lockButtons) {
	$("#target1").append($("#thief"));
	$("#target2").append($("#ranger"));
	$("#target3").append($("#knight"));
	$("#target4").append($("#mage"));
		lockButtons = true;
		charPicked = mage;
		charAttackHealth = $("#mHealth");
		enemy.push(thief, knight, ranger);
		console.log(enemy);

	$("#charChosen").text("Character Chosen");

}
console.log(charPicked);
makeRed();
});


// iterates through the array enemy and makes the characters red
function makeRed() {
	for (var i = 0; i < enemy.length; i++) {
		var temp = enemy[i].name; 
		
		switch(temp) {

			case 'Knight':
				 $("#knight").css({"border-color": 'red'});
				 $("#knight").addClass("number");
			
				break;

			case 'Thief':
				$("#thief").css({"border-color": 'red'});
				$("#thief").addClass("number");
				break;

			case 'Ranger':
				$("#ranger").css({"border-color": 'red'});
				$("#ranger").addClass("number");
				break;

			case 'Mage':
				$("#mage").css({"border-color": 'red'});
				$("#mage").addClass("number");
				break;

			default: 
			console.log('none works');
		}
			}	
				}

// makes an enemy a defender and also creates an attack button and assigns objects

		$("#knight, #thief, #ranger, #mage").on("click", function(){
			if ($(this).hasClass("number") && lockButtons2 == false) {
				$("#def").append(this);
				lockButtons2 = true;
				// assigns the object to corresponding selected character tile
				if ($(this).attr('id') == "knight") {
					charDefending = knight;
					charDefendHealth = $("#kHealth");
				} else if ($(this).attr('id') == "ranger") {
					charDefending = ranger;
					charDefendHealth = $("#rHealth");
				} else if ($(this).attr('id') == "mage") {
					charDefending = mage;
					charDefendHealth = $("#mHealth")
				} else if ($(this).attr('id') == "thief") {
					charDefending = thief;
					charDefendHealth = $("#tHealth")
				}

				// creates attack button
				b = $('<button>');
				b.addClass('attack-Button');
				b.text("Attack !");
				$(this).append(b);

			if (score) {
				a = $('<div>');
				a.addClass("gameStats");
				$("#scoreBoard").append(a);
				score = false;
				}
			}
			console.log(charDefending);
	
	
	
// runs the battle function and appends to the score board
$('.attack-Button').off().on("click", function(){

hit(charPicked.hitChance);
	if (hitValue >= 4) {
		charDefending.hitpoints = charDefending.hitpoints - (charPicked.attack - charDefending.defense); 
		// creates variable for net damage taken
		var netAttack = charPicked.attack - charDefending.defense;
		a.append(charPicked.name + " attacked " + charDefending.name + " for " +  netAttack  +  " hitpoints " + "</br>");
			// pushes into score cache array for scoreclean function to work
			scoreCache.push("data");
			console.log("score cache", scoreCache);
			// adjusts chardefending hitpoints
			$(charDefendHealth).text(charDefending.hitpoints);
		console.log(charDefending.hitpoints, "defender hitpoints");

	} else if (hitValue < 4){ console.log("you missed");
			a.append(charPicked.name + " missed " + "</br>");
			scoreCache.push("data");

hit(charDefending.hitChance);
	} if (hitValue >= 4){
		charPicked.hitpoints = charPicked.hitpoints - (charDefending.attack - charPicked.defense); 
		// creates variable for net damage taken
		var netAttack2 = charDefending.attack - charPicked.defense;
		a.append(charDefending.name + " counter attacked " + charPicked.name + " for " +  netAttack2  +  " hitpoints " + "</br>");
		scoreCache.push("data");
		// adjusts charpicked hitpoints
		 $(charAttackHealth).text(charPicked.hitpoints);
		console.log(charPicked.hitpoints, "charPicked hitpoints");
	} else if (hitValue < 4){ console.log("defending character missed");
			a.append(charDefending.name + " missed " + "</br>");
			// pushes into score cache array for scoreclean function to work
			scoreCache.push("data");

		}
		audio.play();
scoreClean();
WinLose();
});
});



// evaluates the hit chance for attacking and defending characters 
function hit(chance){
 		hitValue = chance *(Math.ceil(Math.random() * 4));
	return hitValue;
 };

// empties the score board to avoid overflow
function scoreClean(){
	for (var i = 0; i < scoreCache.length; i++) {
		if (i >= 14){
			a.empty();
				scoreCache = [];
				i = 0;
			console.log("i", i);
		}
	}
};

// evaluates the win/lose parameters 
function WinLose(){
if (charPicked.hitpoints <= 0) {
	alert("you died !");
	$("#target4").empty();
	charPicked = undefined;
	charDefending = undefined;
} else if (charDefending.hitpoints <= 0 ){
	console.log(charDefending.name, "defeated");
	// charDefending = undefined;
	lockButtons2 = false;
	$("#def").empty();
	a.empty();
	// charPicked.hitpoints =+ 30;
}
};

})



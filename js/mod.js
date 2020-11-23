let modInfo = {
	name: "The Mining Tree",
	id: "SwagMoney",
	author: "extremewonder1",
	pointsName: "Pounds",
	discordName: "",
	discordLink: "",
	changelogLink: "https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2",
	name: "Rise of the machines",
}

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade("h", 11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

    let gain = new Decimal(1)
    if (hasUpgrade("h", 12)) gain = gain.times(2)
    if (hasUpgrade("h", 13)) gain = gain.times(2)
    if (hasUpgrade("h", 14)) gain = gain.times(upgradeEffect("h", 14))
    if (hasUpgrade("h", 21)) gain = gain.times(4)
    if (hasUpgrade("h", 22)) gain = gain.times(upgradeEffect("h", 22))
    if (hasUpgrade("h", 23)) gain = gain.times(upgradeEffect("h", 22))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [ PoundsLeft, EndgameNote
]

function PoundsLeft() {
	var pTrunked = player.points.toFixed(0)
	return ("Pounds of Earth left " + (1.3e25 - pTrunked));
}

function EndgameNote() {
    return ("Current Endgame: 1 machine upgrade")
}

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1.3e25"))
}


// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600000) // Default is 1 hour which is just arbitrarily large
}
addLayer("h", {
    name: "hands", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#D2B48C",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Hands", // Name of prestige currency
    baseResource: "pounds", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
            rows: 2,
            cols: 4,
            11: {
                title: "Where are these hands coming from?",
                description: "Gain 1 Hand every second.",
                cost: new Decimal(1),
                unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            },
            12: {
                title: "You do have two of them...",
                description: "Double Hand Gain",
                cost: new Decimal(3),
                unlocked() { return (hasUpgrade(this.layer, 11))},
            },
            13: {
                title: "Power of Vishnu",
                description: "Double hand Gain",
                cost: new Decimal(10),
                unlocked() { return (hasUpgrade(this.layer, 12))},
            },
            14: {
                title: "Hands * Hands?",
                description: "Pound digging speed is faster based on your unspent Hands.",
                cost: new Decimal(25),
                unlocked() { return (hasUpgrade(this.layer, 13))},
                effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = player[this.layer].points.add(1).pow(player[this.layer].upgrades.includes(24)?1.1:(player[this.layer].upgrades.includes(14)?0.75:0.5)) 
                    if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
            21: {
                title: "Get your room mates to help out",
                description: "Quadruple hand Gain",
                cost: new Decimal(250),
                unlocked() { return (hasUpgrade(this.layer, 14))},
            },
            // 13: {
            //     description: "Unlock a <b>secret subtab</b> and make this layer act if you unlocked it first.",
            //     cost: new Decimal(69),
            //     currencyDisplayName: "candies", // Use if using a nonstandard currency
            //     currencyInternalName: "points", // Use if using a nonstandard currency
            //     currencyLocation: "", // The object in player data that the currency is contained in
            //     unlocked() { return (hasUpgrade(this.layer, 12))},
            //     onPurchase() { // This function triggers when the upgrade is purchased
            //         player[this.layer].unlockOrder = 0
            //     },
            //     style() {
            //         if (hasUpgrade(this.layer, this.id)) return {
            //         'background-color': '#1111dd' 
            //         }
            //         else if (!canAffordUpgrade(this.layer, this.id)) {
            //             return {
            //                 'background-color': '#dd1111' 
            //             }
            //         } // Otherwise use the default
            //     },
            // },
            // 22: {
            //     title: "This upgrade doesn't exist",
            //     description: "Or does it?.",
            //     currencyLocation() {return player[this.layer].buyables}, // The object in player data that the currency is contained in
            //     currencyDisplayName: "exhancers", // Use if using a nonstandard currency
            //     currencyInternalName: 11, // Use if using a nonstandard currency

            //     cost: new Decimal(3),
            //     unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            // },
        },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "h", description: "Reset for hands", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})

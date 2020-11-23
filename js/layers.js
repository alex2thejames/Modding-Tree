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
                description: "Gain 1 Pound every second.",
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
                description: "Digging speed is faster based on your unspent Hands.",
                cost: new Decimal(25),
                unlocked() { return (hasUpgrade(this.layer, 13))},
                effect() { 
                    let ret = player[this.layer].points.add(1).pow(player[this.layer].upgrades.includes(14)?0.75:0.5.upgrades.includes(14)?0.85:0.5) 
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
            22: {
                title: "More experience = faster digging",
                description: "Digging speed increased based on amount of pounds",
                cost: new Decimal(500),
                unlocked() { return (hasUpgrade(this.layer, 14))},
                effect() { 
                    let ret = player.points.add(1).log10().pow(0.75).add(1)
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            },
            23: {
                title: "Even more experience = even faster digging",
                description: "Previous upgrade is squared",
                cost: new Decimal(5000),
                unlocked() { return (hasUpgrade(this.layer, 22))},
            },
            24: {
                title: "Upgrade to machines",
                description: "Unlock a new layer",
                cost: new Decimal(10000),
                unlocked() { return (hasUpgrade(this.layer, 23))},
            },
        },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "h", description: "Reset for hands", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
addLayer("m", {
    name: "machines", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#484848",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "Machines", // Name of prestige currency
    baseResource: "Hands", // Name of resource prestige is based on
    baseAmount() {return player.h.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
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
            // 12: {
            //     title: "You do have two of them...",
            //     description: "Double Hand Gain",
            //     cost: new Decimal(3),
            //     unlocked() { return (hasUpgrade(this.layer, 11))},
            // },
            // 13: {
            //     title: "Power of Vishnu",
            //     description: "Double hand Gain",
            //     cost: new Decimal(10),
            //     unlocked() { return (hasUpgrade(this.layer, 12))},
            // },
            // 14: {
            //     title: "Hands * Hands?",
            //     description: "Digging speed is faster based on your unspent Hands.",
            //     cost: new Decimal(25),
            //     unlocked() { return (hasUpgrade(this.layer, 13))},
            //     effect() { 
            //         let ret = player[this.layer].points.add(1).pow(player[this.layer].upgrades.includes(14)?0.75:0.5.upgrades.includes(14)?0.85:0.5) 
            //         if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
            //         return ret;
            //     },
            //     effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            // },
            // 21: {
            //     title: "Get your room mates to help out",
            //     description: "Quadruple hand Gain",
            //     cost: new Decimal(250),
            //     unlocked() { return (hasUpgrade(this.layer, 14))},
            // },
            // 22: {
            //     title: "More experience = faster digging",
            //     description: "Digging speed increased based on amount of pounds",
            //     cost: new Decimal(500),
            //     unlocked() { return (hasUpgrade(this.layer, 14))},
            //     effect() { 
            //         let ret = player.points.add(1).log10().pow(0.75).add(1)
            //         return ret;
            //     },
            //     effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            // },
            // 23: {
            //     title: "Even more experience = even faster digging",
            //     description: "Previous upgrade is squared",
            //     cost: new Decimal(5000),
            //     unlocked() { return (hasUpgrade(this.layer, 22))},
            // },
            // 24: {
            //     title: "Upgrade to machines",
            //     description: "Unlock a new layer",
            //     cost: new Decimal(10000),
            //     unlocked() { return (hasUpgrade(this.layer, 23))},
            // },
        },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "Reset for machines", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){if (hasUpgrade("h", 24)){
        return true
    }
    else{
        return false
    }}
})

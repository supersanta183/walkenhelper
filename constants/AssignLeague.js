import * as leagues from "./PVPLeagues";

//const rarities = ["NONE", "COMMON", "UNCOMMON", "RARE", "EPIC", "LEGENDARY"]

const assignLeague = (level, rarity) => {
    switch (true) {
        case (level < 6):
            console.log("hej")
            return leagues.NOLEAGUE
            break;

        case (level < 8):
            if (rarity === "COMMON" || rarity === "UNCOMMON") {
                return leagues.LOWCUNC
            }
            if (rarity === "RARE") {
                return leagues.LOWRUNC
            }
            if (rarity === "EPIC" || rarity === "LEGENDARY") {
                return leagues.LOWEPIC
            }
            break;

        case (level < 10):
            if (rarity === "COMMON" || rarity === "UNCOMMON") {
                return leagues.MIDCUNC
            }
            if (rarity === "RARE") {
                return leagues.MIDRUNC
            }
            if (rarity === "EPIC" || rarity === "LEGENDARY") {
                return leagues.MIDEPIC
            }
            break;

        case (level < 12):
            if (rarity === "COMMON" || rarity === "UNCOMMON") {
                return leagues.HIGHCUNC
            }
            if (rarity === "RARE") {
                return leagues.HIGHRUNC
            }
            if (rarity === "EPIC" || rarity === "LEGENDARY") {
                return leagues.HIGHEPIC
            }
            break;

        case (level > 11):
            return leagues.NOLEAGUE
            break;

    }
}

export { assignLeague }
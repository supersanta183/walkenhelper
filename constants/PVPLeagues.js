// league tiers: low, mid, high, ultimate. Low is league IV, mid is league V, high is league VI, ultimate is league VII
// league categories: CUNC is the common/uncommon league, RUNC is the Rare/uncommon league, EPIC is the epic/legendary league.
// common and uncommon caths are by default categorized in CUNC, rare are categorized in RUNC, epic and legendary caths are categorized in the EPIC league.

//league boiler plate:
class LeagueInterface {
    entranceFee // number is in mysberries
    boostFee // number is in mysberries
    reward // number is in WLKN tokens
}

const NOLEAGUE = {
    entranceFee : 0,
    boostFee : 0,
    reward : 0,
}


//low tier leagues
const LOWCUNC = {
    entranceFee : 10,
    boostFee : 0,
    reward : 2,
}

const LOWRUNC = {
    entranceFee : 35,
    boostFee : 50, // boost fee might be wrong
    reward : 6,
}

const LOWEPIC = {
    entranceFee : 60,
    boostFee : 50, // boostfee might be wrong
    reward : 10,
}

//mid tier leagues
const MIDCUNC = {
    entranceFee : 25,
    boostFee : 0,
    reward : 5,
}

const MIDRUNC = {
    entranceFee : 88,
    boostFee : 50,
    reward : 15,
}

const MIDEPIC = {
    entranceFee : 150,
    boostFee : 50,
    reward : 25,
}

//High tier leagues
const HIGHCUNC = {
    entranceFee : 50,
    boostFee : 0,
    reward : 10,
}

const HIGHRUNC = {
    entranceFee : 175,
    boostFee : 50, // boostfee might be wrong
    reward : 30,
}

const HIGHEPIC = {
    entranceFee : 300,
    boostFee : 50, // boostfee might be wrong
    reward : 50,
}

//Ultimate tier leagues

//NOT YET KNOWN

export { LOWCUNC, LOWRUNC, LOWEPIC, MIDCUNC, MIDRUNC, MIDEPIC, HIGHCUNC, HIGHRUNC, HIGHEPIC, NOLEAGUE }
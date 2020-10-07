const { DEFAULT_DEGRADE_RATE, LOWEST_THRESHOLD } = require('./constants');

const BRIE_FILTER = {
    name: 'Aged Brie',
    qualityDegradeRates: [{ threshold: LOWEST_THRESHOLD, rate: -1 }],
}

const CONJURED_FILTER = {
    name: 'Conjured',
    qualityDegradeRates: [{ threshold: LOWEST_THRESHOLD, rate: 2 }]
}

const PASSES_FILTER = {
    name: 'Backstage passes',
    qualityDegradeRates: [{ threshold: 11, rate: 1 }, { threshold: 5, rate: -2 }, { threshold: 0, rate: -3 }],
}

const ITEM_FILTERS = [BRIE_FILTER, CONJURED_FILTER, PASSES_FILTER];

const findFilter = (item) => ITEM_FILTERS.find(f => item.name.toLowerCase().includes(f.name.toLowerCase()));

const findFilterDegradeRate = (filter, item) => {
    const degradeRate = filter.qualityDegradeRates.sort((a,b) => a.threshold < b.threshold).find(dr => item.sellIn > dr.threshold);
    return degradeRate ? degradeRate.rate : DEFAULT_DEGRADE_RATE;
}

module.exports = {
    findFilter,
    findFilterDegradeRate,
    PASSES_FILTER
}
const { MIN_QUALITY, MAX_QUALITY, DEFAULT_DEGRADE_RATE } = require('./constants');
const { findFilter, findFilterDegradeRate, PASSES_FILTER } = require('./filters');

class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }


  updateQuality() {
    return this.items.map((item) => {
      const filter = findFilter(item);
      let qualityDegradeRate = filter ? findFilterDegradeRate(filter, item) : DEFAULT_DEGRADE_RATE;
      
      if (!filter && item.sellIn < 0) qualityDegradeRate = DEFAULT_DEGRADE_RATE * 2;

      // Update item quality and subtract sellIn days
      const newItemQuality = item.quality - qualityDegradeRate;
      if ((newItemQuality > MIN_QUALITY) && (newItemQuality < MAX_QUALITY)) item.quality = newItemQuality;

      item.sellIn = item.sellIn - 1;

      // A backstage pass quality is 0 when concert is over
      // TODO: revise if this mechanic occurs more in next features and change or leave implementation (and delete todo)
      if (filter && filter.name == PASSES_FILTER.name && item.sellIn < 0) item.quality = 0;
       
      return item;
    })
  }
}

module.exports = {
  Item,
  Shop
}

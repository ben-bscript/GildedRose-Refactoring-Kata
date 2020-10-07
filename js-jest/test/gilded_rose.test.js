const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", () => {
  it('Should drop the quality by 1 per day in a regular scenario', () => {
    const gildedRose = new Shop([new Item('A shoelace', 20, 42)]);

    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toEqual(41);
  })

  it('Should decrement the sellIn days by 1 per day', () => {
    const gildedRose = new Shop([new Item('Another random item', 6, 28)]);

    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].sellIn).toEqual(5);
  });

  it('Should degrade the quality twice as fast when the sell by date has passed', () => {
    const gildedRose = new Shop([new Item('Another random item', -2, 28)]);

    const updatedItems = gildedRose.updateQuality();
  
    // Standard decay rate = 1, double is 2 so 28 - 2 => 26
    expect(updatedItems[0].quality).toEqual(26) 
  })

  it('Should let Aged Brie increase in quality as older as it gets', () => {
    const gildedRose = new Shop([new Item('Aged Brie', 20, 20)]);

    const updatedItems = [...Array(1000)].reduce((_prev, acc) => acc = gildedRose.updateQuality());

    expect(updatedItems[0].quality).toBeGreaterThan(20);
  })

  it('Should never let an item get a quality less than 0' , () => {
    const gildedRose = new Shop([new Item('Random item', 20, 20)]);

    const updatedItems = [...Array(1000)].reduce((_prev, acc) => acc = gildedRose.updateQuality());

    expect(updatedItems[0].quality).toBeGreaterThanOrEqual(0);
  })

  // This test is dependant on the 'Aged Brie' quality increasing mechanic
  it('Should never let the quality of an item reach more than 50', () => {
    const gildedRose = new Shop([new Item('Aged Brie', 10, 20)]);

    const updatedItems = [...Array(1000)].reduce((_prev, acc) => acc = gildedRose.updateQuality());

    expect(updatedItems[0].quality).toBeLessThanOrEqual(50);
  })

  it('Should never let Sulfuras decrease in quality', () => {
    const gildedRose = new Shop([new Item('Sulfuras', 10, 80)]);

    const updatedItems = [...Array(1000)].reduce((_prev, acc) => acc = gildedRose.updateQuality());

    expect(updatedItems[0].quality).toEqual(80);

  });

  it('Should let backstage passes quality drop to 0 when concert is over', () => {
    const gildedRose = new Shop([new Item('Backstage passes Maroon 5', 8, 40)]);

    const updatedItems = [...Array(20)].reduce((_prev, acc) => acc = gildedRose.updateQuality());

    expect(updatedItems[0].sellIn).toBeLessThanOrEqual(0);
    expect(updatedItems[0].quality).toEqual(0);
  })

  it('Should let conjured items degrade in quality twice as fast', () => {
    const gildedRose = new Shop([new Item('Conjured steak', 8, 40)]);

    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].quality).toEqual(38);
 
  });

});

export class Rewards {
    // Ints
    copper;
    silver;
    electrum;
    gold;
    platnium;

    // Array Of String
    itemsByActor;
    items;

    constructor(values) {
        this.copper = values?.copper ?? 0;
        this.silver = values?.silver ?? 0;
        this.electrum = values?.electrum ?? 0;
        this.gold = values?.gold ?? 0;
        this.platnium = values?.platnium ?? 0;
        this.itemsByActor = values?.itemsByActor ?? [];
        this.items = values?.items ?? [];
    }

    reset() {
        this.copper = 0;
        this.silver = 0;
        this.electrum = 0;
        this.gold = 0;
        this.platnium = 0;
        this.itemsByActor = [];
        this.items = [];
    }

    addSingleItem(itemUUID) {
        const thisItem = fromUuidSync(itemUUID);
        this.items.push({
            type: "item",
            uuid: itemUUID,
            name: thisItem.name,
            img: thisItem.img,
            value: thisItem.system.price,
            amount: 1
        });
    }

    removeSingleItemByIndex(index) {
        this.items.splice(index, 1);
    }

    addItemByActor(actorUUID) {

    }

    addCurrency(copper, silver, electrum, gold, platnium) {
        this.copper += copper;
        this.silver += silver;
        this.electrum += electrum;
        this.gold += gold;
        this.platnium += platnium;
    }
}

export class ItemsByActor {

    // String
    actorID;

    // array of string
    items;

    constructor() {

    }
}

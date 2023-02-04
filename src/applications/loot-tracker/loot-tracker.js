import { Rewards } from "../rewards/rewards.js";

export class LootTracker extends FormApplication {

    static instance = null;

    static activate() {
        if (!this.instance) {
            this.instance = new LootTracker();
        }

        if (!this.instance.rendered) {
            this.instance.render(true);
        } else {
            this.instance.bringToTop();
        }
    }

    static async refresh() {
        await this.instance?.render();
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["sheet"],
            height: 600,
            width: 350,
            resizable: true,
            editable: true,
            id: "combat-loot",
            template: "modules/combat-loot/src/applications/loot-tracker/loot-tracker.hbs",
            title: "combat-loot.tracker-title",
            scrollY: ['.loot-tracker-body'],
            userId: game.userId,
            closeOnSubmit: false,
            submitOnChange: false,
            dragDrop: [{ dragSelector: ".loot-tracker-items .item", dropSelector: ".loot-tracker-items" }]
        });
    }

    _onDragStart(event) {
        event.dataTransfer.setData("text/plain", JSON.stringify({
            type: "Reward",
            index: event.target.dataset.index
        }));
    }

    _onDrop(event) {

        let data;
        try {
            data = JSON.parse(event.dataTransfer.getData("text/plain"));
        } catch (err) {
            return false;
        }

        const rewards = game.settings.get("combat-loot", "rewards");

        if (data.type == "Item") {
            rewards.addSingleItem(data.uuid);
        }

        if (data.type == "Actor") {
            rewards.addItemByActor(data.uuid);
        }

        game.settings.set("combat-loot", "rewards", rewards)
    }



    getData(options) {
        const rewards = game.settings.get("combat-loot", "rewards");
        const items = rewards.items;
        
        return { items };
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.find('a[data-action="delete-single-loot"]').click(function(event) {
            const rewardElem = this.closest('.item');
            const index = rewardElem.dataset.index;

            const rewards = game.settings.get("combat-loot", "rewards");
            rewards.removeSingleItemByIndex(index);
            game.settings.set("combat-loot", "rewards", rewards)

        });

        html.find('a[data-action="show-item"]').click(function(event) {
            const item = game.items.get(this.dataset.uuid.replace("Item.", ""));
            item.sheet.render(true, { focus: true });
        });

        

    }

    async _updateObject(event, formData) {
        const rewards = game.settings.get("combat-loot", "rewards");

        rewards.reset();

        console.log(rewards);

        game.settings.set("combat-loot", "rewards", rewards);
        return;
    }
}
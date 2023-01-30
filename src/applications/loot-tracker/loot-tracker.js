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

    // static get defaultOptions() {
    //     return foundry.utils.mergeObject(super.defaultOptions, {
    //         classes: ["sheet"],
    //         height: 600,
    //         width: 350,
    //         resizable: true,
    //         editable: true,
    //         id: "combat-tracker",
    //         template: "modules/combat-loot/src/applications/tracker/tracker.hbs",
    //         title: "combat-loot.tracker-title",
    //         userId: game.userId,
    //         closeOnSubmit: false,
    //         submitOnChange: false
    //     });
    // }

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
            // scrollY: ['.xp-tally__reward-list'],
            userId: game.userId,
            closeOnSubmit: false,
            submitOnChange: false,
            // dragDrop: [{ dragSelector: ".xp-tally__reward-list .reward", dropSelector: ".xp-tally__reward-list" }]
        });
    }


    // getData(options) {
    //     return { TEST: "Test" };
    // }

    // activateListeners(html) {
    //     super.activateListeners(html);
    // }

    // async _updateObject(event, formData) {
    //     return;
    // }
}
import { setupSocket } from "./socket.js";
import { LootTracker } from "./applications/loot-tracker/loot-tracker.js";
import { Rewards } from "./applications/rewards/rewards.js";

Hooks.on("getSceneControlButtons", (controls) => {
    if (game.user.isGM) {
        const tokens = controls.find((c) => c.name === "token");
        if (tokens) {
            tokens.tools.push({
                name: "combat-loot",
                title: "combat-loot.tracker-title",
                icon: "fas fa-treasure-chest",
                visible: true,
                onClick: () => LootTracker.activate(),
                button: true
            });
        }
    }
});

Hooks.on("init", () => {

    game.settings.register("combat-loot", "rewards", {
        scope: "world",
        type: Rewards,
        default: new Rewards(),
        onChange: _ => {
            LootTracker.refresh();
        }
    });

})

Hooks.on("setup", () => {

    setupSocket();
});

Hooks.on("updateCombatant", (combatant, data) => {

    if (game.user.isGM && Object.keys(data).includes("defeated")) {
        const defeated = data.defeated;
        const tokenDoc = combatant.token;
        const actor = combatant.actor;

        if (!actor.hasPlayerOwner && actor.system.details.xp?.value) {
            if (!defeated) {
                // Tally.removeToken(tokenDoc);
            } else {
                // Tally.addToken(tokenDoc);
            }
        }
    }
});
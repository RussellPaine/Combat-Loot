import { setupSocket } from "./socket.js";
import { LootTracker } from "./applications/loot-tracker/loot-tracker.js";

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

Hooks.on("setup", () => {
    setupSocket();
});

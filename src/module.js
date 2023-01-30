
Hooks.on("getSceneControlButtons", (controls) => {
    if (game.user.isGM) {
        const tokens = controls.find((c) => c.name === "token");
        if (tokens) {
            tokens.tools.push({
                name: "combat-loot",
                title: "Combat Loot",
                icon: "fas fa-treasure-chest",
                visible: true,
                // onClick: () => XpTracker.activate(),
                button: true
            });
        }
    }
});

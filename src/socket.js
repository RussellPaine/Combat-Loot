
export let combatLootSocket = undefined;

export function setupSocket() {
    combatLootSocket = socketlib.registerModule("combat-loot");
    combatLootSocket.register("takeItem", takeItem);
    // combatLootSocket.register("floatXp", floatXp);
}

async function takeItem(actorUuid) {

}
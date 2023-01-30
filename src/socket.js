
export let combatLootSocket = undefined;

export function setupSocket() {
    combatLootSocket = socketlib.registerModule("combat-loot");
    // combatLootSocket.register("claimXp", claimXp);
    // combatLootSocket.register("floatXp", floatXp);
}
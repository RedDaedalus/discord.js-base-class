/** 
 * Represents a command
*/
class Command {
    /**
     * @param {CustomClient} client The client used in the command 
     * @param {Object} options The command's configuration
     */
    constructor(client, options) {
        /**
         * The client used in the command
         * @type {CustomClient}
         */
        this.client = client;
        /**
         * The command's information properties
         * @type {Object}
         */
        this.help = {
            name: options.name || null,
            description: options.description || "No information specified.",
            usage: options.usage || "",
            category: options.category || "Information"
        };
        /**
         * The command's configuration
         * @type {Object}
         */
        this.conf = {
            permLevel: options.permLevel || 0,
            permission: options.permission || "SEND_MESSAGES",
            cooldown: options.cooldown || 1000,
            aliases: options.aliases || [],
            allowDMs: options.allowDMs || false
        };
        /**
         * A set of the IDs of the users on cooldown
         * @type {Set}
         */
        this.cooldown = new Set();
    }

    /**
     * Puts a user on cooldown
     * @param {String} user The ID of the user to put on cooldown
     */
    startCooldown(user) {
        // Adds the user to the set
        this.cooldown.add(user);

        // Removes the user from the set after the cooldown is done
        setTimeout(() => {
            this.cooldown.remove(user);
        }, this.conf.cooldown);
    }
}

module.exports = Command;

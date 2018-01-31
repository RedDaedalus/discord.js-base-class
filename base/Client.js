const { Client, Collection } = require("discord.js");

/** 
 * Represents a Discord client
 * @extends Discord.Client
*/
class CustomClient extends Client {
    /**
     * @param {Object} options The options passed to the client
     * @param {Object} options.clientOptions The client options used by the original discord.js client
     * @param {Object} options.config The filepath to the config file 
     * @param {Object} options.perms The permission levels file
     */
    constructor(options) {
        // Initialise discord.js client with supplied client options
        super(options.clientOptions || {});

        /**
         * A collection of all of the bot's commands
         * @type {Discord.Collection}
         */
        this.commands = new Collection();
        /**
         * A collection of all of the bot's command aliases
         * @type {Discord.Collection}
         */
        this.aliases = new Collection();

        // Client variables
        /**
         * The bot's configuration - empty if no file was specified
         * @type {Object}
         */
        this.config = options.config ? require(`../${options.config}`) : {};
        /**
         * The bot's permission levels
         * @type {Object}
         */
        this.perms = options.perms ? require(`../${options.perms}`) : {};

        // Inform the user that the client has been initialised
        console.log(`Client initialised. You are using node ${process.version}.`);
    }

    /**
     * Logs the client in
     * @param {String} token The token used to log the client in 
     */
    login(token) {
        // Log super in with the specified token
        super.login(token);

        // Return this client to allow chaining of function calls
        return this;
    }
}

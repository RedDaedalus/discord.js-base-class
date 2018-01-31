const { Client, Collection } = require("discord.js");
const { readdir } = require("fs");

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

    /**
     * Loads all commands in the directory
     * @param {String} path The path where the commands are located
     */
    loadCommands(path) {
        readdir(path, (err, files) => {
            if (err) console.log(err);

            files.forEach(cmd => {
                const command = new (require(`../${path}/${cmd}`))(this);

                this.commands.set(command.help.name, command);

                command.conf.aliases.forEach(a => this.aliases.set(a, command.help.name));
            });
        });

        return this;
    }

    /**
     * Loads all events in the directory
     * @param {String} path The path where the events are located
     */
    loadEvents(path) {
        readdir(path, (err, files) => {
            if (err) console.log(err);

            files.forEach(evt => {
                const event = new (require(`../${path}/${evt}`))(this);

                super.on(evt.split(".")[0], (...args) => event.run(...args));
            });
        });

        return this;
    }
}

module.exports = CustomClient;

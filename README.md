# discord.js-base-class
A simple base class for discord.js bots.

# Setup
Almost everything is already set up, so getting started isn't very complicated. The current configuration is designed to have a config file named `config.json` with the `token` property set your bot's token. There currently isn't support for server by server configuration, but that is to be expected shortly.

# Creating commands
This is a simple example of a ping command's code. Put command files in the `commands` folder by default.
```js
// Import base command
const Base = require("../base/Command");

// Create a class for the command that extends the base command
```js
 class Ping extends Base {
  constructor(client) {
    // Initialise base command and pass data - all properties except name are optional
    super(client, {
      name: "ping",
      description: "Pings the bot.",
      usage: "", // Usage does not include the command - it is simply the arguments passed
      category: "Information",
      cooldown: 1000,
      aliases: ["pong"]
    });
  }
  
  run(message, args) {
    // Respond with the time between now and when the user sent their message
    super.respond(`Pong! Took ${Date.now() - message.createdAt}ms.`);
  }
}

// Export the class
module.exports = Ping;
```

# Registering events
There will register an event. Put events in the `events` folder by default. Events do not have a name property - the name will be fetched from the file name.
```js
// Create a class for the event
class Error {
  constructor(client) {
    this.client = client;
  }
  
  run(error) {
    console.log(`Websocket error:\n${error}`);
  }
}

// Export the class
module.exports = Error;
```

// Import custom client
const Client = require("./base/Client");

// Initialise client
const client = new Client({ config: "./config" });
// Login with config token
client.login(client.config.token);
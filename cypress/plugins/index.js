const admin = require('firebase-admin');
const cypressFirebasePlugin = require('cypress-firebase').plugin;
const dotenvPlugin = require('cypress-dotenv');

module.exports = (on, config) => {
  config = dotenvPlugin(config, {}, true);

  return cypressFirebasePlugin(on, config, admin);
};

const admin = require('firebase-admin');
const cypressFirebasePlugin = require('cypress-firebase').plugin;

module.exports = (on, config) => {
  return cypressFirebasePlugin(on, config, admin);
};

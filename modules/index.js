module.exports = function (bot) {
  const log = require("../log");

  // When the bot runs, the modules below are loaded (from this dir).
  const defaultModules = ["Status", "Reddit", "Vox", "Music", "RNG", "RandomText"];

  // Load the modules
  var loadedModules = {};
  for (var i = 0; i < defaultModules.length; i++) {
    let moduleName = defaultModules[i];
    log.info(`[MODULE] Loading ${moduleName}...`);

    let module = require(`./${moduleName}`);
    loadedModules[moduleName] = new module(bot);
  }

  return loadedModules;
};

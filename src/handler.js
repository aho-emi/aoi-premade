const { readdirSync } = require("fs");

class Handler {
  constructor(bot) {
    this.bot = bot;
    
  }

  loadFunctions(path) {
    const funcs = readdirSync(path);

    for (let func of funcs) {
      const f = func.split(".")[0];
      const o = require(`${path}/${func}`);

      try {
        this.bot.functionManager.createFunction({
          name: `$${f}`,
          type: "djs",
          code: o,
        });
      } catch (error) {
        console.error(`Error loading function ${f}: ${error}`);
      }
    }
  }

  loadFunctionsAoi(path) {
    const funcs = readdirSync(path);

    for (let func of funcs) {
      const f = func.split(".")[0];
      const o = require(`${path}/${func}`);

      try {
        this.bot.functionManager.createFunction(o);
      } catch (error) {
        console.error(`Error loading function ${f}: ${error}`);
      }
    }
  }

  loadCommands(path) {
    const validTypes = Object.getOwnPropertyNames(this.bot.cmd)

    const cmds = [];
    readdirSync(path+'/').map(x => !x.endsWith('.js') ? readdirSync(path+'/' + x).forEach(y => cmds.push(path+'/' + x + '/' + y)) : cmds.push(path+'/' + x));

    let startTime = Date.now();

    for (let cmd of cmds) {
      let c;
      try {
        c = require(cmd);
      } catch (e) {
        console.log(e);
        continue;
      }
      if (!c) return msg.push("");
      c = Array.isArray(c) ? c : [c];
      for (let command of c) {
        if (!("type" in command)) command.type = "default";
        const valid = validTypes.some((c) => c === command.type);

        if (!valid) return;

        try {
          this.bot.cmd.createCommand(command);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }

  
  loadMusicCommands(typ, path) {
    const validTypes = Object.getOwnPropertyNames(typ.cmds)

    const cmds = [];
    readdirSync(path+'/').map(x => !x.endsWith('.js') ? readdirSync(path+'/' + x).forEach(y => cmds.push(path+'/' + x + '/' + y)) : cmds.push(path+'/' + x));

    let startTime = Date.now();

    for (let cmd of cmds) {
      let c;
      try {
        c = require(cmd);
      } catch (e) {
        console.log(e);
        continue;
      }
      if (!c) return msg.push("");
      c = Array.isArray(c) ? c : [c];
      for (let command of c) {
        if (!("type" in command)) command.type = "default";
        const valid = validTypes.some((c) => c === command.type);

        if (!valid) return;

        try { typ.cmds.createCommand(command);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }

}

module.exports = { Handler };


class Premade {
    constructor(args) {
        this.args = args;
        if (!args.client) {
            console.log("Client not Found!");
            process.exit(0);
        }
    }

    load() {
        const bot = this.args.client;
        const client = this.args.client;

        // Extended Parser
        const { Util } = require("aoi.js");
        const { parse, createAst } = require("aoi.parser");
        const { parseEmbed, parseFiles } = require("aoi.parser/components");

        function myExtendedParser(msg) {
            const ast = createAst(msg);
            const data = parse(msg);
            let cardData;

            for (const child of ast.children) {
                const [name, value] = child.splits;

                if (name === "card") {
                    cardData = parseCardOptions(child);
                }
            }

            return { data: data.data, cardData: cardData, options: data.options };
        }

        function parseCardOptions(input) {
            const option = {};
            for (const child of input.children) {
                let [name, ...values] = child.splits;
                name = name.trim();

                if (name === "text") {
                    option.text = values.join(":");
                }
                if (name === "fontColor") {
                    option.fontColor = values.join(":");
                }
                if (name === "profileColor") {
                    option.profileColor = values.join(":");
                }
                if (name === "background") {
                    option.background = values.join(":");
                }
            }
            return option;
        }

        Util.parsers.ErrorHandler = myExtendedParser;



      
  // Load the functions
      const path = require('path')
  const { Handler } = require(path.join(__dirname, "..", "handler.js"));
  const customFuncPath = path.join(__dirname, "customFunctionJS");
  const handler = new Handler(bot);
  handler.loadFunctions(customFuncPath);

    }
}

module.exports = {
    Premade,
};

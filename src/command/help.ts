import { Command, CLAOptionDefinition } from "./command";
import commandLineUsage = require("command-line-usage");

export class Help implements Command {
  public name = "help";
  public description = "command help";
  public commands: Map<String, Command> = new Map();
  public args: CLAOptionDefinition[] = [
    {
      defaultOption: true,
      description: "The command to display help for",
      name: "command"
    }
  ];

  constructor(commands: Map<String, Command>) {
    this.commands = commands;
  }

  public generateCommandUsage(command: Command): any {

    const sections = [
      {
        content: `goze ${command.name} <options> `,
        header: "Usage"
      },
      {
        header: "Command Options",
        optionList: command.args
      }
    ];
    return sections;
  }

  public generateGeneralUsage(): commandLineUsage.CommandLineUsageInput {
    let tmp: any[] = [];
    this.commands.forEach((value) => {
      tmp.push({
        name: value.name,
        summary: value.description
      });
    });
    const sections = [
      {
        content: "This is a framework for generator node-cli tools",
        header: "Goze-cli"
      },
      {
        content: tmp,
        header: "Command-List"
      },
      {
        content:
          "Run `goze help <command>` for help with a specific command.",
        raw: true,
      }
    ];
    return sections;
  }

  public async run(options: any) {
    if (options.command === undefined) {
      this.showAll();
    } else if (this.commands.get(options.command)) {
      console.log(commandLineUsage(this.generateCommandUsage(this.commands.get(options.command))));
    } else {
      console.log("Unknow Command: ", options.command);
      this.showAll();
    }
  }

  public async showAll() {
    console.log(commandLineUsage(this.generateGeneralUsage()));
  }
}

import commandLineArgs = require("command-line-args");
import commandLineCommands = require("command-line-commands");
import { Command, ParsedCommand } from "./command/command";
import { Init } from "./command/init";
import { Help } from "./command/help";

export class Goze {
  public argvs: string[];
  public commands: Map<String, Command> = new Map();
  public commandDescriptors: any[] = [];

  constructor(argvs: string[]) {
    this.argvs = argvs;

    this.addCommand(new Init());
    this.addCommand(new Help(this.commands));
  }

  public addCommand(command: Command) {
    this.commands.set(command.name, command);
    this.commandDescriptors.push(
      command.name,
    );
  }

  public async run() {

    let cliCommand: ParsedCommand;
    try {
      cliCommand = <ParsedCommand>commandLineCommands(this.commandDescriptors);
    } catch (err) {
      console.log(err.message);
      this.commands.get("help").showAll();
      process.exit(1);
    }
    const commandName = cliCommand.command;
    const commandArgv = cliCommand.argv;
    const command = this.commands.get(commandName);

    let options: any;

    try {
      options = commandLineArgs(command.args, { argv: commandArgv });
    } catch (err) {
      console.log(err.message);
      process.exit(1);
      this.commands.get("help").showAll();
    }

    command.run(options);
  }
}

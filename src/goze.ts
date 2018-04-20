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
    this.commandDescriptors.push(command.name);
  }

  /**
   * @param msg Error and with attributes { name, message, command }
   */
  public handleError(msg: any): void {
    if (msg.command !== null) {
      console.log(msg.message);
    }
    this.commands.get("help").run({});
    process.exit(1);
  }

  public async run() {
    let cliCommand: ParsedCommand;
    try {
      cliCommand = <ParsedCommand>commandLineCommands(this.commandDescriptors);
    } catch (err) {
      this.handleError(err);
    }
    const commandName = cliCommand.command;
    const commandArgv = cliCommand.argv;
    const command = this.commands.get(commandName);

    let options: any;

    try {
      options = commandLineArgs(command.args, { argv: commandArgv });
    } catch (err) {
      this.handleError(err);
    }

    command.run(options);
  }
}

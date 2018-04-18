import * as commandLineArgs from "command-line-args";

export interface CLAOptionDefinition extends commandLineArgs.OptionDefinition { }
export interface CLAOptions extends commandLineArgs.Options { }

export interface Command {
  name: string;
  description: string;
  args: CLAOptionDefinition[];
  run(options: {[name: string]: string}): void;
}

export interface ParsedCommand {
  command: string;
  argv: string[];
}

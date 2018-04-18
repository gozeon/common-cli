import { Command, CLAOptionDefinition } from "./command";

export class Init implements Command {
  public name = "init";
  public description = "init project";

  public args: CLAOptionDefinition[] = [
    {
      alias: "n",
      description: "the new project name for init",
      name: "name",
      type: String
    }
  ];

  public async run(options: any) {
    console.log(options);
  }

}

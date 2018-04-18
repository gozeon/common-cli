import { Goze } from "./goze";

(async () => {
  new Goze(process.argv.slice(2)).run();
})();

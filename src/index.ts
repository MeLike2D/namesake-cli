import chalk from "chalk";
import chunk from "even-chunks";
import meow from "meow";
import namesake from "namesake";
import ora from "ora";
import table from "text-table"

const help = chalk`
    {bold Usage}: {yellow namesake} [word] [options]

    Generate a list of words that just so happen to also
    be available as npm package names.

    Optionally, you can use any word as input to find
    related words and terms.

  {bold Options}:

    -l, --limit   <n>  Limit the number of results returned (defaults to 50)
    -h, --help         Show this help message
    -v, --version      Output the {yellow namesake} version number
  \n
`

const { input, flags } = meow({
  description: false,
  help,
  flags: {
    limit: { alias: "l", type: "number", default: 50 },
    help: { alias: "h" },
    version: { alias: "v" }
  }
});

const word = input[0];
const text = chalk`🔍 Finding {bold {blue ${flags.limit}}} available package names${word ? chalk` related to {yellow '${word}'}.` : "..."}`;
const spinner = ora({ text, spinner: "dots", color: "magenta" }).start();

namesake(word, flags)
  .then((names) => {
    spinner.stop();

    const chunked = chunk(names, Math.floor(names.length / 3), chunk.PRIORITIZE_LAST);
    const header = word
      ? chalk`{bold Available package names related to {yellow '${word}'}}:\n`
      : chalk`{bold Available Package Names}:\n`

    console.log(`🥞 ${header}`)
    console.log(table(chunked));
  })

const { program } = require('commander')
const recipeController = require('./src/recipeController')

console.log('\x1b[36m%s\x1b[0m',
    " ____           _                _   _       _        _   _                  \n" +
    "|  _ \\ ___  ___(_)_ __   ___    | \\ | | ___ | |_ __ _| |_(_) ___  _ __  ___  \n" +
    "| |_) / _ \\/ __| | '_ \\ / _ \\   |  \\| |/ _ \\| __/ _` | __| |/ _ \\| '_ \\/ __| \n" +
    "|  _ <  __/ (__| | |_) |  __/   | |\\  | (_) | || (_| | |_| | (_) | | | \\__ \\ \n" +
    "|_| \\_\\___|\\___|_| .__/ \\___|   |_| \\_|\\___/ \\__\\__,_|\\__|_|\\___/|_| |_|___/ \n" +
    "                 |_|                                                        "
)

// presentation
program
    .name('Recipe Notations')
    .version('0.1.0')
    .description('A NodeJS CLI application to make annotations about your favorite recipe!')

program.command('create')
    .description('Make an annotation of chosen recipe, if the recipe not exists, a new one will be created.')
    .argument('<note>', 'The notation that will be saved.')
    .requiredOption('-r, --recipe <name>', 'Recipe name, if the recipe name contains space, enclose it in quotes.')
    .option('-d, --description <desc>', 'Optional short description to your recipe.')
    .action((note, options) => {
        // console.log(options);
        const desc = options.description ? options.description.trim() : null
        const recipe = options.recipe.trim()

        recipeController.create(recipe, desc, note)
            .then(res => {
                if (res.success) {
                    console.log('\x1b[32m%s\x1b[0m', '\n' + res.message + '\n');
                } else {
                    console.log('\x1b[31m%s\x1b[0m', '\n' + res.message + '\n')
                }
            })
    })

program.command('show')
    .description('Show the notations of all recipes or chosen recipe.')
    .option('-id, --id <val>', 'Optional identification of recipe.')
    .action((options) => {
        recipeController.show(options.id ?? null)
            .then(res => {
                if (!res.success) {
                    console.log('\x1b[31m%s\x1b[0m', '\n' + res.message + '\n')
                }
            })
    })

program.parse();
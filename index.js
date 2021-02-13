const { program } = require('commander')
const app = require('./app')

program.version('0.0.1')


const main = async () => {
  program.command('run <file>', { isDefault: true })
    .description('parses a JSON file of vulnerabilities and outputs a file with only the highest priority updates')
    .action(app)

  await program.parseAsync(process.argv)
}

main()
import chalk from 'chalk';

export default async (content, type = 'log') => {
  switch (type) {
    case 'log': console.log(chalk.cyan.bold.italic(content)); break;

    case 'heading': console.log(chalk.bold.inverse(content.toUpperCase())); break;

    case 'main': console.log(chalk.bold.bgRed.black(content.toUpperCase())); break;

    case 'line': console.log(chalk.italic.dim(content)); break;

    case 'title': console.log(chalk.bold.italic.black.bgCyan(content));
  }
}
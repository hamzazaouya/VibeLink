// logger.ts

import moment from 'moment';

type LogFunction = (message?: any, ...optionalParams: any[]) => void;

interface LogLevel {
  level: number;
  word: string;
  function: LogFunction;
}

export const log = (
  _level: number,
  _app: any, // Unused, but kept for compatibility
  _module?: string,
  _details?: string
): void => {

  const logging: LogLevel[] = [
    { level: 0, word: 'UNKNOWN', function: console.log },
    { level: 1, word: 'TRACE',   function: console.log },
    { level: 2, word: 'DEBUG',   function: console.debug },
    { level: 3, word: 'INFO',    function: console.info },
    { level: 4, word: 'WARN',    function: console.warn },
    { level: 5, word: 'ERROR',   function: console.error },
  ];

  const lvl = (_level >= 1 && _level <= 5) ? _level : 0;

  const moduleName = typeof _module === 'string' ? _module : '_unknown_';
  const details = typeof _details === 'string' ? _details : '_no_details_';

  const timestamp = moment().format('ddd MMM DD YYYY LTS');
  const msg = `${timestamp} | ${logging[lvl].word} | ${moduleName} | ${details}`;

  logging[lvl].function(msg);
};

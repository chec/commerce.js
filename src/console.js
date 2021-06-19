const consoleHelper = (color = 'black', a, b, c) => {
  let emoji;
  let isError = false;
  let messages;

  switch (color) {
    case 'success':
      color = '#488f5a';
      emoji = '✅   ';
      break;
    case 'info':
      color = 'DodgerBlue';
      emoji = '';
      break;
    case 'error':
      color = 'rgba(244, 67, 54, 1)';
      if (
        c.error.type === 'validation' ||
        c.error.type === 'unprocessable_entity'
      ) {
        emoji = '🚫 Validation/missing fields';
        a = '';
      } else {
        emoji = '❌ HTTP ERROR ';
      }
      isError = true;
      break;
    case 'warning':
      color = 'rgba(208, 154, 35, 1)';
      emoji = '⚠️  ';
  }

  if (isError === true) {
    console.log(
      '%c' + emoji + a,
      'color:' +
        color +
        ';display:block; width: 100%;padding:2px 2px 2px 0px;font-family: Open Sans, Helvetica, Sans-serif;font-weight:bold;background-color:rgba(244, 67, 54, 0.15);',
    );
    // 422 validation errors
    if (typeof c.error.errors === 'object') {
      messages = c.error.errors;
      Object.keys(messages).forEach((key, index) => {
        Object.values(messages[key]).forEach(value => {
          console.log(
            '%c' + key + ': %c' + value,
            'color:#515D6D;font-family: Open Sans, Helvetica, Sans-serif;font-weight:800;',
            'color:#515D6D;font-family: Open Sans, Helvetica, Sans-serif;font-weight:400;',
          );
        });
      });
      return;
    }

    return console.log(
      '%c' + c.error.message,
      'color:#515D6D;font-family: Open Sans, Helvetica, Sans-serif;font-weight:400;',
    );
  }

  if (typeof color === 'object') {
    console.log(
      '%c' + a,
      'color: PowderBlue;font-weight:bold;font-family: Open Sans, Helvetica, Sans-serif; background-color: RoyalBlue;',
    );
    console.log(color);
    return;
  }

  console.log(
    '%c' + emoji + a,
    'color:' +
      color +
      ';display:block;font-family: Open Sans, Helvetica, Sans-serif;line-height:28px; width: 100%;padding:2px 2px 2px 0px;font-weight:bold;',
  );
  if (b) {
    console.log(
      '%c' + b,
      'color:#515D6D;line-height:22px;font-weight:400; font-family: Open Sans, Helvetica, Sans-serif;',
    );
  }
};

const debuggerOnNotice = () => {
  // Do not run the console debugger notice when in CLI/node context
  if (typeof window === 'undefined') {
    return;
  }
  const ascii =
    '\r\n \r\n                           Che         EcC\r\n                         c....c2    2c....:C\r\n                       c........c2   2c.....:C\r\n                     c............c2   2c.....:C\r\n                   c................c2   2c.....:C\r\n                 c....................c2   2c.....:C\r\n               c........................c2   2c.....:C\r\n             c............................c2   2c.....:C\r\n           c.......:E2  2c..................c2   2c.....:C\r\n         c........h  $$   2c..................c2   2c.....:C\r\n       c.........:C  $cc$  E....................c2   2c.....:C\r\n     c............h    $$  c......................c2   2c.....:C\r\n   c...............:E    E:.........................c2   2c.....:C\r\n   E............................:C c..................h2   2c...:C\r\n     E........................:C     c..................h2   2hC\r\n       E....................:C         c..................h2\r\n         E................:C             c................:C\r\n           E............:C                 c............:C\r\n             E........:C                     c........:C\r\n               E....:C                         c....:C\r\n                 EcC                             EcC\r\n \r\n \r\n \r\n';

  console.log(
    '%c' + ascii,
    'font-family: Courier New, Courier, monospace; color: #788ba4; font-weight:bold; font-size: 11px;',
  );
  console.log(
    '%cCommerce.js console debugger is on!  🎉',
    'text-align:center; display:block; font-family: Open Sans, Helvetica, Sans-serif; color: #488f5a; line-height:28px; font-size: 14px',
  );
  console.log(
    '%c💬   Need some help? Join our Slack channel - http://slack.commercejs.com \r\n',
    'text-align:center; display:block; font-family: Open Sans, Helvetica, Sans-serif; color: #515D6D; line-height:20px; font-size: 12px',
  );
};

export { consoleHelper, debuggerOnNotice };

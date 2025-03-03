const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');
const chalkRainbow = require('chalk-rainbow')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const GoStumble = (auth) => new Promise((resolve, reject) => {

  fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/2', {
    method: 'GET',
    headers: {
      'authorization': auth
    }
  })
    .then(res => res.text())
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });

});

(async () => {

  console.log(chalkRainbow(`
───────────▄▄▄▄▄▄▄▄▄───────────
░██████╗░█████╗░███████╗███████╗
██╔════╝██╔══██╗██╔════╝██╔════╝
╚█████╗░███████║█████╗░░█████╗░░
░╚═══██╗██╔══██║██╔══╝░░██╔══╝░░
██████╔╝██║░░██║██║░░░░░███████╗
╚═════╝░╚═╝░░╚═╝╚═╝░░░░░╚══════╝
────────▄█████████████▄────────
█████──█████████████████──█████
▐████▌─▀███▄───────▄███▀─▐████▌
─█████▄──▀███▄───▄███▀──▄█████─
─▐██▀███▄──▀███▄███▀──▄███▀██▌─
──███▄▀███▄──▀███▀──▄███▀▄███──
──▐█▄▀█▄▀███─▄─▀─▄─███▀▄█▀▄█▌──
───███▄▀█▄██─██▄██─██▄█▀▄███───
────▀███▄▀██─█████─██▀▄███▀────
───█▄─▀█████─█████─█████▀─▄█───
───███────────███────────███───
───███▄────▄█─███─█▄────▄███───
───█████─▄███─███─███▄─█████───
───█████─████─███─████─█████───
───█████─████─███─████─█████───
───█████─████─███─████─█████───
───█████─████▄▄▄▄▄████─█████───
────▀███─█████████████─███▀────
──────▀█─███─▄▄▄▄▄─███─█▀──────
─────────▀█▌▐█████▌▐█▀─────────
────────────███████────────────


By : ${('LANA')}
`));

  const auth = rs.question(chalkRainbow('Token : '));
  console.log('');

  while (true) {

    const result = await GoStumble(auth);
    if (!result) {

      console.log(chalkRainbow(`\r[ ${moment().format('HH:mm:ss')} ] Auth Eror !`));

    } else if (result.includes('User')) {

      const data = JSON.parse(result);
      const username = data.User.Username;
      const country = data.User.Country;
      const trophy = data.User.SkillRating;
      const crown = data.User.Crowns;

      console.log(chalkRainbow(`\r
-  [${moment().format('HH:mm:ss')}]  -
>  ${(`Negara By Lana : ${country}`)}
>  ${(`Nama By Lana : ${username}`)}  
>  ${(`Piala By Lana : ${trophy}`)}  
>  ${(`Mahkota By Lana : ${crown}`)}
>  ${(`Status : Success !`)}`));
      await sleep(2000);

    } else if (result == 'BANNED') {
      console.log(chalk.bgRed(`Mampus Banned Makanya jangan brutal`));
      break;
    }
  }

})();


const api = () => {
const ccxt = require ('ccxt');
let sum = 0;
let i = 0;
let k = 0;
let coins = [];
let title = [];
let position = [];

(async function () {
    const exchangeId = 'binance'
        , exchangeClass = ccxt[exchangeId]
        , exchange = new exchangeClass ({
            'apiKey': process.env.KEY.toString(),
            'secret': process.env.SECRETKEY.toString(),
            'timeout': 30000,
            'enableRateLimit': true, // required! https://github.com/ccxt/ccxt/wiki/Manual#rate-limit
        })
        const key = 'ySuKhuOVLAC0WExO0UkaEXJzpDSWUYtNU0r69I8cCf25pZm5N7NHUUGMNaMfq92m';

    Object.entries((await exchange.fetchBalance()).total).forEach(item => {
      if (item[1] > 0) {
        const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

        const burl = "https://api.binance.com";

        let query = '/api/v1/ticker/24hr';

        query += `?symbol=${item[0]}USDT`;

        const url = burl + query;

        const ourRequest = new XMLHttpRequest();
        if (item[0] != 'USDT') {
        ourRequest.open('GET',url, true);

        ourRequest.onload = function(){
            const obj = JSON.parse(ourRequest.responseText);
            if (item[0] != 'USDT') {
              var mydiv = document.querySelector(".container5");

              var aTag5 = document.createElement('img');
              aTag5.setAttribute('src',`../../assets/${item[0]}.jpg`);

              var aTag = document.createElement('div');
              aTag.setAttribute('class',"item2");

              var aTag2 = document.createElement('h1');
              aTag2.setAttribute('class',"name-coin2");
              aTag2.innerHTML = item[0];

              var aTag3 = document.createElement('h1');
              aTag3.setAttribute('class',"value2");
              aTag3.innerHTML = `${Math.round(obj.lastPrice * 100) / 100}$`;

              var aTag4 = document.createElement('div');
              aTag4.setAttribute('class',"position2");
              aTag4.innerHTML = Math.round((item[1] * 100) / 100);

              aTag4.insertAdjacentHTML('beforeEnd', `<br>${Math.round((obj.lastPrice * item[1]) * 100) / 100}$`);

              title.push(item[0]);
              position.push(obj.lastPrice * item[1]);

              if (mydiv != null) {
                mydiv.appendChild(aTag);
                aTag.appendChild(aTag5);
                aTag.appendChild(aTag2);
                aTag.appendChild(aTag3);
                aTag.appendChild(aTag4);
              }

              sum += obj.lastPrice * item[1];
            }

            k += 1;
            if (mydiv != null) {
              document.querySelector(".total-value2").innerHTML = Math.round(sum * 100) / 100;
            }
        }
        ourRequest.send();
      }
      else {
        var mydiv = document.querySelector(".container5");

        var aTag5 = document.createElement('img');
        aTag5.setAttribute('src',`../../assets/${item[0]}.jpg`);

        var aTag = document.createElement('div');
        aTag.setAttribute('class',"item2");

        var aTag2 = document.createElement('h1');
        aTag2.setAttribute('class',"name-coin2");
        aTag2.innerHTML = item[0];

        var aTag3 = document.createElement('h1');
        aTag3.setAttribute('class',"value2");
        aTag3.innerHTML = `1$`;

        var aTag4 = document.createElement('div');
        aTag4.setAttribute('class',"position2");
        aTag4.innerHTML = Math.round((item[1] * 100) / 100);

        aTag4.insertAdjacentHTML('beforeEnd', `<br>${Math.round(item[1] * 100) / 100}$`);

        if (mydiv != null) {
          mydiv.appendChild(aTag);
          aTag.appendChild(aTag5);
          aTag.appendChild(aTag2);
          aTag.appendChild(aTag3);
          aTag.appendChild(aTag4);
        }
        sum += item[1];
      }
      }
    });
}) ();
  var myfigure = document.querySelector(".highcharts-figure");
  coins.push(title);
  coins.push(position);
  var aTag6 = document.createElement('div');
  aTag6.setAttribute('id',"container7");
  if (myfigure != null) {
    myfigure.appendChild(aTag6);
  }
  return coins;
}

export {api}

const ret_weekexp = JSON.parse(localStorage.getItem('percentage'));
const strekcount = JSON.parse(localStorage.getItem('streak'))
document.getElementById("streakc").innerText=`${strekcount}`
console.log(ret_weekexp);
for (var a = 0; a < 7; a++) {
    if (ret_weekexp[a] === null || ret_weekexp[a] === undefined) {
      ret_weekexp[a] = 0.0;
    }
  }  
document.getElementById('mon1').innerText = `${Math.round(ret_weekexp[1])}`;
document.getElementById('tue1').innerText = `${Math.round(ret_weekexp[2])}`;
document.getElementById('wed1').innerText = `${Math.round(ret_weekexp[3])}`;
document.getElementById('thu1').innerText = `${Math.round(ret_weekexp[4])}`;
document.getElementById('sun1').innerText = `${Math.round(ret_weekexp[0])}`;
document.getElementById('fri1').innerText = `${Math.round(ret_weekexp[5])}`;
document.getElementById('sat1').innerText = `${Math.round(ret_weekexp[6])}`;

   totalwork=JSON.parse(localStorage.getItem('totalwork'))
   console.log(totalwork)
   Numbr = (totalwork/3600)*10
   var coin = Math.floor(Numbr * 10000) / 10000;
   console.log(coin)
   document.getElementById("coininfo").innerText=coin


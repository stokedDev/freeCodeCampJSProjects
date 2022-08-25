function checkCashRegister(price, cash, cid) {
    // IP means "in pennies"
     const cashTypeIP = [
       ["PENNY", 1],
       ["NICKEL", 5],
       ["DIME", 10],
       ["QUARTER", 25],
       ["ONE", 100],
       ["FIVE", 500],
       ["TEN", 1000],
       ["TWENTY", 2000],
       ["ONE HUNDRED", 10000]
     ].reverse()
     const cashTypeIPObj = {}
     cashTypeIP.forEach(el => cashTypeIPObj[el[0]] = el[1])
     let status = '';
     let change = [];
     let changeIP = Math.round(cash * 100 - price * 100);
     const oChangeIP = changeIP;
     let cidIP = cid
     .map(el => [el[0],Math.round((el[1] * 100))]).reverse();
     cidIP.forEach((el, i) => {
       if(changeIP >= cashTypeIP[i][1]){
        while(changeIP > 0){
          change.push(cashTypeIP[i]);
          el[1] -= cashTypeIP[i][1];
          changeIP -= cashTypeIP[i][1];
          if(cashTypeIP[i][1] > changeIP || el[1] < 1){
            i += 1;
            break;
          }}}});
     const changeIndexZ = change.map(el => el[0])
     const countMoney = (arr, val) => arr
     .reduce((acc, el) => (el === val ? acc + 1 : acc), 0);
     const changeArrStrArr = changeIndexZ
     .map(el => [el, countMoney(changeIndexZ, el) * cashTypeIPObj[el]])
     .map(JSON.stringify)
     const uniqueArr = new Set(changeArrStrArr);
     change = Array.from(uniqueArr, JSON.parse);
    if(change.reduce((acc, el) => acc + el[1],0) !== oChangeIP){
      status = "INSUFFICIENT_FUNDS";
      change = [];
    }
    if(cid.reduce((acc, el) => acc + el[1] * 100,0) === oChangeIP){
      status = "CLOSED";
      change = cid;
    }
    if(change.reduce((acc, el) => acc + el[1],0) === oChangeIP 
    && cidIP.reduce((acc, el) => acc + el[1],0) > 0){
      status = "OPEN";
      change = change.map(el => [el[0], el[1]/100])
    }
    return {"status": status, "change": change}
   }

checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1], 
    ["QUARTER", 4.25],
    ["ONE", 90], 
    ["FIVE", 55], 
    ["TEN", 20], 
    ["TWENTY", 60], 
    ["ONE HUNDRED", 100]]) /* should return an object. */

checkCashRegister(19.5, 20, [
  ["PENNY", 1.01], 
  ["NICKEL", 2.05], 
  ["DIME", 3.1], 
  ["QUARTER", 4.25], 
  ["ONE", 90], 
  ["FIVE", 55], 
  ["TEN", 20], 
  ["TWENTY", 60], 
  ["ONE HUNDRED", 100]]) /* should return {status: "OPEN", change: [["QUARTER", 0.5]]}. */

checkCashRegister(3.26, 100, [
  ["PENNY", 1.01], 
  ["NICKEL", 2.05], 
  ["DIME", 3.1], 
  ["QUARTER", 4.25], 
  ["ONE", 90], 
  ["FIVE", 55], 
  ["TEN", 20], 
  ["TWENTY", 60], 
  ["ONE HUNDRED", 100]]) /* should return {status: "OPEN", change: [
  ["TWENTY", 60], 
["TEN", 20], 
["FIVE", 15], 
["ONE", 1], 
["QUARTER", 0.5], 
["DIME", 0.2], 
["PENNY", 0.04]]}.*/

checkCashRegister(19.5, 20, [
  ["PENNY", 0.01], 
  ["NICKEL", 0], 
  ["DIME", 0], 
  ["QUARTER", 0], 
  ["ONE", 0], 
  ["FIVE", 0], 
  ["TEN", 0], 
  ["TWENTY", 0], 
  ["ONE HUNDRED", 0]]) /* should return {status: "INSUFFICIENT_FUNDS", change: []}. */
checkCashRegister(19.5, 20, [
  ["PENNY", 0.01], 
  ["NICKEL", 0], 
  ["DIME", 0], 
  ["QUARTER", 0], 
  ["ONE", 1], 
  ["FIVE", 0], 
  ["TEN", 0], 
  ["TWENTY", 0], 
  ["ONE HUNDRED", 0]]) /* should return {status: "INSUFFICIENT_FUNDS", change: []}. */
checkCashRegister(19.5, 20, [
  ["PENNY", 0.5], 
  ["NICKEL", 0], 
  ["DIME", 0], 
  ["QUARTER", 0], 
  ["ONE", 0], 
  ["FIVE", 0], 
  ["TEN", 0], 
  ["TWENTY", 0], 
  ["ONE HUNDRED", 0]]) /* should return {status: "CLOSED", change: [
  ["PENNY", 0.5], 
["NICKEL", 0], 
["DIME", 0], 
["QUARTER", 0], 
["ONE", 0], 
["FIVE", 0], 
["TEN", 0], 
["TWENTY", 0], 
["ONE HUNDRED", 0]]}. */
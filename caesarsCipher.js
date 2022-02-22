function rot13(str) {
    const aToM = 'ABCDEFGHIJKLM';
    const nToZ = 'NOPQRSTUVWXYZ';
    let result = '';
    [...str].forEach(el => {
      if(aToM.indexOf(el) !== -1){
        result += nToZ[aToM.indexOf(el)];
      } else if(nToZ.indexOf(el) !== -1){
        result += aToM[nToZ.indexOf(el)];
      } else {
        result += el;
      }
    })
    return result;
  }
  
  rot13("SERR PBQR PNZC");
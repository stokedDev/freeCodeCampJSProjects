function palindrome(str) {
    const oneword = [...str.replace(/\s+|\W+|_/g, '').toLowerCase()];
    return oneword.join('') === oneword.reverse().join('');
  }
  
  palindrome("0_0 (: /-\ :) 0-0");
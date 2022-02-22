function palindrome(str) {
    let regex = /\s+|\W+|_/g
    let oneword = [...str.replace(regex, '').toLowerCase()];
    return oneword.join('') === oneword.reverse().join('')
  }
  
  palindrome("0_0 (: /-\ :) 0-0")
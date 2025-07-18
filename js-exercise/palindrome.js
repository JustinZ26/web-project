function isPalindrome(a){
    let len = a.length;
    let palindrome = true;
    
    for(let i = 0; i < len; i++){
        if(a[i] != a[len - (i +1 )]){
            palindrome = false;
            break;
        };
    };
    return palindrome;
};

console.log(isPalindrome("ala"));




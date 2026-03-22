// This is a ESM module file
// It defines some hidden variables and exports add function
const pi = 3.1415 ; // pi is hidden variable.

// add is exported function
export const add = (a,b) => a + b ;
export const area = (r) => pi * (r ** 2) ;

// mul is a private function, not exported.
const mul = (a,b) => a * b ;


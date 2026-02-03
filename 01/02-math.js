//ES Module
const pi = 3.1415

//Public Interface (exported)
export const add = (a,b) => a + b
export const area = r => pi * (r **2)

//Private
const mul = (a,b) => (a,b) => a*b;

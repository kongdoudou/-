const arr2 = [1,2, [3, 4, [5, 6, [7, 8]]]]
console.log(arr2.flat());
// [ 1, 2, 3, 4, [ 5, 6, [ 7, 8 ] ] ]
console.log(arr2.flat(1)); 
//同上
console.log(arr2.flat(2));
//[1, 2, 3, 4, 5, 6, [7, 8]];
console.log(arr2.flat(Infinity));
//[1, 2, 3, 4, 5, 6, 7, 8 ];


const arr1 = [1,2,3];
const obj = {};

let [a:obj[a]] = arr1;
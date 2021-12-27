let ary = [1,2,3,[1,2,3,4,[2,3,4]]];

function flatDeep(ary) {
    if(!Array.isArray(ary)) return;
    let stack = [...ary];
    let result = [];
    while(stack.length) {
        let val = stack.pop();
        Array.isArray(val) ? stack.push(...val) : result.push(val);
    }
    return result.reverse();
}

// 会修改数据类型
// function flatDeep(ary) {
//     if(!Array.isArray(ary)) return;
//     return [].toString.call(ary).split(',');
// }


// function flatDeep(ary) {
//     if(!Array.isArray(ary)) return;
//     return ary.reduce((prev, next) => {
//         if(Array.isArray(next)) {
//             return prev.concat(flatDeep(next));
//         } else {
//             return prev.concat(next);
//         }
//     }, [])
// }

console.log(flatDeep(ary));
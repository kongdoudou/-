let node = wideTraversal(node, (e) => e.phone == '1234');

class Node{
    constructor() {
        this.parent = null;
        this.children = [];
        this.phone = null;
    }
}

function wideTraversal(node, fn) {
    if(!(node instanceof Node)) return null;
    let ary = [node];
    let result = null;

    while(ary.length && !result) {
        // 当前的node节点
        let current = ary[0];
        // 判断当前节点与查询节点是否一致
        result = fn(current);
        if(result) {
            return current
        };
        // 获取当前节点的子节点
        let children = current.children;
        if(children) {
            ary.push(...children);
        }
        // 数组向后移动
        ary = ary.slice(1);
    }
    return null;
}
// 只能使用DOM level2 以下的API
function getElementsByTagName(tagName) {
    if(document.getElementsByTagName) {
        return document.getElementsByTagName(tagName);
    }
    let root = document.documentElement;
    let children = root.children;
    let result = [];

    function getChildren(children, tagName) {
        if (!children || !children.length) return result;
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (child.tagName.toLowerCase() == tagName) {
                result.push(child);
            }
            if (child && child.nodeType == 1) {
                getChildren(child.children, tagName)
            }
        }
    }

    getChildren(children, tagName);

    return result;
}
console.log(getElementsByTagName('img'));
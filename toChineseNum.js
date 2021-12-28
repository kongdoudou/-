// 写一个阿拉伯数字转中文的方法
toChineseNum(2345) //  二千三百四十五
toChineseNum(341205)//  三十四万一千二百零五
toChineseNum(340001200567)//  三千四百亿零一百二十万零五百六十七

toChineseNum(200010) // 二十万零一十

function toChineseNum(num) {
    num = num || 0;
    const unitAry = ['', '万','亿'];
    let numAry = num.toString().split(''); 
    // 分组去处理，四位一组
    let groupAry = group(numAry, 4);
    for(let i = 0; i < groupAry.length; i++) {
        let unit = unitAry[i];
        groupAry[i] = groupAry[i] + unit;
    }
    groupAry.reverse();
    let result = groupAry.join('');
    if(result[0] == '零') {
        result = result.slice(1);
    }
    console.log(result);
    return result;
}


// 将数组按照四个进行分组
function group(ary, number) {
    if(!Array.isArray(ary)) return;
    let result = [];
    let total = Math.ceil(ary.length / 4);
    let end = ary.length;
    for(let index = 0; index < total; index++) {
        let start = end - number > 0 ? end - number : 0;
        let newAry = ary.slice(start, end);
        let name = getName(newAry);
        result.push(name);
        end = start;
    }
    return result;
}

function getName(ary) {
    if(!Array.isArray(ary)) return;
    if(ary.length < 4) {
        for(let i=0;i<=4-ary.length;i++) {
            ary.unshift(0)
        }
    }
    let nameAry = ['零','一','二','三','四','五','六','七','八','九'];
    let unitAry = ['千','百','十',''];
    let result = '';
    ary.forEach((num, index) => {
        let current = num;
        // 个位数为0不需要处理
        if(index == ary.length - 1 && current == 0) {
            return;
        };
        num = nameAry[num];
        num += (unitAry[index] && current != 0) ? unitAry[index] : ''; 
        // 如果前一位为零且本次也为0，则不添加
        if(result[result.length - 1] != '零' || current != 0) {
            result += num;
        }
    })

    if(result[result.length - 1] == '零') {
        result = result.slice(0,result.length - 1);
    }
    return result;
}
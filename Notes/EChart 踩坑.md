## 一个典型的例子
```javascript
var prograssRate = echarts.init(document.getElementById('prograss-rate'),theme);
var dataStyle = {
    normal: {
        // 就是那个连出来一条线指向一个标签
        label: {show:false},
        labelLine: {show:false}
    }，
    emphasis : {
        color: 'rgba(30,144,255,1)'
    }
};
var placeHolderStyle = {
    normal : {
        color: 'rgba(30,144,255,1)',
        label: {show:false},
        labelLine: {show:false}
    },
    emphasis : {
        color: 'rgba(0,0,0,0)'
    }
};
prograssRateOption = {
    // 如饼图 的颜色，可以直接在这里指定，也可以在 itemStyle 中单独指定
    color:['#40C5B6','#B6A2DE','#DCDCDC','#3BAFDA'],
    title: {
        text: '70%',
        x: 'center',
        y: 'center',
        itemGap: 20,
        textStyle : {
            color : 'rgba(30,144,255,0.8)',
            fontFamily : '微软雅黑',
            fontSize : 35,
            fontWeight : 'bolder'
        }
    },
    series : [
        {
            type:'pie',
            // clockWise:true,
            radius : [90, 65],
            itemStyle : dataStyle,
            data:[
                {
                    value:70,
                    name:'70%'
                },
                {
                    value:30,
                    // name:'bububu',
                    itemStyle : placeHolderStyle
                }
            ]
        },
    ]
};
prograssRate.setOption(prograssRateOption);
```

```javascript
series:{
    itemStyle:{
        normal:{
        //正常状态的配置
            color: 'rgba(30,144,255,1)',
            label: {show:false},
            labelLine: {show:false}
        },
        emphasis:{
            // hover时候的配置
        }
    }
}
```
## color
`color` 可以在 `option` 中全盘指定，也可以也可以在 `itemStyle` 中单独指定


## legend
```javascript
legend: {
    orient: 'vertical',     //'horizontal' | 'vertical'
    x: 'right',
    y:'center',
    data: ['造价一', '造价二', '造价三', '造价四']
},
```

### formatter

{string}，模板（Template），其变量为：
- {a} | {a0}
- {b} | {b0}
- {c} | {c0}
- {d} | {d0} （部分图表类型无此项）
- 多值下则存在多套{a1}, {b1}, {c1}, {d1}, {a2}, {b2}, {c2}, {d2}, ...
- 其中变量a、b、c、d在不同图表类型下代表数据含义为：
    - 折线（区域）图、柱状（条形）图、K线图 : a（系列名称），b（类目值），c（数值）, d（无）
    - 散点图（气泡）图 : a（系列名称），b（数据名称），c（数值数组）, d（无）
    - 地图 : a（系列名称），b（区域名称），c（合并数值）, d（无）
    - 饼图、雷达图、仪表盘、漏斗图: a（系列名称），b（数据项名称），c（数值）, d（饼图：百分比 | 雷达图：指标名称）
    - 弦图 : a（系列名称），b（项1名称），c（项1-项2值），d（项2名称)， e(项2-项1值)
    - 力导向图 :
        - 节点 : a（类目名称），b（节点名称），c（节点值）
        - 边 : a（系列名称），b（源名称-目标名称），c（边权重）， d（如果为true的话则数据来源是边）

{Function}，传递参数列表如下：
- <Array> params : 数组内容同模板变量，[[a, b, c, d], [a1, b1, c1, d1], ...]
- <String> ticket : 异步回调标识
- <Function> callback : 异步回调，回调时需要两个参数，第一个为前面提到的ticket，第二个为填充内容html
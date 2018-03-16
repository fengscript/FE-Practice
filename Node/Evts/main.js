'use strict';
var evt = require('events');

var evtEmitter = new evt.EventEmitter()

var handle = function create() {
    console.log("创建事件")
    evtEmitter.emit("respond")
}

var respondEvt = function () {
    console.log("开启连接");
}

evtEmitter.on("createEvt",handle)
evtEmitter.on("respond",respondEvt)

// 也可以匿名绑定事件
evtEmitter.on("stop",() => {
    console.log("断开连接");
})

evtEmitter.emit("createEvt")
evtEmitter.emit("stop")


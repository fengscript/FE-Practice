/*
 * @Author: fyg 
 * @Date: 2018-12-06 14:53:08 
 * @Last Modified by: fyg
 * @Last Modified time: 2018-12-06 21:39:34
 */
// var add = require("./index");
// const expect = require('chai').expect;


// describe('测试index.js', function () {
//     describe('测试 add 函数', function () {
//         it('相加函数', () => {
//             if (add(1,2)!==3) {
//                 throw new Error("错误")
//             }
//         })
//     })
// })


// 全换成ES6写法
import add from './index';
import {assert} from 'chai';

describe('开始测试', () => {
    it('add 函数',() => {
        assert.equal(add(1,2),3)
    })
})
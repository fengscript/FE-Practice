/**
 * Book类，代表一个书本.
 * @constructor
 * @param {string} title - 书本的标题.
 * @param {string} author - 书本的作者.
 */
function Book(title, author) {
    this.title = title;
    this.author = author;
}
Book.prototype = {
    /**
     * 获取书本的标题
     * @returns {string|*}
     */
    getTitle: function () {
        return this.title;
    },
    /**
     * 设置书本的页数
     * @param pageNum {number} 页数
     */
    setPageNum: function (pageNum) {
        this.pageNum = pageNum;
    }
};


/**
 * npm install jsdoc -g
 * jsdoc xxx.js
 * 会生成一个 out 文件夹
 */
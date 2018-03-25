var fs = require('fs');


// open

var data = "this file is create by node to use fs.open"

fs.open("a.txt", "r+", (err, fd) => {
    if (err) {
        return console.error("error");
    }
    // console.log("文件打开成功");
    // console.log(fd);
})

// stats
fs.stat('a.txt', (err, stats) => {
    // console.log(stats);
    // console.log(stats.isFile());
})

// w 模式
fs.open("b.txt", "w", (err, fd) => {
    console.log("open w 模式创建 文件 " + fd);
    fs.unlink("b.txt", () => {
        console.log("unlink 文件 " + fd);
    })
})



/**
 *  read
 *  先open 再read 
 *  最后 close
 */
var buf = new Buffer(256);
console.log("先open");
var open = fs.open("a.txt", 'r+', (err, fd) => {
    if (err) {
        return console.error(err)
    }
    console.log("open成功，开始 read");
    fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
        if (err) {
            return console.error(err)
        }
        console.log("读取了：" + bytes + " bytes")

        // 输出
        if (bytes > 0) {
            console.log(buf.slice(0, bytes).toString())
        }

        // 关闭
        fs.close(fd, err => {
            if (err) {
                return console.error(err)
            }
            console.log("关闭文件");
        })
    })
})
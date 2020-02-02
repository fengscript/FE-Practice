# request

> 那是不是说 request 就比 SuperAgent 好呢？分情况。如果爬虫的数据在 document 里，用 request 可以明显加快爬虫效率；如果爬虫的数据是页面 AJAX 请求得到的，就需要等到页面加载完再爬虫，此时就需要 SuperAgent 了。
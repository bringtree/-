const request = require('request-promise');
const cheerio = require('cheerio');
var querystring = require('querystring');
var iconv = require('iconv-lite');

// 下面也有一个
// TextBox1输入账号 TextBox2输入密码
var info = {
  '__VIEWSTATE': 'dDwxMTE4MjQwNDc1Ozs+rmNp3epuZ8UHR4Au0OOL8z0PKMg=',
  'TextBox1': '201625010408',
  'TextBox2': 'XXXXXX',
  'RadioButtonList1': '%D1%A7%C9%FA',
  'Button1': '+%B5%C7+%C2%BC+'
}


var FormData = querystring.stringify(info);

var option = {uri: 'http://202.116.160.170/default4.aspx', method: 'GET', resolveWithFullResponse: true};

// TextBox1输入账号 TextBox2输入密码

// 用于请求登录
var optionsIndex = {
  uri: 'http://202.116.160.170/default4.aspx',
  method: 'POST',
  form: {
    '__VIEWSTATE': 'dDwxMTE4MjQwNDc1Ozs+rmNp3epuZ8UHR4Au0OOL8z0PKMg=',
    'TextBox1': '201625010408',
    'TextBox2': 'XXXXXXXX',
    'RadioButtonList1': '%D1%A7%C9%FA',
    'Button1': '+%B5%C7+%C2%BC+'
  },
  headers: {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Content-Length': FormData.length,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Host': '202.116.160.170',
    'Origin': 'http://202.116.160.170',
    'Referer': 'http://202.116.160.170/default4.aspx',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
  },
  'encoding': null

};

// 用于查看登录是否成功
var optionsClass = {
  uri: 'http://202.116.160.170/xs_main.aspx?xh='+info.TextBox1,
  method: 'GET',
  headers: {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, sdch',
    'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4',
    'Connection': 'keep-alive',
    'Host': '202.116.160.170',
    'Referer': 'http://202.116.160.170/xs_main.aspx?xh='+info.TextBox1,
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
  },
  'encoding': null
};


request(option)
  .then((res) => {
    optionsIndex.headers.Cookie = res.headers["set-cookie"].toString().match(/ASP.NET_SessionId=[0-9a-zA-Z]+/)[0];
    optionsClass.headers.Cookie = res.headers["set-cookie"].toString().match(/ASP.NET_SessionId=[0-9a-zA-Z]+/)[0];
  })
  .then(() => {
    request(optionsIndex)
      .then(data => iconv.decode(data, 'gbk'))
      .catch((e) => {})
      .then(() => {
        request(optionsClass)
          .then((data) => iconv.decode(data, 'gbk'))
          .then((data) => console.log(data))
      })
  })



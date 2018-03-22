# tuobacco_sign_spa

> 一个PC端显示微信签到用户头像到异形图像中的小demo，也是[vue-viewplus](https://www.npmjs.com/package/vue-viewplus)的一个示例；

+ 效果
![](https://ws4.sinaimg.cn/large/006tNbRwgy1fplgy6c2eug318g0l6kjl.gif)

+ 实现了排队和轮询来处理签到用户数据，基本实现了一个队列处理流程
+ 使用[zoomerang](https://www.npmjs.com/package/zoomerang)实现了在消化单个用户数据时候的头像动画，提一句，在寻找这种动画效果的时候发现，而且这个插件是Vue作者实现，真是很巧，我是vuer，哈哈
<!-- + 还计划使用[vue-animate]()完成抽奖的动画处理，但是时间原因没有继续 -->
+ 后台服务可能后续就会停了，下面是数据结构，需要测试效果的可以自己构建数据，其实就只需要微信返回的用户头像、用户id和递增的记录id：
```js
{
	"ReturnCode": "000000",
	"List": [{
		"createDatetime": 1521388579000,
		"headimgurl": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4036745268,760758102&fm=27&gp=0.jpg",
		"id": 1,
		"meetingId": 1,
		"meetingSessionsId": 1,
		"openId": "1",
		"realname": "",
		"username": "小红"
	},
	{
		"createDatetime": 1521498595000,
		"headimgurl": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3470587276,2545738327&fm=27&gp=0.jpg",
		"id": 16,
		"meetingId": 1,
		"meetingSessionsId": 1,
		"openId": "aaaaa",
		"realname": "dddddsaf",
		"sex": "1",
		"unionid": "ddddd",
		"username": "测试数据"
	}],
	"ReturnMessgae": ""
}
```
## 项目初始化 (基于vue-cli 3.0 bate 搭建)

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build

```


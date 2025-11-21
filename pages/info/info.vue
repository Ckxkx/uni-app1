<template>
	<!-- 修复：根节点必须唯一，将两个view包裹在一个根view中 -->
	<view class="content">
		<view class="title">{{title}}朱会琛</view>
		<view class="art-content">
			<rich-text class="richText" :nodes="strings"></rich-text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				title:'',
				strings:'',
			}
		},
		// 修复：生命周期函数名错误（onload → onLoad，首字母大写）
		onLoad:function(e){
			console.log('接收的参数：', e);
			uni.request({
				url: 'https://unidemo.dcloud.net.cn/api/news/36kr/'+e.newsid,
				method: 'GET',
				data: {},
				success: res => {
					console.log('接口返回数据：', res);
					// 修复：赋值错误（list.title → this.title）
					this.title = res.data.title;
					this.strings=res.data.content;
				},
				fail: (err) => {
					// 补充：错误提示
					console.error('请求失败：', err);
					uni.showToast({ title: '加载失败', icon: 'none' });
				},
				complete: () => {}
			});
		}
	}
</script>

<style>
	/* 修复：样式语法错误（%2 是无效语法，改为具体数值） */
	.content{
		padding: 10upx 2%; /* 修正百分比写法 */
		width: 96%;
		flex-wrap: wrap;
	}
	.title{
		line-height: 2em;
		font-weight: 700;
		font-size: 38upx;
	}
	.art-content{
		line: height 2pm;
		
	}
</style>
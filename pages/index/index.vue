<template>
	<view class="content">
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in news" :key="index
" @tap="openinfo" :data-newsid="item.post_id">
				<view class="uni-media-list">
					<image class="uni-media-list-logo" :src="item.cover || item.author_avatar || '/static/logo.png'"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.title}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{item.created_at}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				news:[]
			};
		},
		onLoad:function(){
			uni.showLoading({
				title:"加载中。。。。"
			})
			uni.request({
				url: 'https://unidemo.dcloud.net.cn/api/news',
				method: 'GET',
				data: {},
			success: res => {
					console.log(res);
					this.news = (res.data || []).map(item => ({...item, cover: ''}));
					this.loadCovers();
					uni.hideLoading();
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods:{
			openinfo(e){
				var newsid = e.currentTarget.dataset.newsid;
				// console.log(newsid);
			uni.navigateTo({
			url: '/pages/info/info?newsid=' + newsid
			});
			},
			// 拉取详情并提取首图作为封面
			loadCovers(){
				this.news.forEach((item, idx) => {
					uni.request({
						url: 'https://unidemo.dcloud.net.cn/api/news/36kr/' + item.post_id,
						method: 'GET',
						data: {},
						success: res => {
							const html = (res.data && res.data.content) ? res.data.content : '';
							const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
							if(match && match[1]){
								this.news[idx].cover = match[1];
							}
						},
						fail: () => {}
					});
				});
			}
		},
	}
</script>

<style>
.uni-media-list-body{height:auto}
.uni-media-list-text-top{line-height:1.6em}
</style>

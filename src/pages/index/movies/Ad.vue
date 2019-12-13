<template>
   <div class="ad">
		<div class="ad-logo">
			<img class="logo" alt="logo" src="//s0.meituan.net/bs/?f=myfe/canary:/asgard/images/avatar.png">
			<p>
				<b>猫眼</b>
				<span>在线选座，热门影讯，爱上看电影</span>
			</p>
		</div>
		<div class="btn-open-app">立即打开</div>
	</div>
</template>

<style lang="stylus">
  .ad{
		background-color: #fff;
		display: flex;
		border-bottom: 1px solid #e6e6e6;
		padding: 10px 15px;
		justify-content: space-between;
		align-items: center;
	}
	.ad-logo{
		display: flex;
	}
	.ad-logo img{
		margin-right: 5px;
		width: 44px;
		height: 44px;
	}
	.ad-logo p{
		display: flex;
		flex-direction: column;
	}
	.ad-logo p b{
		font-size: 17px;
		color: #222;
		line-height: 23px;
		font-weight: 100;
	}
	.ad-logo p span{
		font-size: 12px;
		color: #999;
	}
	.btn-open-app{
		width: 68px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background: #ef4238;
		border-radius: 3px;
		font-size: 13px;
		color: #fff;
	}
</style>
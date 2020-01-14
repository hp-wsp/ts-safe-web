<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<script>
	import storageHelper from './utils/storageHelper';
	export default {
		name: 'app',
		created(){
			let mToken = storageHelper.get('token');
			let userInfo = storageHelper.get('userInfo');
			this.$store.dispatch('setLogin',{userInfo:userInfo,token:mToken});
		}
	}
</script>

<style lang="less">
  html {box-sizing: border-box;height: 100%;}
	*, *:before, *:after {box-sizing: inherit;}
	body {
		position: relative;
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
		font-family: Verdana, Arial, Helvetica, sans-serif;
		font-size: 13px;
		color: #333;
		background-color: #f8fafc;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-overflow-scrolling: touch;
	}
	.app{
		position: relative;
		width: 100%;
		height: 100%;
	}
	
</style>

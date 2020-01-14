import BaiduMap from 'BaiduMap'

export function baiduSearch(params = {},mcity='上海市'){
	return new Promise((resolve, reject) => {
		let myGeo = new BaiduMap.Geocoder();
		myGeo.getPoint(params.search, function(point){
			if (point) {
				resolve(point);
			}else{
				reject('err');
			}
		}, mcity);
	});
}



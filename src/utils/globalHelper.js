let globalHelper = {
	formValidate(that,mName){
		return new Promise((resolve, reject) => {
			that.$refs[mName].validate((valid) => {
				if (valid) {
					resolve(true);
				} else {
					that.$message.error('请完善信息');
				}
			});
		});
	},
	checkPhone(rule, value, callback){
		if (!value) {
			return callback(new Error('手机号不能为空'));
		} else {
			const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
			if (reg.test(value)) {
				callback();
			} else {
				return callback(new Error('请输入正确的手机号'));
			}
		}
	},
	cityIdToName(mArr,mId){
		let mName = '';
		mArr.some((val)=>{
			if(mId === val.id){
				mName = val.name
				return true;
			}
		});
		return mName;
	}
}


export default globalHelper;

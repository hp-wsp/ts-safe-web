import moment from "moment";

let httpBaseURL = value => {
    if(value && value !== ''){
        var myType = value.substr(0, 5);
        if (myType != "http:" && myType != "wxfil" && myType != "https") {
            value = 'http://qiniu.boxslife.com/' + value;
        }
    }else{
        value = '';
    }
    return value;
}

let dateformat = (value,pattern = 'YYYY-MM-DD HH:mm:ss') => {
    if(value >0){
        return moment(value * 1000).format(pattern);
    }else{
        return '';
    }
}
export default {
    httpBaseURL,
    dateformat
}

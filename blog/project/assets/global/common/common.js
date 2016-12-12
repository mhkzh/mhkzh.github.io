//自定义获取url节点的值
String.prototype.getQuery = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = this.substr(this.indexOf("?") + 1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}; //url
var urlx = new String(window.location);

//服务地址
var apiUrl = "http://localhost:8000/";
var casUrl = "http://localhost:8080/";
var pName = "controller";	
//var pName = "dx_cms";
var cName = "cas";		

//打开窗口
function openWindow(url, title, width, height, id, flag) {
	var dg;
	dg = $.dialog({
		id: id,
		title: title,
		content: 'url:' + url,
		width: width,
		height: height,
		fixed: false,
		lock: true,
		drag: true,
		max: false,
		min: false,
		close: function() {
			if(success) loadData();
		},
		resize: false
	});

	//最大化窗口
	if (flag) dg.max();
}

//关闭窗口
function closeWindow() {
	var $dg = frameElement.api;
	$dg.close();	
}

//获取当前时间
function getCurrentTime() {
	var d = new Date();
	var text = '';
	text += d.getFullYear() + '-';
	text += ((d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) + '-';
	text += (d.getDate() < 10 ? "0" + d.getDate() : d.getDate());
	text += " ";
	text += (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) + ':';
	text += (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) + ':';
	text += (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
	return text;
}

//时间相减
function dateDiff(date1, date2) {
	var type1 = typeof date1,
		type2 = typeof date2;
	if (type1 == 'string')
		date1 = stringToTime(date1);
	else if (date1.getTime)
		date1 = date1.getTime();
	if (type2 == 'string')
		date2 = stringToTime(date2);
	else if (date2.getTime)
		date2 = date2.getTime();
	return (date1 - date2) / 1000; //结果是秒 
}

//字符串转成Time(dateDiff)所需方法 
function stringToTime(string) {
	var f = string.split(' ', 2);
	var d = (f[0] ? f[0] : '').split('-', 3);
	var t = (f[1] ? f[1] : '').split(':', 3);
	return (new Date(
		parseInt(d[0], 10) || null, (parseInt(d[1], 10) || 1) - 1,
		parseInt(d[2], 10) || null,
		parseInt(t[0], 10) || null,
		parseInt(t[1], 10) || null,
		parseInt(t[2], 10) || null
	)).getTime();
}

//获取时间
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getYear() + 1900;
    var m = ((dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1));
    var d = (dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate());

    return y + "-" + m + "-" + d;
}

function GetToken(){
	return getcookie("Token");
}

//根据登陆者获取Token
function GetTokenBylogin(){
	 //用户登录获取Token
 $.ajax({
        url : nismApiUrl+"v1/user/login",
        type : 'POST',
        data : JSON.stringify({"account":"pdf","password":"654321"}),
        dataType : 'json',
        success : function(sdata) {
            GetDataByToken(sdata.data.token);//根据token获取数据
        },
        error : function(error) {
            alert("error");
        }
        });
}

/*
 * 进度条
 */
//x,y 坐标,radius 半径,process 百分比,backColor 中心颜色, proColor 进度颜色, fontColor 中心文字颜色
function drawProcess(cName,h,w,x,y,radius) {
    $('canvas.'+cName).each(function() {
        var text = $(this).text();
        var process = text.substring(0, text.length-1);   
        var canvas = this;  
        var context = canvas.getContext('2d');  
        context.clearRect(0, 0, h, w);  
        context.beginPath();  
        context.moveTo(x, y);
        context.arc(x, y, radius, 0, Math.PI * 2, false);  
        context.closePath();  
        context.fillStyle = '#ddd';  
        context.fill();  
        context.beginPath();  
        context.moveTo(x, y);    
        context.arc(x, y,radius, 0, Math.PI * 2 * process / 100, false);  
        context.closePath();  
        context.fillStyle = '#2a2';  
        context.fill();   
        context.beginPath();  
        context.moveTo(x, y);  
        context.arc(x, y, radius*0.5, 0, Math.PI * 2, true);  
        context.closePath();  
        context.fillStyle = 'rgba(255,255,255,1)';  
        context.fill();  
        context.beginPath();  
        context.arc(x, y, (radius*0.4), 0, Math.PI * 2, true);  
        context.closePath();  
        context.strokeStyle = '#ddd';  
        context.stroke();  
        context.font = "bold 9pt Arial";  
        context.fillStyle = '#2a2';  
        context.textAlign = 'center';  
        context.textBaseline = 'middle';  
        context.moveTo(x, y);  
        context.fillText(text, x, y);  
    });
}

//关闭所有提示框
function clearAlert(){
	$("#myAlertSuccess").css('display','none'); 
	$("#myAlertWarn").css('display','none'); 
}

// 异常提示框
function warningAlert(val){
	//关闭成功提示框
	$("#myAlertSuccess").css('display','none'); 
	
	$("#myAlertWarn").css('display','block'); 
	$("#warningDesc").text(val);
}

// 成功提示框
function successAlert(val){
  	//关闭异常提示框
	$("#myAlertWarn").css('display','none'); 
	
	$("#myAlertSuccess").css('display','block'); 
	$("#successDesc").text(val);
}

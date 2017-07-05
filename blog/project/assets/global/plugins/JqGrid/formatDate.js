/**
* 格式化jqGrid列所显示的日期
* 作者：张浩
*/
        //格式化jqGrid日期
        function dateFormat(tm){
        	 var stime = new Date(tm); //时间
        	 var stimeMonth = stime.getMonth()+1;
        	 var stimeDay = stime.getDate();
        	 var stimeHours = stime.getHours();
        	 var stimeMinutes = stime.getMinutes();
        	 var stimeSeconds = stime.getSeconds();
        	    
        	 if(stimeMonth < 10){
        	  stimeMonth = "0" + stimeMonth;}
        	 if(stimeDay < 10){
        	  stimeDay = "0" + stimeDay;}
        	 if(stimeHours < 10){
        	  stimeHours = "0" + stimeHours;}
        	 if(stimeMinutes < 10){
        	  stimeMinutes = "0" + stimeMinutes;}
        	 if(stimeSeconds < 10){
        	  stimeSeconds = "0" + stimeSeconds;}
		return stime.getFullYear()+"-"+(stimeMonth)+"-"+ stimeDay+" "+stimeHours+":"+stimeMinutes+":"+stimeSeconds;
		}
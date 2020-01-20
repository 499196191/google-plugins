//监听浏览器插件界面传来的获取数据指令
chrome.runtime.onConnect.addListener(function(port) {
	console.log(port);


    if(port.name == 'test-connect') {
        port.onMessage.addListener(function(msg) {
			console.log('收到长连接消息：', msg);
            if(msg.question == '你是谁啊？') port.postMessage({answer: '我是你爸！'});
        });
	}

	if(port.name == 'test-copy') {
		var exampleInputEmail1 = $("#exampleInputEmail1").val(); 
		var exampleInputPassword1 = $("#exampleInputPassword1").val(); 
		var telType = $("input[type='radio']:checked").val(); 
		var vals = [];
		$('input:checkbox:checked').each(function (index, item) {
			vals.push($(this).val());
		});
		var caseType = vals;
		var xxxType = $("#xxxType").val(); 
		
		// 保存数据
		chrome.storage.local.set({exampleInputEmail1: exampleInputEmail1,exampleInputPassword1: exampleInputPassword1, telType: telType, caseType: caseType, xxxType: xxxType}, function(){
			console.log('保存成功！');
		});
	}
	
	if(port.name == 'test-paste') {
		//获取保存数据并赋值
		chrome.storage.local.get({exampleInputEmail1: '', exampleInputPassword1: '', telType: '', caseType: '', xxxType: ''}, function(items) {
			$("#exampleInputEmail1").val(items.exampleInputEmail1);
			$("#exampleInputPassword1").val(items.exampleInputPassword1);
			$("[name='telType'][value='"+ items.telType +"']").prop("checked", "checked");
			$.each(items.caseType,function(index,value){
				$(":checkbox[value='"+value+"']").prop("checked",true);
		   	});
			$("#xxxType").val(items.xxxType);
		});
	}
	

	chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (key in changes) {
          var storageChange = changes[key];
          console.log('存储键“%s”（位于“%s”命名空间中）已更改。' +
                          '原来的值为“%s”，新的值为“%s”。',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
        }
      });
});



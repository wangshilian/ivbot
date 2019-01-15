 AIUI.create("v2",  function(aiui,  err){
    requestObject = aiui.getRequest().getObject();
    // var http = require("http");
    var response = aiui.getResponse();
    // ��ȡ��ǰ��ͼ��
	intentName = requestObject.request.intents[0].name;
	console.log("������ͼ����:"+intentName);
	// ��ȡ��۶Ի�״̬
	dialogState= requestObject.request.dialogState;
 	if(dialogState!=null&&dialogState!="COMPLETED"){
		response.addDelegateDirective();
		aiui.commit();
	}else{
		//var value = getSlotValue(requestObject.request.intents[0].slots, "word");
		//var result_name = requestObject.request.intents[0].slots.word.name;
		//var result_value = requestObject.request.intents[0].slots.word.value;
		//console.log(result_name + " : " + result_value);

        wordIntroduceHandler();
		//response.setOutputSpeech("����һ�������ƺ����� answer " + result_value);
	}

	function getSlotValue(semanticSlots, slotName) {
		for (let i in semanticSlots) {
			slot = semanticSlots[i];
			if (slotName == slot.name) {
				return slot.value;
			}
		}
		return null;
	}


	function wordIntroduceHandler(){

		let word = getSlotValue(requestObject.request.intents[0].slots, "word");
		console.log("wordIntroduceHandler word" + word);
		if (word == null || word == "" || word == undefined) {
			response.setOutputSpeech("��˵�������ѯ�Ĵʻ㡣");
			aiui.commit();
		}

		var apiUrl = 'http://jsonplaceholder.typicode.com/todos/1';
		var options = {
			uri: apiUrl,
			method: 'GET',
			headers: {'User-Agent': 'Request-Promise'},
			json: true,
			timeout: 750
		};

		console.log("requestpromise " + apiUrl);
		var requestpromise = require("request-promise");
		requestpromise(options).then(function (resdata) {
			console.log(resdata);
			response.setOutputSpeech("get ");
			aiui.commit();
		}).catch(function (err) {
			console.log(err);
			response.setOutputSpeech('timeout');
			aiui.commit();
		});
	}

 })

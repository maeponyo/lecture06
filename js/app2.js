var INTERVAL = 1000;

var alarm = {
		duration: -1,
		message: ""
};

var formatCounterAsString = function(){
		return "あと" + alarm.duration + "秒";
};

var updateCounter = function(){
		alarm.output2.textContent = formatCounterAsString();
};

var showAlarmMessage = function(){
		var message = "終了";
		if(Notification.permission == "granted"){
				var notification = new Notification(message);
		}
		alarm.output2.textContent = message;
};

var showYoreiMessage = function(){
		var message2 = "予鈴です";
		if(Notification.permission == "granted"){
				var notification = new Notification(message2);
		}
	};

var update = function(){
		alarm.duration = alarm.duration - 1;
		alarm.yorei = alarm.yorei -1;
		if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}else{
				showAlarmMessage();
		}
		if(alarm.yorei == 0){
				showYoreiMessage();
		}
};

var isReadyToCountdown = function(){
		return Number.isInteger(alarm.duration) && alarm.duration > 0;
};

var setupAlarm = function(durationString, yorei){
		alarm.duration2 = Number(durationString),
		alarm.duration　= alarm.duration2 * 60;
		alarm.yorei2 = Number(yorei);
		alarm.yorei = alarm.yorei2 *60;
};

var startAlarm = function(){
		setupAlarm(alarm.durationSelect.value, alarm.yoreiInput.value);
		if(isReadyToCountdown()){
				updateCounter();
				window.setTimeout(update, INTERVAL);
		}
};

var initApp = function(){
		alarm.durationSelect = document.querySelector("#honrei");
		alarm.yoreiInput = document.querySelector("#yorei");
		alarm.output2 = document.querySelector("#countdown2");

		Notification.requestPermission(function(status){
				if(Notification.permission != status){
						Notification.permission = status;
				}
		});

		var startButton = document.getElementById("start2");
		startButton.addEventListener("click", startAlarm);
};

initApp();

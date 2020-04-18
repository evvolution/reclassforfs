/*
* note: 复学第一课控制
*/

var link = "http://server.foshanplus.com/";

$(document).ready(function() {
    initfullpage();
    // bindgetquestions()
    // bindsubmit()
});

function initfullpage(){
  $('#fullpage').fullpage({
    afterLoad: function () {
      $.fn.fullpage.setAllowScrolling(false, 'up');
    }
  });
}


function bindsubmit(){
    $.ajax({
		type: "post",
		async: false,
		url: link + 'fcheck',
		data: {'exam_id':'28','openid':'12313213232131231','answers':'{"1":"A,B,C","2":"B","3":"B","4":"A","5":"A,B,C","6":"A,B,C","7":"A,B,C","8":"A,B,C","9":"A,B,C","10":"A,B,C","11":"A,B,C","12":"B,C","13":"A,B","14":"A,B,C","15":"A,C","16":"B","17":"A,B,C,D","18":"A","19":"A","20":"A"}'},
		success: function(data){
            console.log(data);
		},
		error: function(){

		}
	});
}

function bindgetquestions(callBack){
    $.ajax({
        url: '../info/questions4.17.json',
        async: false,
        success: function (data) {
          if(callBack) {
            callBack(data);
          }
          
        }
    });
}
/*
* note: 复学第一课控制
*/

var link = "http://server.foshanplus.com/";
var dis = [];
var sch = [];
var pIndex = -1;
var disEle = document.getElementById("userdistrict");
var schEle = document.getElementById("userschool");

var userschool = "";
var username = "";

$(document).ready(function() {
  
    initfullpage();
    test()
    // bindgetquestions()
    bindgetschools();
    // bindsubmit()
});

function initfullpage(){
  $('#fullpage').fullpage({
    afterLoad: function () {
      $.fn.fullpage.setAllowScrolling(false, 'up');
      $.fn.fullpage.setAllowScrolling(false, 'down');
    }
  });
}


function test(){
  $(".xxx").click(function(){
    $.fn.fullpage.moveSectionDown();
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

function bindgetschools(){
  $.ajax({
      url: '../info/schools4.17.json',
      async: false,
      success: function (data) {

        dis = data.schools[0].district;
        sch = data.schools[0].managed;

        for (var i = 0; i < dis.length; i++) {
          //声明option.<option value="pres[i]">Pres[i]</option>
          var op = new Option(dis[i], i);
          //添加
          disEle.options.add(op);
        }
      }
  });
}
function chg(obj) {
    if (obj.value == -1) {
        var defaultx = '<option value="-1">-请选择学校-</option>';
        schEle.options.length = 0;
        $("#userschool").html(defaultx)
        return;
    }
    //获取值
    var val = obj.value;
    pIndex = obj.value;
    var cs = sch[val];
    schEle.options.length = 0;
    for (var i = 0; i < cs.length; i++) {
        var op = new Option(cs[i], i);
        schEle.options.add(op);
    }
}


function start(){
  userschool = $('#userschool option:selected').text();
  username = $('#username').val();
  if((userschool === "-请选择学校-") || (username === "")){
    alert("请填写个人信息");
    return;
  }else{
    $.fn.fullpage.moveSectionDown();
  }
}
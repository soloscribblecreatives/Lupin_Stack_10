/*Code by android developers start here*/
var startLoc = null;
//var contentName = '152';
//step 1:-
var contentName = parseInt(localStorage.getItem("currentbrand"));
var currentContentId  = parseInt(localStorage.getItem('currentcontent'));
//ends

checkClickThrough();

document.getElementById("main_content").addEventListener("touchmove", touchHandler, false);
document.getElementById("main_content").addEventListener("touchstart", touchHandler, false);
function touchHandler(e) {

	if (e.type == "touchstart") {

			 if( e.touches.length == 1 ) { // one finger touch
			 	var touch = e.touches[ 0 ];
			 	startLoc = { x : touch.pageX, y : touch.pageY };
			 }

			} else if (e.type == "touchmove") {
				if( startLoc ) {
					var touch = e.touches[ 0 ];

					if( Math.abs( startLoc.x - touch.pageX ) > Math.abs( startLoc.y - touch.pageY ) )
					{
						e.preventDefault();
					}
					startLoc = null;
				}

			}
		}
		/*Code by android developers ends here*/
		$(document).ready(function(){

			var ua = navigator.userAgent;
	//var event = "touchstart";
	var event = (ua.match(/Ipad/i)) ? "touchstart" : "click";


	$(".left_arrow").click(function(event) {
		go_nav('b');
	});

	$(".right_arrow").click(function(event) {
		go_nav('f');
	});

	$(".slides").click(function(){
		var slideNum =	$(this).index()+1;
		console.log(slideNum);
		open_page("",slideNum);

	});

	$(".reference").removeClass("active");

	$('.reference').on('swipeleft swiperight', function(event) {
		event.stopPropagation();
	});

	$(".box_btn").bind("click",function(){
		$(".reference").toggleClass("active");
	});

	currentSlide();

		$("#main_content").swipe({
	   swipeLeft:function(event, direction, distance, duration, fingerCount) {
		//alert("swipeleft");
		//myconsole("swipeleft");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		var last_page_id = $(".slides").length;
		var slide_jumper_open = $(".reference").hasClass("active");
		if(page_id == last_page_id+1)	{
			return
		} else{
			go_nav('f');
		}
	  },

	  swipeRight:function(event, direction, distance, duration, fingerCount) {
			//alert("swiperight");
		//myconsole("swiperight");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		var slide_jumper_open = $(".reference").hasClass("active");

		if(page_id == 0){
			//console.log("First Slide");
			//myconsole("First Slide");
			return
		} else {
			go_nav('b');
		}

	  } ,

        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:0
	});


});


function go_nav(direction) {
var page_id =  parseInt($("#wrapper").attr("rel"));
			
		
var flag=0;
if(direction == 'b') {


	if(page_id >= 0){
		page_id = page_id - 1;
		//alert(page_id);
		//console.log(page_id);
		if(page_id == 0){
            flag=2;
        }
	}
	 if(flag == 2){
        localStorage.setItem("gotoNextPrevBrand" ,2);//if one than next if 2 than prev
        //flag == 0;
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
	
		//window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    }else{
        localStorage.setItem("gotoNextPrevBrand" ,0);
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
	}
	
}else {
	

	if(page_id <= 1){
		page_id = page_id + 1;
		//alert(page_id);
		if(page_id == 2){
            flag=1;
        }
	}
	    if(flag == 1){
        localStorage.setItem("gotoNextPrevBrand" ,1);//if one than next if 2 than prev
         flag == 0;
		 var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };


	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
		 //window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    }else{
        localStorage.setItem("gotoNextPrevBrand" ,0);
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe
  
    }


}



$("#wrapper").attr("rel",page_id);

var content="";
if(flag==0){
var pg_content = set_pg_content(page_id);

	$("#main_content").html(pg_content);
}
	//console.log("pg : "+page_id);
	if(page_id==4){
		/* $(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		$(".box4").click(function(event) {
	 		open_page("",7)
	 	});
		$(".box5").click(function(event) {
	 		open_page("",8)
	 	});
		$(".box6").click(function(event) {
	 		open_page("",9)
	 	});
		$(".box7").click(function(event) {
	 		open_page("",10)
	 	});
		$(".box8").click(function(event) {
	 		open_page("",11)
	 	}); */
		
	}
	 checkClickThrough();
}

function set_pg_content(pg_id){
$(".reference").removeClass("active");
currentSlide();
var selectedContentPath='';
switch(pg_id){
	case 1:
	content='<div class="game"><div class="container"><div id="dice1" class="dice dice-one"><div id="dice-one-side-one" class="side one"><div class="dot one-1"></div></div><div id="dice-one-side-two" class="side two"><div class="dot two-1"></div><div class="dot two-2"></div></div><div id="dice-one-side-three" class="side three"><div class="dot three-1"></div><div class="dot three-2"></div><div class="dot three-3"></div></div><div id="dice-one-side-four" class="side four"><div class="dot four-1"></div><div class="dot four-2"></div><div class="dot four-3"></div><div class="dot four-4"></div></div><div id="dice-one-side-five" class="side five"><div class="dot five-1"></div><div class="dot five-2"></div><div class="dot five-3"></div><div class="dot five-4"></div><div class="dot five-5"></div></div><div id="dice-one-side-six" class="side six"><div class="dot six-1"></div><div class="dot six-2"></div><div class="dot six-3"></div><div class="dot six-4"></div><div class="dot six-5"></div><div class="dot six-6"></div></div></div></div><div id="roll" class="roll-button"><button onclick="myFunction(); console.log(diceOne);">Click Here To Play</button></div></div><script>\
	var elDiceOne = document.getElementById("dice1");\
	var elComeOut = document.getElementById("roll");\
	elComeOut.onclick   = function () {rollDice();};\
	function rollDice() {\
	var diceOne   = Math.floor((Math.random() * 6) + 1);\
	console.log(diceOne);\
	for (var i = 1; i <= 6; i++) {\
    elDiceOne.classList.remove("show-" + i);\
    if (diceOne === i) {\
      elDiceOne.classList.add("show-" + i);\
	  if (diceOne == 2) {\
		alert("Clicked");\
	  }\
    }\}\}';
	break;

}

return content;

}

function showDiv() {
   document.getElementById('welcomeDiv').style.display = "block";
}
function showDiv2() {
   document.getElementById('welcomeDiv2').style.display = "block";
}

function open_page(url,page_id){
	 //alert("===openpage====");
	localStorage.getItem('currentbrand');
    localStorage.getItem('currentcontent');
    localStorage.getItem('currentcontentbrandId');
    localStorage.getItem('current');
	localStorage.setItem("gotoNextPrevBrand" ,0);
	//alert("====currentbrand======"+localStorage.getItem('currentbrand'));
	//alert("====currentcontent======"+localStorage.getItem('currentcontent'));
	//alert("====currentcontentbrandId======"+localStorage.getItem('currentcontentbrandId'));
	//alert("====current======"+localStorage.getItem('current'));
	//alert("====previousslide======"+localStorage.getItem("previousslide"));
	//alert("====page_id======"+page_id);
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe

	 $("#wrapper").attr("rel",page_id);
	 var content="";
	 var pg_content = set_pg_content(page_id);

	 	$("#main_content").html(pg_content);

	 if(page_id==4){
		$(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		$(".box4").click(function(event) {
	 		open_page("",7)
	 	});
		$(".box5").click(function(event) {
	 		open_page("",8)
	 	});
		$(".box6").click(function(event) {
	 		open_page("",9)
	 	});
		$(".box7").click(function(event) {
	 		open_page("",10)
	 	});
		$(".box8").click(function(event) {
	 		open_page("",11)
	 	});
	 }
	  checkClickThrough();
	}

	function checkClickThrough(){
	var currentslide=localStorage.getItem("currentslide");
	//alert(currentslide);
	document.getElementById("click_through").innerHTML='';

	if(currentslide == 1){
	document.getElementById("click_through").innerHTML='';
		}
    if(currentslide == 2){
	document.getElementById("click_through").innerHTML='';
		}
	}

	function checkBtns(refNum){
		switch(refNum){
			case 1:
			open_page('',1);
            break;
		}
	}

	function currentSlide(){
		var curr_id =  parseInt($("#wrapper").attr("rel"));
		$(".slides").removeClass("active");
		$(".slides:nth-child("+curr_id+")").addClass("active");
	}

	var ln = 0;
	function myconsole(msg){

		var oldMsg = "</br>"+ln+". "+$("#myconsole").html();
		ln++
		$("#myconsole").html(msg+oldMsg);
	}

function currentTimeInDatabaseFormat(){//to get current time in dd-mm-yyyy hh:mm:ss
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
		month = parseInt(month)+1;
	if(month.toString().length==1){
		month="0"+month;
	}

	var date = new Date().getDate();
	if(date.toString().length==1){
		date="0"+date;
	}

	var hour = new Date().getHours();
	if(hour.toString().length==1){
		hour="0"+hour;
	}

	var minutes = new Date().getMinutes();
	if(minutes.toString().length==1){
		minutes="0"+minutes;
	}

	var seconds = new Date().getSeconds();
	if(seconds.toString().length==1){
		seconds="0"+seconds;
	}

	var duration= year+"-"+month+"-"+date+"-"+hour + ":" + minutes + ":" + seconds;
	return duration;
}

// new js

$(document).ready(function(){
	$('body').on('click','.touchbtn',function(){
		$('.right_arrow').trigger( "click" );
	})

	$(document).on('click','.btnshow',function(){
//alert('hi')
		$('.touchbtn').css("display","block");
	})
})


/*-------------------Javascript Dice Animation--------------------*/


var elDiceOne = document.getElementById("dice1");
var elComeOut = document.getElementById("roll");

elComeOut.onclick = function() {rollDice();};

function rollDice() {

  var diceOne = Math.floor((Math.random() * 6) + 1);
 
  console.log(diceOne);

  for (var i = 1; i <= 6; i++) {
    elDiceOne.classList.remove("show-" + i);
    if (diceOne === i) {
      elDiceOne.classList.add("show-" + i);
	  
	  if (diceOne == 2) {
		alert("Clicked");
	  }
	  
    }
  }
}
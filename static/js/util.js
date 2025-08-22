//--v 모든 팝업을 위한 focus 이동 스크립트 --------------------------------------------
var $target;
function openPop(id){
	$target = document.getElementById(id);
    if (!$target) return;
	
	$target.style.display='block';
	$target.setAttribute('tabindex','0');
	$target.focus();
	document.body.style.overflowY='hidden';
}
//--^ 모든 팝업을 위한 focus 이동 스크립트 --------------------------------------------

$(document).ready(function () {

	// 모든 팝업 닫기
	var openPopups = []; // 열린 팝업 목록을 관리할 배열 추가
	$('.layer-pop').on('click','.btn_close',function () {
		var $popup = $(this).parents('.layer-pop');
		$popup.hide();
		$('body').css({ overflowY: 'auto' });

		var index = openPopups.indexOf($popup[0]);
		if (index !== -1) {
			openPopups.splice(index, 1); // 열린 팝업 목록에서 제거
		}

		var $lastFocusedPopup = openPopups[openPopups.length - 1];
		if ($lastFocusedPopup) {
			$lastFocusedPopup.focus();
		} else {
			$("button").each(function (index, item) {
				var onClickStr = $(item).attr("onclick");
				if (onClickStr !== undefined && onClickStr.indexOf($popup[0].id) !== -1) {
					$(item).focus();
				}
			});
		}
	});
	
	// 윈도우 팝업 닫기
	$('.layer-pop .close2').click(function(){
		window.open('','_self').close();
	});

	//---------v PC GNB 메뉴 동작
    // 마우스가 메뉴에 진입하거나 포커스가 들어오면 실행
    $('#gnb .menu-list > li').on("mouseenter focusin", function(){
        $('#gnb .menu-list').addClass('on');
    });

    // 마우스가 메뉴를 떠나거나 포커스가 해당 요소에서 벗어나면 실행
    $('#gnb .menu-list > li').on("mouseleave", function(){
        $('#gnb .menu-list').removeClass('on');
    });
	
	$('#gnb .menu-list > li:last .gnb-sub-menu li:last').on("keydown",function(e){
		if (e.keyCode === 9 && !e.shiftKey) { // Tab 키를 누를 때
            // Shift 키를 누르지 않은 경우에만 메뉴를 숨김 처리
            $('#gnb .menu-list').removeClass('on');
        }
	});
	//---------^ PC GNB 메뉴 동작

	//---------v 모바일 GNB 메뉴 동작
	$('header .btn_menu').click(function(){
		$('#gnb').show();
		$('body').css({overflowY:"hidden"});
	});
	$('#gnb .btn_close').click(function(){
		$('#gnb').hide();
		$('body').css({overflowY:"auto"});
		$('header .btn_menu').focus();
	});
	//---------^ 모바일 GNB 메뉴 동작

	// TOP버튼
	$(window).scroll(function() {
		if ($(this).scrollTop() > 250) { //250 넘으면 버튼이 보여짐니다. 
			$('footer .btn_top').css({opacity: 1});
		} else {
			$('footer .btn_top').css({opacity: 0});
		}
	});

	//---------v QNA 게시판
	$('.table.qna li').on('click',function(){
		$(this).toggleClass('on').find('.content').toggle();
	});
	//---------^ QNA 게시판

	
	//--v 달력 -----------------------------------------------------
	let today = new Date();
	// 연도 변경하는 좌우 arrow 버튼 함수
	var changeYearButtons = function() {
		setTimeout(function() {
			var widget = $(this).datepicker("widget");
			var widgetHeader = widget.find(".ui-datepicker-header");
			var inputDate = $(this);
			
			var prevYrBtn = $('<button class="PrevYr"></button>');
			prevYrBtn.bind("click", function() {
				var currentDate = inputDate.datepicker("getDate");
				var currentYear = currentDate ? currentDate.getFullYear() : new Date().getFullYear();
				var newDate = new Date(currentYear - 1, currentDate ? currentDate.getMonth() : new Date().getMonth(), currentDate ? currentDate.getDate() : new Date().getDate());
				inputDate.datepicker("setDate", newDate);

			});
			
			var nextYrBtn = $('<button class="NextYr"></button>');
			nextYrBtn.bind("click", function() {
				var currentDate = inputDate.datepicker("getDate");
				var currentYear = currentDate ? currentDate.getFullYear() : new Date().getFullYear();
				var newDate = new Date(currentYear + 1, currentDate ? currentDate.getMonth() : new Date().getMonth(), currentDate ? currentDate.getDate() : new Date().getDate());
				inputDate.datepicker("setDate", newDate);
			});
			
			prevYrBtn.prependTo(widgetHeader);
			nextYrBtn.appendTo(widgetHeader);
		}.bind(this), 1);
	};

	// 달력 기본 옵션
	$(".datepicker").datepicker({
		todayHighlight: true,
		dateFormat: "yy.mm.dd",
		monthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
		changeMonth: false, // 연도 셀렉트 선택 미사용
		beforeShow: function(input, inst) {
			changeYearButtons.call(input); // 현재 캘린더에 대한 changeYearButtons 호출
			// console.log(inst.selectedMonth);
			// console.log(inst.drawMonth);
		},
		onChangeMonthYear: function(year, month, inst) {
			changeYearButtons.call(inst.input); // 현재 캘린더에 대한 changeYearButtons 호출
		}
	});
	
	var dateFormat = "yy.mm.dd",
	from = $(".from").datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		numberOfMonths: 1, //보여지는 달력 갯수
		dateFormat: "yy.mm.dd",
		monthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
		// minDate: -20, maxDate: "+1M +10D", // 최소날짜, 최대날짜 설정시
		changeMonth: false, // 연도 셀렉트 선택 미사용
		beforeShow: function(input, inst) {
			changeYearButtons.call(input); // 현재 캘린더에 대한 changeYearButtons 호출
			// console.log(inst.selectedMonth);
			// console.log(inst.drawMonth);
		},
		onChangeMonthYear: function(year, month, inst) {
			changeYearButtons.call(inst.input); // 현재 캘린더에 대한 changeYearButtons 호출
		}
	}),
	to = $(".to").datepicker({
		defaultDate: "+1w",
		changeMonth: true,
		numberOfMonths: 1, //보여지는 달력 갯수
		dateFormat: "yy.mm.dd",
		monthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
		dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
		// minDate: -20, maxDate: "+1M +10D", // 최소날짜, 최대날짜 설정시
		changeMonth: false, // 연도 셀렉트 선택 미사용
		beforeShow: function(input, inst) {
			changeYearButtons.call(input); // 현재 캘린더에 대한 changeYearButtons 호출
			// console.log(inst.selectedMonth);
			// console.log(inst.drawMonth);
		},
		onChangeMonthYear: function(year, month, inst) {
			changeYearButtons.call(inst.input); // 현재 캘린더에 대한 changeYearButtons 호출
		}
	});

	function getDate(element) {
		var date;
		try {
			date = $.datepicker.parseDate(dateFormat, element.value);
		} catch (error) {
			date = null;
		}
		return date;
	}

	//--^ 달력 -----------------------------------------------------
	

	//--v ETC -----------------------------------------------------
	// input && textarea : 입력글자 수 제한
	$('.byte-limit').on('input', function() {
		var maxBytes = parseInt($(this).data('maxbytes'));
		var currentBytes = new TextEncoder().encode($(this).val()).length;

		// 현재 byte 수 표시
		$(this).siblings('.unit').find('.now').text(currentBytes);

		if (currentBytes > maxBytes) {
			// 입력이 최대 byte를 초과하면 자르기
			var truncatedValue = new TextDecoder().decode(new Uint8Array(new TextEncoder().encode($(this).val()).slice(0, maxBytes)));
			$(this).val(truncatedValue);
			currentBytes = maxBytes;
		}

		// 남은 byte 수 업데이트
		// var remainingBytes = maxBytes - currentBytes;
		// $(this).siblings('.unit').find('.remaining').text(remainingBytes);
	});

	// input && textarea : 페이지 로드 시 초기 byte 수 표시
	$('.byte-limit').each(function() {
		var maxBytes = parseInt($(this).data('maxbytes'));
		var currentBytes = new TextEncoder().encode($(this).val()).length || 0; // Default to 0 if no text is present
		$(this).siblings('.unit').find('.now').text(currentBytes);
	});

	//--^ ETC -----------------------------------------------------
	
});

document.body.classList.toggle(
  'supports-custom-select', 
  CSS.supports("appearance: base-select")
)

colorspace.oninput = e => {
  console.log(colorspace.value)
}


//--v 날짜 관련 함수 -----------------------------------------------------------------
	
	/**
	 * Date.dateAdd() 멤버함수 추가.
	 * 초/분/시간/일 +/- 연산 제공. 월/년은 추가 개발 필요
	 * @param {String} interval - s/n/h/d
	 * @param {Number} value - +/- 할 값
	 * @returns {Date}
	 */
	Date.prototype.dateAdd = function (interval, value) {
		let dateReturn = new Date(this);
		switch (interval) {
			case "d": // 일
				dateReturn.setTime(dateReturn.getTime() + value * 1000 * 60 * 60 * 24);
				break;
				break;
			case "ww": // 주
				dateReturn.setTime(dateReturn.getTime() + value * 1000 * 60 * 60 * 24 * 7);
				break;
				break;
		}
		return dateReturn;
	};
	/**
	 * periodCode에 따른 기간 입력창 set
	 * @param periodCode {String} periodCode
	 * @param $inputS {} 시작일 입력창
	 * @param $inputE {} 종료일 입력창
	 */
	function setInputPeriod(button, periodCode, $inputS, $inputE) {
		let periodResult = calcDates(periodCode);
	
		if (typeof $inputS === "undefined" && typeof $inputE === "undefined") {
			let $inputS = $(button).parents(".input_period_wrap").find(".from");
			let $inputE = $(button).parents(".input_period_wrap").find(".to");
	
			if ($.fn.datepicker) {
				$inputS.datepicker("setDate", periodResult.dateS); //console.log( $inputS.val() );
				$inputE.datepicker("setDate", periodResult.dateE); //console.log( $inputE.val() );
			}
		} else {
			if ($.fn.datepicker) {
				$inputS.datepicker("setDate", periodResult.dateS); //console.log( $inputS.val() );
				$inputE.datepicker("setDate", periodResult.dateE); //console.log( $inputE.val() );
			}
		}
	}

	/**
	 * 기간 코드에 따라 시작일, 종료일 계산
	 * @param periodCode {String} 기간 코드
	 * @returns { dateS, dateE } : 시작일, 종료일
	 */
	function calcDates(periodCode) {
		let today = new Date(); // 오늘
		let weekday; // 계산용
		let dateS = new Date();
		let dateE = new Date(); // return용 - 시작일, 종료일

		switch (periodCode) {
			case "d0": //오늘
				// dateS = today;
				break;
			case "d-1": //어제
				dateS = today.dateAdd("d", -1); // 어제부터
				break;
			case "d+1": //내일까지
				dateE = today.dateAdd("d", 1);
				break;
			case "d-3": //최근 3일
				dateS = today.dateAdd("d", -2);
				break;
			case "d-7": //최근 7일
				dateS = today.dateAdd("d", -6);
				break;
			case "d-30": //최근 30일
				dateS = today.dateAdd("d", -30);
				break;
			case "lm-1": //최근1개월
				dateS = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate() + 1);
				break;
			case "lm-3": //최근1개월
				dateS = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
				break;
		}
		//	console.log( dateS, dateE );
		return { dateS: dateS, dateE: dateE };
	}
//--^ 날짜 관련 함수 -----------------------------------------------------------------
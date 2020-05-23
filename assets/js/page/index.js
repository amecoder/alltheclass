$(function() {

	var screen = {

		/**
		 * 내부 전역변수
		 *
		 * @memberOf screen
		 */
		v: {
			$tempLbl: null,
			week: 0,
			weekDt: '',
			searchDt: '',
			natiSeq: '',
		},

		/**
		 * 통신 객체- call
		 *
		 * @memberOf screen
		 */
		c: {

			/**
			 * 파티 주차 리스트 조회
			 *
			 * @memberOf screen.c
			 */
			getFrontWeekList: function() {

				var options = {

					url : "/selectList",
					data : {
						queryId: 'getFrontWeekList',
						natiSeq: screen.v.natiSeq,
						toDay: $sDateUtil.getToday('-'),
					},
					success : function(data) {

						if(!!data.rows) {

							var item, initWeek = false, onClass, $li;
							var toMonth = $sDateUtil.getToday('').substring(4, 6);
							var weekCnt = $sDateUtil.getToday('').substring(6, 8) % 7 === 0 ?
									Math.floor($sDateUtil.getToday('').substring(6, 8) / 7) : Math.floor($sDateUtil.getToday('').substring(6, 8) / 7) + 1;

							// 주차 텍스트
							$('.mon-week').text(Number(toMonth) + '월 ' + weekCnt + '주차');

							for(var i = 0; i < data.rows.length; i++) {
								item = data.rows[i];
								onClass = '';

								// 월이 같지 않을 경우
								if(i === 0 && item.MON !== toMonth) {

									initWeek = true;
								// 월은 같지만 주차가 같지 않을 경우
								} else if(i === 0 && item.WEEK_CNT !== weekCnt) {

									initWeek = true;
								} else if(item.MON === toMonth && item.WEEK_CNT === weekCnt) {
									onClass = 'on';
								}

								if(initWeek) {

									$li = $(document.createElement('li'));
									$li.data({
										YYYY: $sDateUtil.getToday('').substring(0, 4),
										MON: toMonth,
										WEEK_CNT: weekCnt,
									});

									$li.addClass('on');
									$li.text(Number(toMonth) + '월 ' + weekCnt + '주차');
								}

								$li = $(document.createElement('li'));
								$li.data(item);

								$li.addClass(onClass);
								$li.text(Number(item.MON) + '월 ' + item.WEEK_CNT + '주차');

								$('.week-list').find('ul').append($li);
							}
						}

						// 요일 표시
						$('#ulDayOfWeek').find('li[data-value=' + $sDateUtil.parseDate($sDateUtil.getToday('')).getDay() + ']').addClass('on');
						screen.v.week = $('#ulDayOfWeek').find('li.on').index();
						// 월요일
						screen.v.weekDt = $sDateUtil.calDate($sDateUtil.getToday(''), 'D', -$('#ulDayOfWeek').find('li.on').index(), '-');
						// 조회 일자
						screen.v.searchDt = $sDateUtil.calDate($sDateUtil.getToday(''), 'D', 0, '-');

//						// 파티 일정 리스트 조회
						screen.c.getFrontPartySchdList();

					}
				};

				$sCommon.ajax(options);
			},

			/**
			 * 파티 일정 리스트 조회
			 *
			 * @memberOf screen.c
			 */
			getFrontPartySchdList: function() {

				var options = {

					url : "/selectList",
					data : {
						queryId: 'getFrontPartySchdList',
						natiSeq: screen.v.natiSeq,
						yyyymmdd: screen.v.searchDt,
					},
					success : function(data) {

						$('.now').find('h2').text(screen.v.searchDt.substring(5, 7) + '.' + screen.v.searchDt.substring(8, 10));
						// 초기화
						$('#ulPart').find('>li').not('[data-li=not]').remove();

						var item, $li, startHhmm, endHhmm;
						$.each(data.rows, function(idx) {

							item = data.rows[idx];
							$li = screen.v.$liPart.clone();
							$li.data(item);
							if(!!item.FROM_DT) {
								startHhmm = item.FROM_DT.substring(11);
							} else {
								startHhmm = '24:00';
							}
							if(!!item.TO_DT) {
								endHhmm = item.TO_DT.substring(11);
							} else {
								endHhmm = '24:00';
							}

							$li.find('.time p').text(startHhmm + '-' + endHhmm);
							$li.find('.text p').text(item.PARTY_NM);

							// 이미 종료된 일정
							if(!!item.TO_DT && item.TO_DT.replace(/[^0-9]/g,'') < $sDateUtil.getToday('', 'M').replace(/[^0-9]/g,'')) {

								$li.addClass('off');
								$li.find('.time span').text('종료');
								// 진행중
							} else if(!!item.FROM_DT && !!item.TO_DT && item.TO_DT.replace(/[^0-9]/g,'') > $sDateUtil.getToday('', 'M').replace(/[^0-9]/g,'') &&
									item.FROM_DT.replace(/[^0-9]/g,'') <= $sDateUtil.getToday('', 'M').replace(/[^0-9]/g,'')) {

								$li.addClass('ing');
								$li.find('.time span').text('진행중');
							}
							// 첫 시작
							if(item.PARTY_SCHD_FRST_YN === 'Y') {

								$li.addClass('new');
							}

							$('#ulPart').append($li);
						});
					}
				};

				$sCommon.ajax(options);
			},

			/**
			 * 국가 리스트 조회
			 *
			 * @memberOf screen.c
			 */
			getFrontNatiList: function() {

				var options = {

					url : "/selectList",
					data : {
						queryId: 'getFrontNatiList',
						natiMajorYn: 'Y',
						natiNm: $('#inpNatiNm').val(),
					},
					success : function(data) {

						$('#ulContry').empty();
						if(!!data.rows) {

							var item, $li, contry, $childLi;
							$.each(data.rows, function(idx) {

								item = data.rows[idx];
								if(item.NATI_KR_NM !== contry) {

									contry = item.NATI_KR_NM;
									$li = screen.v.$liTemp.clone();

									$li.find('.title h3').text(contry);
									$li.find('.title img').attr('src', '/assets/img/contry/' + item.NATI_IMAG_NM);

									$('#ulContry').append($li);
								} else {

									$li = $('#ulContry').find('>li').last();
								}

								$childLi = $(document.createElement('li'));
								$childLi.data(item);

								var time = item.NATI_TIDF > 0 ? '+' : '-';
								time += $sStringUtil.lpad(Math.abs(item.NATI_TIDF) / 60, 2, '0') + ':';
								time += $sStringUtil.lpad(Math.abs(item.NATI_TIDF) % 60, 2, '0');

								$childLi.append('<b class="time">' + time + ' </b>');
								$childLi.append('<b class="city">' + item.NATI_TIME_ZONE + '</b>');

								$li.find('.cityList').append($childLi);
							});
						}
					}
				};

				$sCommon.ajax(options);
			},
		},

		/**
		 * 내부 함수
		 *
		 * @memberOf screen
		 */
		f: {

		},

		/**
		 * Event 정의 객체.
		 *
		 * @memberOf screen
		 */
		event: function() {

			// 국가 리스트 클릭
			$('#ulContry').on('click', '.title', function(){
		        $(this).siblings('.cityList').stop().slideToggle();
		        $(this).parent('.conList').toggleClass('on');
		        $(this).parent('.conList').siblings('.conList').find('.cityList').stop().slideUp();
		        $(this).parent('.conList').siblings('.conList').removeClass('on').find('.cityList').find('li').removeClass('on');
		    });

			// 국가 선택 클릭
			$('#ulContry').on('click', '.cityList li', function(){

		        if($(this).parents('.conList').hasClass('on')) {
		            $(this).toggleClass('on');
		            $(this).siblings('li').removeClass('on');
		            // 국가
					screen.v.natiSeq = $(this).data('NATI_SEQ');

					$('#imgCountry').attr('src', '/assets/img/contry/' + $(this).data().NATI_IMAG_NM);

					localStorage.setItem('contryInfo', JSON.stringify($(this).data()));
					// 파티 일정 리스트 조회
					screen.c.getFrontPartySchdList();
		        }

		        $('#btnCountryClose').trigger('click');
		    });

			// 국가 조회
			$('#btnCountySearch').off('click').on('click', function() {

				// 국가 리스트 조회
				screen.c.getFrontNatiList();
			});

			// 국가 엔터
			$('#inpNatiNm').enter(function() {

				// 국가 리스트 조회
				screen.c.getFrontNatiList();
			});

			// 요일 클릭
			$('#ulDayOfWeek').find('li').on('click', function() {

	            $(this).siblings('li').removeClass('on');
	            $(this).addClass('on');

            	screen.v.searchDt = $sDateUtil.calDate(screen.v.searchDt, 'D', $(this).index() - screen.v.week, '-');
	            screen.v.week = $(this).index();
				// 파티 일정 리스트 조회
				screen.c.getFrontPartySchdList();
			});

			// 주차 클릭
			$('.popupSelect').on('click', 'li', function() {

	            $(this).toggleClass('on');
	            $(this).siblings('li').removeClass('on');
	            // 주차 텍스트
				$('.mon-week').text($(this).text());
				// 요일 표시
				$('#ulDayOfWeek').find('li').removeClass('on');

				var item = $(this).data();
				// 주차 선택시 월요일
				screen.v.weekDt = item.YYYY + '-' + item.MON + '-' + $sStringUtil.lpad(((item.WEEK_CNT - 1) * 7 + 1), 2, '0');
				screen.v.searchDt = screen.v.weekDt;

				$('#ulDayOfWeek').find('li[data-value=' + $sDateUtil.parseDate(screen.v.weekDt).getDay() + ']').addClass('on');
				screen.v.week = $('#ulDayOfWeek').find('li.on').index();

				// 파티 일정 리스트 조회
				screen.c.getFrontPartySchdList();

	            $('.popupSelect').find('button').trigger('click');
			});

			// 파티 상세 클릭
			$('#ulPart').on('click', 'li.listsdl', function() {

				location.href = '/partee/detail?seq=' + $(this).data('PARTY_SEQ');
			});

			// 최초 팝업
			$('.popupChoice').on('click', function() {

				localStorage.setItem('initPopupClick', 'Y');
			});
		},

		/**
		 * Init 최초 실행.
		 *
		 * @memberOf screen
		 */
		init: function() {

			// Event 정의 실행
			screen.event();

			if(!localStorage.getItem('initPopupClick')) {

				$('.popupChoice').removeClass('none');
			}

			screen.v.$liTemp = $('#liTemp').clone().removeAttr('id');
			$('#liTemp').remove();
			screen.v.$liPart = $('#liPart').clone().removeAttr('id');
			$('#liPart').remove();

			// 국가 초기화(대한민국)
			if(!!localStorage.getItem('contryInfo')) {

				screen.v.natiSeq = JSON.parse(localStorage.getItem('contryInfo')).NATI_SEQ;
				$('#imgCountry').attr('src', '/assets/img/contry/' + JSON.parse(localStorage.getItem('contryInfo')).NATI_IMAG_NM);
			} else {

				localStorage.setItem('contryInfo', JSON.stringify({NATI_IMAG_NM: 'kr.png', NATI_KR_NM: '대한민국', NATI_NM: 'South Korea', NATI_SEQ: 925, NATI_TIDF: 540, NATI_TIME_ZONE:'Seoul'}));
				screen.v.natiSeq = 925;
			}

			// 국가 리스트 조회
			screen.c.getFrontNatiList();
			// 파티 주차 리스트 조회
			screen.c.getFrontWeekList();
		}
	};

	screen.init();
});
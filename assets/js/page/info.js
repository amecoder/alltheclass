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
			week: ['일', '월', '화', '수', '목', '금', '토'],
		},

		/**
		 * 통신 객체- call
		 *
		 * @memberOf screen
		 */
		c: {

			/**
			 * 파티 상세조회
			 *
			 * @memberOf screen.c
			 */
			getDetail: function() {

				var options = {

					url : "/getDetail",
					data : {
						partySeq: $sBizCommon.getUrlParams().seq,
					},
					success : function(data) {

						var item, $target, $li;
						// 파티정보
						if(!!data.row.info && data.row.info.length > 0) {

							item = data.row.info[0];

							$.each(item, function(key) {

								$target = $('[data-id=' + key + ']');
								if($target.isBe()) {

									if($target[0].tagName === 'A') {

										$target.removeClass('none');
										$target.attr('href', item[key]);
									} else {

										$target.text(item[key]);
									}
								}
							});
						}

						// 일정
						if(!!data.row.sc && data.row.sc.length > 0) {

							var mmdd;
							$.each(data.row.sc, function(idx) {
								item = data.row.sc[idx];

								$li = screen.v.$liTempSc.clone();

								mmdd = Number(item.PARTY_SCHD_YMD.substring(5, 7));
								mmdd += '월' + Number(item.PARTY_SCHD_YMD.substring(8, 10));
								mmdd += '(' + screen.v.week[$sDateUtil.parseDate(item.PARTY_SCHD_YMD).getDay()] + ')';

								$li.find('.day').text(mmdd);
								$li.find('.time').text(item.PARTY_SCHD_STRT_HH_MI + ' ~ ' + item.PARTY_SCHD_END_HH_MI);

								$('#ulSc').append($li);
							});
						}

						// 동영상
						if(!!data.row.youtube) {

							$('#ulYoutube').prev().find('.num').text(data.row.youtube.length);
							// <li class="cb"><h3 class="day">4월26일(목)</h3><p class="time">08:30 ~ 09:00</p></li>
							$.each(data.row.youtube, function(idx) {
								item = data.row.youtube[idx];

								$li = screen.v.$liTempYoutube.clone();

								$li.find('iframe').attr('src', item.PARTY_YUTB_URL.replace("https://youtu.be/", "https://www.youtube.com/embed/"));

								if(item.PARTY_YUTB_RRSN_YN) {

									$('.topImg').html('<iframe src="' + item.PARTY_YUTB_URL.replace("https://youtu.be/", "https://www.youtube.com/embed/") + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
								}

								$('#ulYoutube').append($li);
							});
						}

						// 이미지
						if(!!data.row.img) {

							$('#ulImg').prev().find('.num').text(data.row.img.length);
							// <li class="cb"><h3 class="day">4월26일(목)</h3><p class="time">08:30 ~ 09:00</p></li>
							$.each(data.row.img, function(idx) {
								item = data.row.img[idx];

								$li = screen.v.$liTempImg.clone();

								$li.find('a').attr('href', item.PARTY_IMAG_URL);
								$li.find('img').attr('src', item.PARTY_IMAG_URL);

								if(item.PARTY_IMAG_RRSN_YN) {

									$('.topImg').html('<img src="' + item.PARTY_IMAG_URL + '">');
								}

								$('#ulImg').append($li);
							});
						}

			            $('.modal').magnificPopup({
			                    type: 'image',
			                    gallery:{
			                    enabled:true
			                }
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
			getFrontNatiList: function(yyyymmdd) {

				var options = {

					url : "/selectList",
					data : {
						queryId: 'getFrontNatiList',
					},
					success : function(data) {

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
								$childLi.append('<b class="city">' + item.NATI_NM + '</b>');

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

		    // 뒤로가기
		    $('.subHeader').find('button').on('click', function() {

		    	history.back();
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

            //서브페이지들중에서 푸터의 굴곡배경색 변경하는 js입니다.
            //현재페이지안에만 넣어주세요
            $(document).ready(function(){
            	$('.footer').addClass('on');
            });
		}
	};

	screen.init();
});
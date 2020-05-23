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
			youtubeList:[],
			imgList:[],
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
						natiSeq: JSON.parse(localStorage.getItem('contryInfo')).NATI_SEQ,
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

										if(!!item[key]) {

											$target.parent().removeClass('none');
											$target.attr('href', item[key]);
										}
									} else {

										$target.text(item[key]);
									}
								}
							});

							if(!!item.PATR_PRFL_IMAG) {
								$('.name').find('img').removeClass('none');
								$('.name').find('img').attr('src', item.PATR_PRFL_IMAG);
							}

							if(!!item.PARTY_DS) {

								$('[data-id=PARTY_DS]').html(decodeURI(item.PARTY_DS).replace(/\n/g, '<br>'));
							}

							if(!item.PARTY_CHAT_URL) {

								$('[data-id=PARTY_CHAT_URL]').attr('href', 'javascript:alert("채팅 채널이 등록되지 않았습니다.");');
								$('[data-id=PARTY_CHAT_URL]').removeAttr('target');
							}

							if(!item.PARTY_RLIB_URL) {

								$('[data-id=PARTY_RLIB_URL]').attr('href', 'javascript:alert("자료실이 등록되지 않았습니다.");');
								$('[data-id=PARTY_RLIB_URL]').removeAttr('target');
							}
						}

						// 일정
						if(!!data.row.sc && data.row.sc.length > 0) {

							var mmdd;
							$.each(data.row.sc, function(idx) {
								item = data.row.sc[idx];

								if(item.PARTY_SCHD_YMD.replace(/-/g, '') >= $sDateUtil.getToday()) {

									$li = screen.v.$liTempSc.clone();

									mmdd = Number(item.PARTY_SCHD_YMD.substring(5, 7));
									mmdd += '월' + Number(item.PARTY_SCHD_YMD.substring(8, 10));
									mmdd += '(' + screen.v.week[$sDateUtil.parseDate(item.PARTY_SCHD_YMD).getDay()] + ')';

									$li.find('.day').text(mmdd);
									$li.find('.time').text(item.PARTY_SCHD_STRT_HH_MI + ' ~ ' + (!!item.PARTY_SCHD_END_HH_MI ? item.PARTY_SCHD_END_HH_MI : '24:00'));

									$('#ulSc').append($li);
								}
							});
						}

						// 동영상
						if(!!data.row.youtube) {

							screen.v.youtubeList = data.row.youtube;
							$('#ulYoutube').prev().find('.num').text(data.row.youtube.length);

							// 2개가 넘을 경우
							if(data.row.youtube.length <= 2) {
								$('#ulYoutube').next().addClass('none');
							}

							for(var i = 0; i < data.row.youtube.length; i++) {

								if(i >= 2) {
									break;
								}
								item = data.row.youtube[i];

								$li = screen.v.$liTempYoutube.clone();

								$li.find('iframe').attr('src', item.PARTY_YUTB_URL.replace("https://youtu.be/", "https://www.youtube.com/embed/"));

								if(item.PARTY_YUTB_RRSN_YN === 'Y') {

									$('.topImg').html('<iframe src="' + item.PARTY_YUTB_URL.replace("https://youtu.be/", "https://www.youtube.com/embed/") + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
								}

								$('#ulYoutube').append($li);
							}
						}

						// 이미지
						if(!!data.row.img) {

							screen.v.imgList = data.row.img;
							$('#ulImg').prev().find('.num').text(data.row.img.length);

							// 10개가 넘을 경우
							if(data.row.img.length <= 10) {
								$('#ulImg').next().addClass('none');
							}

							for(var i = 0; i < data.row.img.length; i++) {

								if(i >= 10) {
									break;
								}

								item = data.row.img[i];

								$li = screen.v.$liTempImg.clone();

								$li.find('a').attr('href', item.PARTY_IMAG_URL);
								$li.find('img').attr('src', item.PARTY_IMAG_URL);

								if(item.PARTY_IMAG_RRSN_YN === 'Y') {

									$('.topImg').html('<img src="' + item.PARTY_IMAG_URL + '">');
								}

								$('#ulImg').append($li);
							}
						}

						// 또다른 파티
						if(!!data.row.elseList) {

							if(data.row.elseList.length === 0) {

								$('.parteeInner').find('>p.title').addClass('none');
								$('#ulElse').parent().addClass('none');
							}

							$.each(data.row.elseList, function(idx) {
								item = data.row.elseList[idx];

								$li = screen.v.$liTempElse.clone();
								$li.data(item);

								if(!!item.PARTY_IMAG_URL) {

									$li.find('img').attr('src', item.PARTY_IMAG_URL);
								} else if(!!item.PARTY_YUTB_URL) {

									$li.find('img').attr('src', 'https://img.youtube.com/vi/' + item.PARTY_YUTB_URL.replace('https://youtu.be/', '') + '/0.jpg');
								}

								$li.find('.text').text(item.PARTY_NM);

								$('#ulElse').append($li);
							});
						}

			            var swiper = new Swiper('.parteeInner .swiper-container', {
			                loop:false,
			                slidesPerView: 'auto',
			                slidesPerGroup: 1,
			            });

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

			// 복사
		    var clipboard = new ClipboardJS('#btnCopy', {
		        text: function() {
		            return location.href;
		        }
		    });

		    clipboard.on('success', function(e) {
		        alert('이 파티의 URL이 복사되었습니다.');
		    });

		    $('#ulElse').on('click', 'li', function() {

				location.href = '/partee/detail?seq=' + $(this).data('PARTY_SEQ');
		    });

		    // 뒤로가기
		    $('.subHeader').find('button').on('click', function() {

		    	location.href = '/partee';
		    });

		    // 유튜브 더보기
		    $('#btnMoreYou').on('click', function() {

				// 2개가 넘을 경우
				if(screen.v.youtubeList.length <= $('#ulYoutube').find('li').length + 2) {
					$('#ulYoutube').next().addClass('none');
				}

				var cnt = 0;
				for(var i = $('#ulYoutube').find('li').length; i < screen.v.youtubeList.length; i++) {

					if(cnt >= 2) {
						break;
					}
					item = screen.v.youtubeList[i];

					$li = screen.v.$liTempYoutube.clone();

					$li.find('iframe').attr('src', item.PARTY_YUTB_URL.replace("https://youtu.be/", "https://www.youtube.com/embed/"));

					if(item.PARTY_YUTB_RRSN_YN === 'Y') {

						$('.topImg').html('<iframe src="' + item.PARTY_YUTB_URL.replace("https://youtu.be/", "https://www.youtube.com/embed/") + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
					}

					$('#ulYoutube').append($li);
					cnt++;
				}
		    });

		    // 이미지 더보기
		    $('#btnMoreYou').on('click', function() {

		    	// 10개가 넘을 경우
		    	if(screen.v.imgList.length <= $('#ulImg').find('li').length + 10) {
		    		$('#ulImg').next().addClass('none');
		    	}

		    	var cnt = 0;
		    	for(var i = $('#ulImg').find('li').length; i < screen.v.imgList.length; i++) {

		    		if(cnt >= 10) {
		    			break;
		    		}
		    		item = screen.v.imgList[i];

					$li = screen.v.$liTempImg.clone();

					$li.find('a').attr('href', item.PARTY_IMAG_URL);
					$li.find('img').attr('src', item.PARTY_IMAG_URL);

					if(item.PARTY_IMAG_RRSN_YN === 'Y') {

						$('.topImg').html('<img src="' + item.PARTY_IMAG_URL + '">');
					}

					$('#ulImg').append($li);
		    		cnt++;
		    	}
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

			screen.v.$liTempElse = $('#liTempElse').clone().removeAttr('id');
			$('#liTempElse').remove();
			screen.v.$liTempSc = $('#liTempSc').clone().removeAttr('id');
			$('#liTempSc').remove();
			screen.v.$liTempYoutube = $('#liTempYoutube').clone().removeAttr('id');
			$('#liTempYoutube').remove();
			screen.v.$liTempImg = $('#liTempImg').clone().removeAttr('id');
			$('#liTempImg').remove();

			// 파티 상세 조회
			screen.c.getDetail();

            //서브페이지들중에서 푸터의 굴곡배경색 변경하는 js입니다.
            //현재페이지안에만 넣어주세요
            $(document).ready(function(){
            	$('.footer').addClass('on');
            });
		}
	};

	screen.init();
});
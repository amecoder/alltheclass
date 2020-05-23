<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>
<div id="wrap" data-now-week="4" data-max-week="5" data-day-of-week="7" data-to-day="20200523">
    <div class="headInner">
        <header>
            <h2>
                <a href="javascript:;"><img src="/assets/img/logo.png" alt="AllThePartee"></a>
            </h2>
            <nav class="countryMenu">
                <button class="click">
                    <div class="img">
                        <img id="imgCountry" src="/assets/img/contry/kr.png" alt="country">
                    </div>
                    <img src="/assets/img/icon.png" alt="아래화살표">
                </button>
                <div class="popupCountry" id="popup">
                    <!--국가별 시간대 검색팝업창-->
                    <div class="popupList">
                        <button id="btnCountryClose" type="button"><img src="/assets/img/icon12.png" alt="x">
                            <em>닫기</em></button>
                        <div class="search cb">
                            <input type="text" name="" id="inpNatiNm" placeholder="국가 및 도시명을 검색하세요">
                            <button id="btnCountySearch" type="button">
                                <img src="/assets/img/search.png" alt="돋보기">
                            </button>
                        </div><!--search-->
                        <em class="tit">선택하시는 시간대에 맞춰 일정표가 변경됩니다. <br> (GMT 기준)</em>

                        <ul id="ulContry" class="listBox">
                            <!--반복-->
                            <li id="liTemp" class="conList">
                                <div class="title">
                                    <img src="" alt="Country" style="width:27px;height:27px;">
                                    <h3></h3>
                                </div>
                                <ul class="cityList">
                                </ul><!--cityList end-->
                            </li><!--conList-->
                        </ul><!--listBox end-->
                    </div>
                </div><!--popupCountry end-->
            </nav>
            <div class="popupChoice none">
                <span class="arrow"><img src="/assets/img/icon13.png" alt="위방향화살표"></span>
                <ul>
                    <li class="text">
                        <b>지금 거주하시는 곳을 선택해주세요.</b>
                        <p>파티 일정표가 거주하시는 곳 기준으로 업데이트 됩니다.</p>
                    </li>
                    <li>
                        <button type="button">닫기</button>
                    </li>
                </ul>
            </div><!--popupChoice end-->
        </header>
        <div class="textInner">
            <h4>
                <p>첫 번째 소셜에듀케이션 플랫폼,올더파티</p>
                누구나 가르칠 수 있고, <br>
                누구나 배울 수 있다.
            </h4>
        </div><!--textInner end-->
    </div><!--headInner end-->

    <div class="container01">
        <span class="bg"></span>
        <section>
            <h2>파티 일정표</h2>
            <ul id="ulPart" class="list">
                <li data-li="not" class="now">
                    <!--선택한 날짜출력되는 들어갈 부분-->
                    <h2></h2>
                </li><!--now end-->
                <li data-li="not" class="daySelect">
                    <div class="click">
                        <span class="mon-week"></span> <img src="/assets/img/icon02.png" alt="아래화살표">
                    </div>
                    <div class="popupSelect" id="popup">
                        <!--일정이 있는 모든 주차 선택 영역-->
                        <div class="popupList week-list">
                            <button type="button"><img src="/assets/img/icon12.png" alt="x"> <em>닫기</em></button>
                            <ul>
                            </ul>
                        </div>
                    </div>
                </li><!--daySelect end-->
                <li data-li="not" class="day">
                    <ul id="ulDayOfWeek">
                        <!--class=on 추가하면 텍스트색이 변합니다.-->
                        <li data-value="1">
                            <a>월</a>
                        </li>
                        <li data-value="2">
                            <a>화</a>
                        </li>
                        <li data-value="3">
                            <a>수</a>
                        </li>
                        <li data-value="4">
                            <a>목</a>
                        </li>
                        <li data-value="5">
                            <a>금</a>
                        </li>
                        <li data-value="6">
                            <a>토</a>
                        </li>
                        <li data-value="0">
                            <a>일</a>
                        </li>
                    </ul>
                </li><!--day end-->

                <li id="liPart" class="listsdl cb">
                    <!-- class=off 추가하면 종료 -->
                    <div class="time">
                        <span></span>
                        <p></p>
                    </div>
                    <div class="text">
                        <p>혜성쌤의 포토샵으로 유튜브 썸네일 만들기 1</p>
                    </div>
                </li>
                <li class="always listsdl cb">
                    <!-- class=always 추가하면 상시 아이콘 & 상시팝업창 노출-->
                    <div class="time">
                        <span></span>
                        <p class="click">
                            상시
                        </p>
                        <div class="popupAlways" id="popup">
                            <div class="popupList">
                                <button type="button"><img src="/assets/img/icon12.png" alt="x"> <em>닫기</em></button>
                                <div class="inner">
                                    <b>상시란?</b>
                                    <i>
                                        별도의 실시간 수업이 열리지 <br>
                                        않고, 카톡방에서 참석만 <br>
                                        해주는 파티입니다.
                                    </i>
                                </div>
                            </div>
                        </div><!--popupAlways end-->
                    </div>
                    <div class="text">
                        <p>아내 몰래 들키지 않고 비자금 확실하게 모으는 방법</p>
                    </div>
                </li>
            </ul>
        </section>
    </div><!--container01 end-->

    <div class="container02">
        <span class="bg"></span>
        <section>
            <h2>
                FAQ
                <em>자주하는 질문</em>
            </h2>

            <ul class="faqList wrap">
                <li class="offList">
                    <div class="title">
                        <img src="/assets/img/icon04.png" alt="Q">
                        <h3>소셜 에듀케이션이란?</h3>
                    </div>
                    <ul class="sublist">
                        <li>
                            A. 누구나 자신의 경험, 지식, 재능을 교육의 형태로 쉽게 공유하고, 배우며 같이 성장할 수 있는 교육 커뮤니티를 의미합니다.
                        </li>
                    </ul>
                </li>
                <li class="offList">
                    <div class="title">
                        <img src="/assets/img/icon04.png" alt="Q">
                        <h3>All The Partee는 <br>
                            어떻게 시작되었나요? </h3>
                    </div>
                    <ul class="sublist">
                        <li>
                            A. 2020년 3월 코로나 극복을 취지로 시작한 1개의 무료화상영어강의에서,
                            누구나 쉽게 다양한 주제의 교육으로 사람들과 소통할 수 있는 지금의 소셜에듀케이션
                            형태로 발전하게 되었어요. 지금은 한국 뿐 아니라, 미국, 스페인, 호주, 캐나다, 필리핀 등
                            전세계 10개국 이상의 많은 분들이 참여를 하고 있어 시차로 인한 커뮤니케이션 문제 등의
                            불편함을 해소하고자 소셜에듀케이션 플랫폼 올더파티를 런칭하게 되었습니다.
                        </li>
                    </ul>
                </li>
                <li class="offList">
                    <div class="title">
                        <img src="/assets/img/icon04.png" alt="Q">
                        <h3>모든 파티 참여가 무료인가요?</h3>
                    </div>
                    <ul class="sublist">
                        <li>
                            A. 네! 올더파티의 모든 교육은 파티호스트의 자발적인 재능공유로
                            이루어지고 있으며, 누구나 무료로 배우실 수 있습니다.
                        </li>
                    </ul>
                </li>
                <li class="offList">
                    <div class="title">
                        <img src="/assets/img/icon04.png" alt="Q">
                        <h3>
                            내가 원하는 파티에 <br>
                            어떻게 참여할 수 있나요?
                        </h3>
                    </div>
                    <ul class="sublist">
                        <li>
                            A.모든 파티는 화상어플리케이션 ‘줌(Zoom)’으로 진행됩니다.
                            학습을 원하시는 단말기에 ‘Zoom Cloud Meetings”라는 프로그램만 설치(로그인, 회원가입 등 필요없음)하신 뒤,
                            원하시는 파티의 채팅방(상세페이지에 버튼클릭)에서 매 파티 시작 전
                            파티호스트가 배포하는 URL만 클릭하시면 파티장 입장이 가능합니다.
                            해당 파티의 채팅룸은 파티상세페이지에서 확인하실 수 있습니다.

                            <div class="file">
                                <p>[프로그램 다운로드]</p>
                                <div class="appBtn">
                                    <a href="https://play.google.com/store/apps/details?id=us.zoom.videomeetings"
                                       target="_block">
                                        <img src="/assets/img/appIcon01.png" alt="구글플레이 다운로드">
                                    </a>
                                    <a href="https://apps.apple.com/us/app/id546505307" target="_block">
                                        <img src="/assets/img/appIcon02.png" alt="앱 스토어 다운로드">
                                    </a>
                                </div>
                            </div><!--file end-->
                        </li>
                    </ul>
                </li>
                <li class="offList">
                    <div class="title">
                        <img src="/assets/img/icon04.png" alt="Q">
                        <h3>누구나 파티를 개설할 수 있나요?</h3>
                    </div>
                    <ul class="sublist">
                        <li>
                            A. 올더파티는 누구나 가르칠 수 있고, 누구나 배울 수 있는 열린교육을 지향합니다. 지나치게 상업적이거나,
                            사회적 합의가 이루어지지 않은 반사회적, 정치적, 종교적 요소를 지닌 주제가 아니라면,
                            누구나 파티를 개설하여 자신만의 교육으로 다른 사람들과 소통하실 수 있어요!
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
        <span class="bg2"></span>
    </div><!--container02 end-->

    <a class="mTop" href="javascript:;"><img src="/assets/img/icon06.png" alt="top"></a>
</div><!--wrap end-->
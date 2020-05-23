<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="/assets/img/Favicon_32.png">
    <link rel="apple-touch-icon" href="/assets/img/icon/apple-touch-icon.png"/>
    <link rel="apple-touch-icon" sizes="57x57" href="/assets/img/icon/apple-touch-icon-57x57.png"/>
    <link rel="apple-touch-icon" sizes="72x72" href="/assets/img/icon/apple-touch-icon-72x72.png"/>
    <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/icon/apple-touch-icon-76x76.png"/>
    <link rel="apple-touch-icon" sizes="114x114" href="/assets/img/icon/apple-touch-icon-114x114.png"/>
    <link rel="apple-touch-icon" sizes="120x120" href="/assets/img/icon/apple-touch-icon-120x120.png"/>
    <link rel="apple-touch-icon" sizes="144x144" href="/assets/img/icon/apple-touch-icon-144x144.png"/>
    <link rel="apple-touch-icon" sizes="152x152" href="/assets/img/icon/apple-touch-icon-152x152.png"/>
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/icon/apple-touch-icon-180x180.png"/>

    <title>소셜에듀케이션, 올더파티</title>
    <meta name="keywords"
          content="소셜에듀케이션, 재능공유, 재능기부, 화상강의, 싸강, 영어회화, 중국어, 스페인어, 유튜브, 포토샵,일러스트레이터, 원어민영어회화, 요리배우기, 독서모임, 독서토론, 독일어, 에스페란토어, 웹개발, IT, 웹디자인, 노래, 악기, 취미, 미술, 음악">
    <meta name="description"
          content="다양한 주제의 무료교육을 전 세계 사람들과 화상으로 편하게 경험해보세요. ">
    <meta property="og:description"
          content="다양한 주제의 무료교육을 전 세계 사람들과 화상으로 편하게 경험해보세요. "/>
    <meta property="og:title" content="소셜에듀케이션, 올더파티"/>
    <meta property="og:image" content="http://allthepartee.com/assets/img/sns_share_img.png"/>
    <link rel="stylesheet" href="/assets/css/swiper.min.css">
    <link rel="stylesheet" href="/assets/css/magnific-popup.css">
    <link rel="stylesheet" href="/assets/css/font.css">
    <link rel="stylesheet" href="/assets/css/style_m.css">

    <?php echo isset($sCssTag) ? $sCssTag : '';?>

    <style>
        .none {
            display: none !important;
        }
    </style>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-165675390-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());

        gtag('config', 'UA-165675390-1');
    </script>
</head>

<body class="">

    <?php echo isset($layout) ? $layout: ''; ?>

    <script type="text/javascript" src="/assets/js/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/assets/js/swiper.min.js"></script>
    <script type="text/javascript" src="/assets/js/js_m.js"></script>
    <script type="text/javascript" src="/assets/js/jquery.magnific-popup.min.js"></script>
    <script type="text/javascript" src="/assets/js/clipboard.min.js"></script>

    <script type="text/javascript" src="/assets/js/jquery/plugins/jquery.blockUI.js"></script>
    <script type="text/javascript" src="/assets/js/jquery/plugins/jquery.form.min.js"></script>
    <script type="text/javascript" src="/assets/js/jquery/plugins/jqueryExtend.js"></script>
    <script type="text/javascript" src="/assets/js/sPCommon.min.js"></script>


    <script>
        var contextPath = "";
        var requestURI = "/partee/index";
        skebinse.UserVal.pageData = {};
        skebinse.UserVal.pageData.nowWeek = "4";
        skebinse.UserVal.pageData.nowDayOfWeek = "7";
        skebinse.UserVal.pageData.toDay = "20200523";
        skebinse.UserVal.pageData.maxWeek = "5";
    </script>

    <?php echo isset($js) ? $js : ''; ?>
</body>
</html>
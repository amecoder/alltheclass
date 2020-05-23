<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class MY_Loader extends CI_Loader
{
    /**
     * MY_Loader constructor.
     */
    public function __construct()
    {
        parent::__construct();

        $this->_ci_ob_level  = ob_get_level();
//        $this->_ci_library_paths = array(COMMONPATH, BASEPATH);
//        $this->_ci_helper_paths = array(COMMONPATH, BASEPATH);
//        $this->_ci_model_paths = array(COMMONPATH);
//        $this->_ci_view_paths = array(APPPATH.'views/'	=> TRUE);

        log_message('debug', "Loader Class Initialized");
    }

    /**
     * 화면 출력
     * @param $layoutParam
     */
    public function defaultLayout(array $layoutParam)
    {
        $header = '';
        if (isset($layoutParam['header'])) {
            $header = $layoutParam['header'];
        }

        $css = '';
        if (isset($layoutParam['css'])) {
            $css = $this->getCssTag($layoutParam['css']);
        }

        $content = '';
        if (isset($layoutParam['content'])) {
            $content = $layoutParam['content'];
        }

        $js = '';
        if (isset($layoutParam['js'])) {
            $js = $this->getJavascriptTag($layoutParam['js']);
        }

        $footer = '';
        if (isset($layoutParam['footer'])){
            $footer = $layoutParam['footer'];
        }

        $layout = $this->view('/layouts/content.php', array(
                'header' => $header,
                'content' => $content,
                'footer' => $footer)
            , true);

        $this->view('/layouts/default.php', array(
                'layout' => $layout,
                'css' => $css,
                'js' => $js)
        );
    }

    private function getJavascriptTag(array $file)
    {
        $tags    = array();

        if (empty($file) === false) {
            foreach ($file as $key => $val) {
                array_push($tags, array('src' => $val));
            }

            $tags = $this->multi_script_tag($tags);
        }

        return empty($tags) === false ? implode('', $tags) : '';
    }

    private function getCssTag(array $file)
    {
        $tags    = array();

        if (empty($file) === false) {
            foreach ($file as $key => $val) {
                array_push($tags, array('src' => $val, 'language' => 'stylesheet'));
            }

            $tags = $this->multi_script_tag($tags);
        }

        return empty($tags) === false ? implode('', $tags) : '';
    }

    private function multi_script_tag($aJsInfo)
    {
        if (empty($aJsInfo) === true) {
            return;
        }
        $aJsScriptTags = array();

        $iLen = count($aJsInfo);
        for ($i = 0; $i < $iLen; $i++) {
            $sSrc = empty($aJsInfo[$i]['src']) ? '' : $aJsInfo[$i]['src'];
            $sLanguage = empty($aJsInfo[$i]['language']) ? 'javascript' : $aJsInfo[$i]['language'];
            $sType = empty($aJsInfo[$i]['type']) ? 'text/javascript' : $aJsInfo[$i]['type'];
            $iIndexPage = empty($aJsInfo[$i]['indexPage']) ? FALSE : TRUE;

            array_push($aJsScriptTags, $this->script_tag($sSrc, $sLanguage, $sType, $iIndexPage));
        }

        return $aJsScriptTags;
    }

    private function script_tag($src = '', $language = 'javascript', $type = 'text/javascript', $index_page = FALSE)
    {
        $script = '';

        if ($language == 'javascript') {
            $script = '<script';
            $script .= ' src="/' . $src . '"';
            $script .= ' language="' . $language . '" type="' . $type . '"';
            $script .= '></scr' . 'ipt>' . "\n";
        } else {
            $script = '<link';
            $script .= ' rel="' . $language . '"';
            $script .= ' href="/' . $src . '"';
            $script .= '>' . "\n";
        }

        return $script;
    }

}

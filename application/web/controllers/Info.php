<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Info extends MY_Controller {
    private $view = array();

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $this->view['header'] = $this->getDefaultHeader();
        $this->view['footer'] = $this->getDefaultFooter();
        $this->view['js'] = array('assets/js/page/info.js');
        $this->view['css'] = array();
        $this->view['content'] = $this->load->view('/info/index', array(), true);
        $this->load->defaultLayout($this->view);
    }
}
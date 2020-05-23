<?php
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class MY_Controller extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
    }


    /**
     * @return string
     */
    public function getDefaultHeader()
    {

        return $this->load->view('/common/default_header', array(), true);
//        return $this->load->view('/common/empty_header_v', $aHeaderParam, true);
    }

    /**
     * @return string
     */
    public function getDefaultFooter()
    {
        return $this->load->view('/common/default_footer', array(), true);
    }
}
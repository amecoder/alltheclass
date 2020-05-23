<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Index extends MY_Controller {
    private $view = array();

    public function __construct()
    {
        parent::__construct();
    }

    /**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /web.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
        $this->view['header'] = $this->getDefaultHeader();
        $this->view['footer'] = $this->getDefaultFooter();
        $this->view['js'] = array('assets/js/page/index.js?202005191049');
        $this->view['css'] = array();
        $this->view['content'] = $this->load->view('/index/index', array(), true);
		$this->load->defaultLayout($this->view);
	}
}

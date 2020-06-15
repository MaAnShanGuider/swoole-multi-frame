<?php
namespace Gameapp\App\websock;

use Gameapp\Core\AStrategy;
use Gameapp\Core\Packet;
//use Gameapp\Lib\JokerPoker;
use Gameapp\Conf\MainCmd;
use Gameapp\Conf\SubCmdSys;


/**
 *  翻倍处理
 */ 
  
 class IsDouble extends AStrategy {
	/**
	 * 执行方法
	 */         
	public function exec() {		
		$card = isset($this->_params['data']['card']) ? $this->_params['data']['card'] : 2; ;//明牌
		$pos = isset($this->_params['data']['pos']) && ($this->_params['data']['pos'] < 4) ? intval($this->_params['data']['pos']) : 2;//我选中的位置 0123
//		$res = JokerPoker::getIsDoubleCard($card, $pos);
		$res['bean'] = 0;
		$res['bet'] = 0;		
		$data = Packet::packFormat('OK', 0, $res);
		$data = Packet::packEncode($data, MainCmd::CMD_SYS, SubCmdSys::IS_DOUBLE_RESP);
		return $data;		    
	}
}
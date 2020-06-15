<?php
namespace Gameapp\App\websock;

use Gameapp\Core\AStrategy;
use Gameapp\Core\Packet;
//use Gameapp\Lib\JokerPoker;
use Gameapp\Conf\MainCmd;
use Gameapp\Conf\SubCmdSys;

/**
 *  翻牌处理
 */ 
  
 class TurnCard extends AStrategy {
	/**
	* 执行方法
	*/         
	public function exec() {
		$card = isset($this->_params['data']['card']) ? $this->_params['data']['card'] : array(); 
//		$card = JokerPoker::getFiveCard($card);
//		$res = JokerPoker::getCardType($card);
        $card = array(1,2);
        $res = array(4,5);
		$data = Packet::packFormat('OK', 0, array(1,2));
		$data = Packet::packEncode($data, MainCmd::CMD_SYS, SubCmdSys::TURN_CARD_RESP);
		return $data;		    
	}
}
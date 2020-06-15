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
  
 class GetSingerCard extends AStrategy {
	/**
	 * 执行方法
	 */         
	public function exec() {		
//		$card = JokerPoker::getOneCard();
//        $data = array('card'=>$card);
//        $data = Packet::packFormat('OK', 0, $data);
        $data = Packet::packFormat('OK', 0, array(1,2));
		$data = Packet::packEncode($data, MainCmd::CMD_SYS, SubCmdSys::GET_SINGER_CARD_RESP);
		return $data;		    
	}
}
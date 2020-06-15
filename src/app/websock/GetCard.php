<?php
namespace Gameapp\App\websock;

use Gameapp\Core\AStrategy;
use Gameapp\Core\Packet;
//use Game\Lib\JokerPoker;
use Gameapp\Conf\MainCmd;
use Gameapp\Conf\SubCmdSys;

/**
 *  获取卡牌信息
 */ 
  
 class GetCard extends AStrategy {
    /**
     * 执行方法
     */         
    public function exec() {		
//        $data = JokerPoker::getFiveCard();
        $data = array(1,2);
        $data = Packet::packFormat('OK', 0, $data);
        $data = Packet::packEncode($data, MainCmd::CMD_SYS, SubCmdSys::GET_CARD_RESP);
		return $data;  
    }
}
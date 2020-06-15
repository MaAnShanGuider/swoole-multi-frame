<?php
namespace Gameapp\App\websock;

use Gameapp\Core\AStrategy;
use Gameapp\Core\Packet;
use Gameapp\Conf\MainCmd;
use Gameapp\Conf\SubCmdSys;

/**
 *  聊天消息回复
 */

class HeartAsk extends AStrategy {
    /**
     * 执行方法
     */
    public function exec() {
        //原封不动发回去
        $data = Packet::packFormat('OK', 0, $this->_params['data']);
//        $data = Packet::packEncode($data, MainCmd::CMD_SYS, SubCmdSys::CHAT_MSG_RESP);
        $data = Packet::packEncode($data, MainCmd::CMD_SYS, SubCmdSys::HEART_ASK_MSG_RESP);
        return $data;
    }
}

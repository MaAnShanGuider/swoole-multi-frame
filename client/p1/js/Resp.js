/**响应服务器命令字处理类*/

var Resp = {  
       
    //获取
    getCard(data) {
        document.getElementById('msgText').innerHTML  += data + '\n';
    },
    
    //发送卡牌信息
    sendCard(data) {
        document.getElementById('msgText').innerHTML  += JSON.stringify(data) + '\n';			       
    },
    
    //翻牌信息
    turnCard(data) {
        document.getElementById('msgText').innerHTML  += JSON.stringify(data) + '\n';	
    },
    
    //取消翻牌
    cancelCard(data) {
        document.getElementById('msgText').innerHTML  += JSON.stringify(data) + '\n';		
    },
    
    //是否翻倍
    isDouble(data) {
        document.getElementById('msgText').innerHTML  += JSON.stringify(data) + '\n';		
    },
    
    getSingerCard(data) {
       document.getElementById('msgText').innerHTML  += JSON.stringify(data) + '\n';		
    },
		
    chatMsg(data) {
        console.log('-------------------------------');
        console.log(data);
       document.getElementById('msgText').innerHTML  += data["data"] + '\n';		
    },
	heartAsk() {
 
	}
}
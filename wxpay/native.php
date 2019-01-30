<?php 
require '../conn/conn2.php';
require '../conn/function.php';

$APPID = $C_wx_appid;
$MCHID = $C_wx_mchid;
$KEY = $C_wx_key;
$APPSECRET = $C_wx_appsecret;
	
$NOTIFY_URL = "http://".$C_domain.$C_dir."wxpay/notify_url.php";


$O_ids = trim($_POST["attach"]);
$O_id = explode(",", $O_ids);
for ($i = 0; $i < count($O_id); $i++) {
    $sql = "select * from SL_orders,SL_product,SL_member,SL_lv where M_lv=L_id and O_pid=P_id and O_member=M_id and O_id=" . $O_id[$i];
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);
    if (mysqli_num_rows($result) > 0) {
        $P_title = $row["P_title"];
        $O_all = $row["O_price"] * $row["O_num"];
        $postage = $row["O_postage"];
    }
    
    $money = $money + $O_all;

    if ($i == 0) {
        if (count($O_id) > 1) {
            $P_title1 = lang($P_title) . "等" . count($O_id) . "件商品";
        } else {
            $P_title1 = lang($P_title);
        }
    }
}


$total_fee = ($money+$postage)*100;
$body=$P_title1;
$attach=$_POST["attach"];

$product_id=1;
$genkey=gen_key(20);

$sign=strtoupper(MD5("appid=".$APPID."&attach=".$attach."&body=".$body."&mch_id=".$MCHID."&nonce_str=".$genkey."&notify_url=".$NOTIFY_URL."&out_trade_no=".$genkey."&spbill_create_ip=127.0.0.1&total_fee=".$total_fee."&trade_type=NATIVE&key=".$KEY));

$info=getbody("https://api.mch.weixin.qq.com/pay/unifiedorder","<xml><appid>".$APPID."</appid><attach>".$attach."</attach><body>".$body."</body><mch_id>".$MCHID."</mch_id><nonce_str>".$genkey."</nonce_str><notify_url>".$NOTIFY_URL."</notify_url><out_trade_no>".$genkey."</out_trade_no><spbill_create_ip>127.0.0.1</spbill_create_ip><total_fee>".$total_fee."</total_fee><trade_type>NATIVE</trade_type><sign>".$sign."</sign></xml>");

$postObj = simplexml_load_string( $info );
echo $postObj->code_url;
?>
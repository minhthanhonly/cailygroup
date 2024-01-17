<?php
    class Session{
        static public function data($key, $value=''){
            $sessionKey = self::isInvalid();
            if(!empty($value)){
                $_SESSION[$sessionKey][$key] = $value;
                return true;
            } else {
                if(isset($$_SESSION[$sessionKey][$key])){
                    return $_SESSION[$sessionKey][$key];
                }
            }
        }

        static public function showErrors($message){
            $data = ['message' => $message];
            App::$app->loadError('exception', $data);
        }

        static function isInvalid(){
            global $config;
            if(!empty($config['session'])){
                $sessionConfig = $config['session'];
                if(!empty($sessionConfig['session_key'])){
                    $sessionKey = $sessionConfig['session_key'];
                    return $sessionKey;
                } else {
                    // 
                }
            } else {
                // self::showErrors('Thiếu cấu hình session. Vui lòng kiểm tra file: configs/session.php');
            }
        }
    }
?>
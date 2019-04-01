
const BASE_URL = 'http://192.168.1.5:8000';

const Routes = { 
    USER_LIST : BASE_URL + '/user/list/'+localStorage.getItem('user_id'),
    USER_CHANELS : BASE_URL + '/user/chanels/'+localStorage.getItem('user_id'),
    CHAT_BOX : BASE_URL + '/chat/chat-box',
    READ_MESSAGES : BASE_URL + '/chat/all-readed',
    SEND_MSG : BASE_URL + '/chat/send',
    GET_USER : BASE_URL + '/user/find/',
}

export default Routes;
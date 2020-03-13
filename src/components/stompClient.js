import Stomp from "stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

const getStompClient = (url, headers = {}, onConnect = stompClient => {}) => {
  if (stompClient === null) {
    const socket = new SockJS(url);

    stompClient = Stomp.over(socket);
    stompClient.debug = message => console.log(message);
    stompClient.connect(headers, frame => stompClient.connected = true);
  }

  const interval = setInterval(() => {
    if(stompClient.connected) {
        onConnect(stompClient);
        clearInterval(interval);
    }
  }, 1);

  return stompClient;
};

export default getStompClient;

import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { baseURL } from "./api";

let stompClient = null;

const getStompClient = (headers = {}, onConnect = stompClient => {}) => {
  if (stompClient === null) {
    const socket = new SockJS(baseURL + "/ws/secured");

    stompClient = Stomp.over(socket);
    stompClient.debug = message => console.debug(message);
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

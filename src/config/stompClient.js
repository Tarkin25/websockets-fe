import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { baseURL } from "./api";
import { v4 as uuidv4 } from 'uuid';

let stompClient = null;

const getStompClient = (headers = {}) => new Promise((resolve, reject) => {
  if(stompClient === null) {
    const stomp = new SimpleStompClient(baseURL + "/ws/secured");

    stomp.connect(headers)
    .then(() => {
      stompClient = stomp;
      resolve(stompClient);
    })
    .catch(error => reject(error));
  } else {
    resolve(stompClient);
  }
});

export class SimpleStompClient {

  constructor(url) {
    const socket = new SockJS(url);

    this.stomp = Stomp.over(socket);
    this.stomp.debug = message => console.debug(message);
    this.connected = false;
  }

  connect = (headers = {}) => {
    return new Promise((resolve, reject) => {
      this.stomp.connect(
        headers, 
        frame => {
          this.connected = true;
        },
        error => {
          reject(error);
        }
      );

      const interval = setInterval(() => {
        if(this.connected) {
          clearInterval(interval);
          resolve();
        }
      }, 1);
    });
  };

  subscribe = (destination, callback = message => {}, id = uuidv4(), headers = {}) => {
    headers.id = id;

    return this.stomp.subscribe(destination, callback, headers);
  }

  unsubscribe = (id) => {
    this.stomp.unsubscribe(id);
  }

  disconnect = (callback = () => {}, headers = {}) => {
    this.stomp.disconnect(callback, headers);
  }

}

export default getStompClient;

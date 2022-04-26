import { Stomp } from "@stomp/stompjs";
import SockJs from "sockjs-client/dist/sockjs";

export async function createQueueConsumer() {
  return new Promise((resolve, reject) => {
    try {
      const url = "http://localhost:8080/chat/room";
      const ws = new SockJs(url);
      const client = Stomp.over(ws);
      client.connect({}, () => {
        console.log("Connection Success!!");
        resolve(client);
      });
    } catch (ex) {
      console.error("Could not create consumer ", ex);
      reject();
    }
  });
}

export function subscribeToQueue(client, groupId, listener) {
  client.subscribe(`/messaging-queue-${groupId}`, (message) => {
    const parsed = JSON.parse(message.body);
    listener(parsed);
  });
}

export function sendMessage(client, message) {
  client.send("/chat-app/messages", {}, JSON.stringify(message));
}

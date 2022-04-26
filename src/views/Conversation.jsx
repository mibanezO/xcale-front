import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import AddUserModal from "../components/AddUserModal";
import Message from "../components/Message";
import { fetchGroup } from "../services/groupService";
import { loadMessages } from "../services/messageServices";
import {
  createQueueConsumer,
  sendMessage,
  subscribeToQueue,
} from "../services/queueService";

function Conversation() {
  const { id } = useParams();
  const [user, setUser] = useState({ name: "", number: "" });
  const [page, setPage] = useState(0);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [group, setGroup] = useState({ name: "" });
  const [client, setClient] = useState(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    fetchRequiredData();
    loadGroupMessages();
    setupClient();
  }, [id]);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  const fetchRequiredData = async () => {
    const response = await fetchGroup(id);
    if (response.success) {
      setGroup(response.group);
    }
  };

  const loadGroupMessages = async () => {
    const response = await loadMessages(id, page);
    if (response.success) {
      const newMessages = response.messages.messages || [];
      newMessages.reverse();
      setMessages([...newMessages, ...messages]);
      setPage(response.messages.nextPage || 0);
    } else {
      setMessages([]);
    }
    messagesRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const setupClient = async () => {
    const newClient = await createQueueConsumer();
    subscribeToQueue(newClient, id, () => {
      loadGroupMessages();
    });
    setClient(newClient);
  };

  const handleChangeText = ({ target: { value } }) => {
    setText(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || !client) return;
    const message = {
      number: user.number,
      message: text,
      userNumber: user.number,
      groupId: id,
    };
    setText("");
    sendMessage(client, message);
  };

  const handleScroll = ({ target: { scrollTop } }) => {
    const topReached = scrollTop === 0;
    if (topReached && page) loadGroupMessages();
  }

  return (
    <>
      <div className="column">
        <article className="hero is-fullheight-with-navbar notification is-success is-light">
          <div className="content">
            <div className="columns">
              <div className="column is-10">
                <p className="title has-text-success">{group.name}</p>
              </div>
              <AddUserModal groupId={group.id} />
            </div>
          </div>
          <div
            className="content is-small"
            style={{
              maxHeight: "65vh",
              scrollBehavior: "smooth",
              overflowY: "scroll",
            }}
            onScroll={handleScroll}
          >
            {messages.map((message) => (
              <Message key={message.id} message={message} user={user} />
            ))}
            <div ref={messagesRef} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="columns is-gapless">
              <div className="column is-10">
                <div className="field">
                  <div className="control">
                    <input
                      onChange={handleChangeText}
                      type="text"
                      className="input"
                      placeholder="Mensaje"
                      value={text}
                    />
                  </div>
                </div>
              </div>
              <div className="column is-1">
                <div className="field">
                  <div className="control">
                    <button className="button is-success">Enviar</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </article>
      </div>
    </>
  );
}

export default Conversation;

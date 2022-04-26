import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Groups from "../components/Groups";
import NavBar from "../components/NavBar";
import { fetchForNumber } from "../services/groupService";
import { createQueueConsumer, subscribeToQueue } from "../services/queueService";

function Chat() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchRequiredData();
  }, []);

  const getUser = () => {
    const userJson = sessionStorage.getItem("user");
    return userJson ? JSON.parse(userJson) : { name: "", number: 0 };
  }

  const fetchRequiredData = async () => {
    const { groups } = await fetchForNumber(getUser().number);
    groups.forEach(group => group.notifications = 0)
    setGroups(groups);
    consumeMessages(groups);
  };

  const consumeMessages = (groups) => {
    groups.forEach(async (group) => {
      const client = await createQueueConsumer();
      subscribeToQueue(client, group.id, (message) => {
        const user = getUser();
        if (user.number === message.number) return;
        const index = groups.indexOf(group);
        groups[index].notifications += 1;
        setGroups(groups);
      });
    });
  };

  const onGroupCreated = (group) => {
    setGroups([...groups, group]);
    fetchRequiredData();
  };

  const clearNotifications = (groupId) => {
    const group = groups.find(g => g.id === groupId);
    const index = groups.index(group);
    groups[index].notifications = 0;
    setGroups(groups);
  };

  return (
    <>
      <NavBar user={getUser()} />
      <div className="columns is-gapless">
        <Groups
          groups={groups}
          number={getUser().number}
          onGroupCreated={onGroupCreated}
          clearNotifications={clearNotifications}
        />
        <Outlet />
      </div>
    </>
  );
}

export default Chat;

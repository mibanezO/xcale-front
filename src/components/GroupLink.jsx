import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GroupLink({ group, clearNotifications }) {
  const { id, name, notifications } = group;
  const hasNotifications = notifications > 0;

  return (
    <div key={id} className="columns">
      <div className={`column is-${hasNotifications ? 10 : 12}`}>
        <Link to={`/chat/${id}`} onClick={() => clearNotifications(id)}>
          <h5 className="title is-5">{name}</h5>
        </Link>
      </div>
      {hasNotifications && (
        <div className="column is-2">
          <span className="tag is-danger">{notifications}</span>
        </div>
      )}
    </div>
  );
}

export default GroupLink;

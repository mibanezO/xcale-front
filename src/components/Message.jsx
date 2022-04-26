import React from "react";

function Message({ message, user }) {
    const isForUser = `${user.number}` === `${message.number}`;
    const classes = ['notification', 'is-primary'];
    if (!isForUser) {
        classes.push('is-light');
        classes.push('is-light ml-auto');
    }
    const displayName = message.username || message.number;
    return (
        <div className={classes.join(' ')}>
            {!isForUser && (<div><b><u>{displayName}</u>:</b></div>)}
            <div>{message.message}</div>
        </div>
    );
}

export default Message;

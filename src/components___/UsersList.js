import React, { Component } from 'react';
export default class UsersList extends Component {
    render() {
        let users = this.props.users;
        let listItems;
        if (users && users.length) {
            listItems = users.map((user, key) =>
                <li className="userListCell" key={key} value={user.uid}>
                    <div className="table">
                        <div className="tableCell"><input type="checkbox" /></div>
                        <div className="tableCell">{user.userName}</div>
                        <div className="tableCell">
                            <button value="333" onClick={this.props.onClick}>Chat</button>
                        </div>
                    </div>
                </li>
            );
        }
        return (
            <ul>
                {listItems}
            </ul>
        );
    }
}
import React, { Component } from 'react';
import { InputText, Button } from './Chat';
import Common from './common';
import UsersList from './components/UsersList';
import './AdminPanel.css';

export default class AdminPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            connection: false,
            value: '',
            usersCount: 0,
            users: []
        };
        this.handleConnectionClick = this.handleConnectionClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    auth() {
        let userName = this.state.value || 'Support';
        var data = {
                type: 'auth',
                uid: Common.uid(),
                userName: userName
            };
            console.log(JSON.stringify(data));
        return data;
    }

    newUserConnected(data) {
        this.setState((prevState, props) => {
            return {
                usersCount: prevState.usersCount += 1,
                users: data
            }
        });
    }

    parseIncomingMessage(data) {
        // if (data.type && data.type === 'connectedUsers') {
        if (data.length && data[0].type === 'connectedUsers') {
            this.newUserConnected(data);
            console.log('this.state.users = '+this.state.users);
            // createListConnetedUsers(data);
        } else {
        //     createChatElement(data, true);
        }
    }

    componentDidMount() {
        // this.createSocketConnection();
        // console.log(JSON.stringify(this.props));
    }

    createSocketConnection() {
        console.log('Admin createSocketConnection');
        let socketObj = new WebSocket('ws://localhost:5000/', 'echo-protocol');
        let rr = this;
        socketObj.onopen = function() {
            console.log("Connection established");
            socketObj.send(JSON.stringify(rr.auth()));
            // rr.auth();
        };
        socketObj.onmessage = function(event) {
            console.log(event.data);
            // createChatElement(JSON.parse(event.data), true);
            rr.parseIncomingMessage(JSON.parse(event.data));
        };
        socketObj.onerror = function(error) {
            console.log('error');
        };
        socketObj.onclose = function(e) {
            console.log('close');
        };
        console.log(typeof socketObj);
        return socketObj;
    }

    componentWillUpdate(nextProps, nextState) {
        // this.createSocketConnection();
    }

    // shouldComponentUpdate(nextProps, nextState) {
        // console.log('shouldComponentUpdate');
        // console.log(this.props.socketObj);
        // if (nextState.connection !== this.state.connection) {
            // return true;
        // }
        // return false;
    // }

    handleConnectionClick(e) {
        console.log('handleConnectionClick');
        this.setState({
            connection: true
        });
        this.createSocketConnection();
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        console.log('AdminPanel render');
        let text = "Connection " + this.state.connection;
        return (
            <div className="adminPanel">
                <UsersList users={this.state.users} onClick={this.props.onClick}/>
                <InputText onChange={this.handleChange} value={this.state.value}/>
                <Button text={text} onClick={this.handleConnectionClick} />
                <div className="Chats"></div>
            </div>
        );
    }
}
import React, { Component } from 'react';
import './Chat.css';

export default class MessageBlock extends Component {
    render () {
        return (
            <div className="messages">
                <Chat user={this.props.user}/>
            </div>
        );
    }
}

class Chat extends Component {
    render () {
        return (
            <div className="chat">
                <ChatHeader user={this.props.user}/>
                <Summary />
                <ButtonsBlock />
            </div>
        );
    }
}

class ChatHeader extends Component {
    render () {
        return (
            <div className="chatHeader">{this.props.user.uid}</div>
            // <div className="chatHeader">User</div>
        );
    }
}

class UserDialog extends Component {
    render () {
        return (
            <div className="userDialog">
                <RowTableElem />
            </div>
        );
    }
}

class Summary extends Component {
    render () {
        return (
            <div className="summary">
                <UserDialog />
            </div>
        );
    }
}

class RowTableElem extends Component {
    render () {
        return (
            <div className="rowTableElem">
                <div className="outgoing">2454</div>
                <div className="cellElemTime">11:53</div>
            </div>
        );
    }
}

class ButtonsBlock extends Component {
    render() {
        return (
            <div className="buttonsBlock">
                <InputText className="sendText" />
                <Button className="sendMessage" text="Send" />
                <Button className="close" text="Close conection" />
            </div>
        )
    }
}

export class Button extends React.Component {
    render() {
        return (
            <button className={this.props.className} onClick={this.props.onClick}>{this.props.text}</button>
        )
    }
}

export class InputText extends Component {
    render() {
        return (
            <input className={this.props.className} onChange={this.props.onChange} value={this.props.value} />
        )
    }
}
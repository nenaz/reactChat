import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import MessageBlock from './Chat';
import AdminPanel from './AdminPanel';

class App extends Component {
  componentDidMount() {
    // this.createSocketConnection();
    // console.log(JSON.stringify(this.props));
  }

  constructor(props) {
    super(props)
    this.state = {
      newMessage: false
    };
    this.handleChatActive = this.handleChatActive.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('App shouldComponentUpdate');
    return true;
  }

  handleChatActive(e) {
    console.log(e.target.closest('.userListCell').getAttribute('value'));
    let uid = e.target.closest('.userListCell').getAttribute('value');
    ReactDOM.render(<MessageBlock user={{uid}} />, document.getElementsByClassName('Chats')[0]);
  
    // document.getElementsByClassName('Chats')[0].append(<MessageBlock user={{uid}} />);
  }

  render() {
    console.log('App render');
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <AdminPanel socket={this.socketObj} onClick={this.handleChatActive}/>  
        {/* <MessageBlock user="User" /> */}
        {/* <MessageBlock /> */}
      </div>
    );
  }
}

export default App;

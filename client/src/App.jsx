import React from 'react'
import { StreamChat } from 'stream-chat';
import { Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelContainer, ChannelListContainer } from './components';

import './App.css'

const apiKey = 'x9ujmgzvuevv';
const client = StreamChat.getInstance(apiKey);
console.log(client)
// console.log(StreamChat)

const App = () => {
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer/>
        <ChannelContainer/>
      </Chat>
    </div>
  )
}

export default App


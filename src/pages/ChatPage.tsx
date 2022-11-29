import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';

import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Skeleton from '@mui/material/Skeleton';

import { getUser, updateUser } from '../api/Api';
import { IMessage } from '../components/Chat';
import { IUser } from '../components/User';
import { calculateCurrentDay, getToday } from '../components/TimeFuncs';


export default function Chat() {
  const navigate = useNavigate();
  const { id, name } = useParams();
  // const paramsId = id ? id : '';
  const paramsName: string = name ? name : '';

  const [friendInfo, setFriendInfo] = useState<IUser>();
  const [dataUpdated, setDataUpdated] = useState(false);
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [messageValue, setMessageValue] = useState('');
  const { username, isAuth } = useContext(UserContext);

  useEffect(() => {
    if (!dataUpdated) {
      updateInfo();
    }
  }, [dataUpdated]);

  async function updateInfo() {
    const myInfoRes = await getUser(username);
    const myInfo = myInfoRes.userData;

    const friendInfoRes = await getFriendInfo(paramsName);
    const chatIndex = await getMyChatIndex({
      myInfo: myInfo,
      friendInfoRes: friendInfoRes,
    });
    console.log(myInfo.chats[chatIndex].messages);

    setMessages(myInfo.chats[chatIndex].messages);
  }

  async function updateMyChats(newMessage: IMessage) {
    const myInfoRes = await getUser(username);
    const myInfo = myInfoRes.userData;
    const friendInfoRes = await getFriendInfo(paramsName);
    const chatIndex = await getMyChatIndex({
      myInfo: myInfo,
      friendInfoRes: friendInfoRes,
    });
    const preparedChats = await prepareMyChats({
      myInfo: myInfo,
      chatIndex: chatIndex,
      newMessage: newMessage,
    });
    const response = await updateUser(username, preparedChats);
    console.log(response, 'update response');
    setMessages([...messages, newMessage]);
  }
  async function updateFriendChats(newMessage: IMessage) {
    const myInfoRes = await getUser(username);
    const myInfo = myInfoRes.userData;
    const friendInfoRes = await getFriendInfo(paramsName);
    const chatIndex = await getFriendChatIndex({
      myInfo: myInfo,
      friendInfoRes: friendInfoRes,
    });
    const preparedChats = await prepareFriendChats({
      friendInfoRes: friendInfoRes,
      chatIndex: chatIndex,
      newMessage: newMessage,
    });
    const response = await updateUser(paramsName, preparedChats);
    console.log(response, 'update response');
    setMessages([...messages, newMessage]);
  }

  async function getFriendInfo(friendName) {
    const result = await getUser(friendName);

    const response: IUser = {
      _id: result.userData._id,
      name: result.userData.name,
      avatarColor: result.userData.avatarColor,
      chats: result.userData.chats,
    };

    setFriendInfo(response);

    return response;
  }
  async function getMyChatIndex({ myInfo, friendInfoRes }) {
    let chatIndex: number;
    const myChats = myInfo.chats;
    for (let i = 0; i < myChats.length; i++) {
      if (myChats[i].friendId === friendInfoRes._id) {
        chatIndex = i;

        break;
      }
    }

    return chatIndex;
  }
  async function getFriendChatIndex({ myInfo, friendInfoRes }) {
    let chatIndex: number;
    console.log(friendInfoRes);

    const friendChats = friendInfoRes.chats;

    for (let i = 0; i < friendChats.length; i++) {
      if (friendChats[i].friendId === myInfo._id) {
        chatIndex = i;

        break;
      }
    }

    return chatIndex;
  }

  async function prepareMyChats({ myInfo, chatIndex, newMessage }) {
    const myChats = myInfo.chats;

    myChats[chatIndex].messages = [...myChats[chatIndex].messages, newMessage];

    return myChats;
  }
  async function prepareFriendChats({ friendInfoRes, chatIndex, newMessage }) {
    const friendChats = friendInfoRes.chats;

    friendChats[chatIndex].messages = [
      ...friendChats[chatIndex].messages,
      newMessage,
    ];

    return friendChats;
  }

  const handleClick = async (newMessage: IMessage) => {
    updateMyChats(newMessage);
    updateFriendChats(newMessage);
    console.log('click!');
  };

  return isAuth ? (
    <div className="chat_wrapper">
      {friendInfo ? (
        <div className="chat_nav">
          <IconButton
            onClick={() => {
              navigate('/');
            }}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
          <Avatar
            children={friendInfo.name[0].toUpperCase()}
            style={{
              backgroundColor: friendInfo.avatarColor,
              margin: '0 10px',
            }}
            sx={{
              width: 40,
              height: 40,
            }}
          />
          <h3 className="chat_friend_name">{friendInfo.name}</h3>
        </div>
      ) : (
        <div className="chat_nav">
          <IconButton
            onClick={() => {
              navigate('/');
            }}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            style={{ margin: '0 10px' }}
          />
          <Skeleton variant="text" width={40} height={23} />
        </div>
      )}
      <div className="chat">
        <div className="chat_message_container">
          {messages ? (
            (messages as Array<IMessage>).map((item, index) => {
              return (
                <div
                  key={index}
                  className={`chat_message ${
                    item.author === friendInfo.name ? 'your' : 'me'
                  }`}
                >
                  <p className="chat_message_text">{item.content}</p>
                  <h4 className="chat_message_date">{calculateCurrentDay(item.date,false)}</h4>
                </div>
              );
            })
          ) : (
            <div className="chat_message_default">
              Your story is only beginning...
            </div>
          )}
        </div>
        <div className="chat_input_block">
          <input
            type="text"
            className="chat_input"
            placeholder="Write a message..."
            value={messageValue}
            onInput={(e) => {
              setMessageValue((e.target as HTMLInputElement).value);
            }}
          />
          <IconButton
            onClick={() => {
              if (messageValue) {
                const today = getToday();
                console.log(today);

                handleClick({
                  content: messageValue,
                  date: {
                    time: today.time,
                    dayMonthYear: today.dayMonthYear,
                  },
                  author: username,
                });
                setMessageValue('');
              }
            }}
          >
            <SendIcon sx={{ color: '#0077FF' }} />
          </IconButton>
        </div>
      </div>
    </div>
  ) : (
    <div className="main_alert">
      <ErrorOutlineIcon />
      You have to log in to see chats.
    </div>
  );
}

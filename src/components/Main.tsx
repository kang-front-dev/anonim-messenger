import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Avatar, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { UserContext } from './UserContext';
import { getUser, updateUser } from '../api/Api';
import { IChat } from './Chat';
import { calculateCurrentDay, getTimeWeight } from './TimeFuncs';

export default function Main() {
  const navigate = useNavigate();

  const { isAuth, username, chats, setChats } = useContext(UserContext);
  const [dataUpdated, setDataUpdated] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isModalError, setIsModalError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [friendName, setFriendName] = useState('');

  useEffect(() => {
    if (!dataUpdated) {
      update();
      setTimeout(() => {
        setDataUpdated(false);
      }, 2000);
    }
  }, [dataUpdated]);

  async function update() {
    if (username && username !== 'Unknown') {
      const result = await getUser(username);
      const myInfo = result.userData;
      setDataUpdated(true);
      if (result.success) {
        const sortedChats = myInfo.chats.sort((a, b) => {
          if (a.messages.length > 0 && b.messages.length > 0) {
            const aTimeWeight = getTimeWeight(
              a.messages[a.messages.length - 1].date
            );
            const bTimeWeight = getTimeWeight(
              b.messages[b.messages.length - 1].date
            );
            return aTimeWeight - bTimeWeight;
          } else if (a.messages.length! > 0) {
            return 1;
          } else if (b.messages.length! > 0) {
            return -1;
          }
        });
        if (sortedChats.length < 1) {
          setChats([]);
        } else {
          setChats(sortedChats);
        }
      }
    }
  }

  const handleClick = async () => {
    const friendInfo = await getUser(friendName);

    if (friendInfo.success) {
      const checkMyself = await getUser(username);
      const myChats = checkMyself.userData.chats;
      let isChatAlreadyExists = false;

      for (let i = 0; i < myChats.length; i++) {
        if (friendInfo.userData._id === myChats[i].friendId) {
          isChatAlreadyExists = true;
          break;
        }
      }
      console.log(isChatAlreadyExists, 'isChatAlreadyExists');

      if (!isChatAlreadyExists) {
        console.log('creating new chat');

        const responseNewChatAuthor = await updateUser(username, [
          ...chats,
          {
            friendId: friendInfo.userData._id,
            friendName: friendInfo.userData.name,
            avatarColor: friendInfo.userData.avatarColor,
            messages: [],
          },
        ]);
        const responseNewChatFriend = await updateUser(
          friendInfo.userData.name,
          [
            ...friendInfo.userData.chats,
            {
              friendId: checkMyself.userData._id,
              friendName: checkMyself.userData.name,
              avatarColor: checkMyself.userData.avatarColor,
              messages: [],
            },
          ]
        );
        if (responseNewChatAuthor.success && responseNewChatFriend.success) {
          setDataUpdated(false);
          navigate(
            `/chat/${friendInfo.userData._id}/${friendInfo.userData.name}`
          );
        }
      } else {
        navigate(
          `/chat/${friendInfo.userData._id}/${friendInfo.userData.name}`
        );
      }
    } else {
      setIsModalError(true);
      setErrorText(friendInfo.message);
    }
  };

  return (
    <>
      {isAuth ? (
        <Box sx={{ width: '100%' }} className="main">
          <div className="main_title_block">
            <h2 className="main_title">Chats</h2>
            <IconButton
              color="success"
              style={{ padding: '0', marginBottom: '2px' }}
              onClick={() => {
                handleOpen();
              }}
            >
              <PersonAddIcon />
            </IconButton>
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                backgroundColor: '#ffffff',
                padding: '24px',
                borderRadius: '10px',
              }}
            >
              <h3 className="modal-create_title">Create new chat</h3>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  autoFocus={true}
                  error={isModalError}
                  label="Username"
                  helperText={errorText}
                  onInput={(e) => {
                    setIsModalError(false);
                    setErrorText('');
                    setFriendName((e.target as HTMLInputElement).value);
                  }}
                />
                <Button
                  style={{ marginTop: '10px' }}
                  variant="contained"
                  onClick={async () => {
                    if (friendName) {
                      handleClick();
                    } else {
                      setIsModalError(true);
                      setErrorText('Username required!');
                    }
                  }}
                >
                  Create
                </Button>
              </div>
            </Box>
          </Modal>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column-reverse',
              rowGap: '10px',
            }}
          >
            {chats
              ? (chats as Array<IChat>).map((item, index) => {
                  return (
                    <Button
                      key={index}
                      style={{
                        padding: '0',
                        textTransform: 'none',
                        textAlign: 'start',
                      }}
                      onClick={() => {
                        navigate(`/chat/${item.friendId}/${item.friendName}`);
                      }}
                    >
                      <Paper
                        elevation={1}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div className='chat_card_left'>
                          <Avatar
                            children={item.friendName[0].toUpperCase()}
                            style={{
                              backgroundColor: item.avatarColor,
                              marginRight: '10px',
                            }}
                            sx={{
                              width: 45,
                              height: 45,
                            }}
                          />
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                            }}
                          >
                            <h3 className="chat_card_user_name">
                              {item.friendName}
                            </h3>
                            <p className="chat_card_user_descr">
                              {item.messages.length > 0
                                ? item.messages[item.messages.length - 1]
                                    .content
                                : 'History is clear!'}
                            </p>
                          </div>
                        </div>
                        <p className="chat_card_user_date">
                          {item.messages.length > 0
                            ? calculateCurrentDay(
                                item.messages[item.messages.length - 1].date
                              )
                            : ''}
                        </p>
                      </Paper>
                    </Button>
                  );
                })
              : 'No chats'}
          </div>
        </Box>
      ) : (
        <div className="main_alert">
          <ErrorOutlineIcon />
          You have to log in to see chats.
        </div>
      )}
    </>
  );
}

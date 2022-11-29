import { IChat } from '../components/Chat';
import { connection } from '../connection';
export function getUsers() {
  return fetch(`${connection}/getAll`, {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'GET',
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}
export function getUser(username: string) {
  return fetch(`${connection}/getUserData`, {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({ name: username }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}
export function updateUser(username: string, chats: Array<IChat>) {
  console.log({ name: username, chats: chats }, 'updateUser request');

  return fetch(`${connection}/updateUser`, {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({ name: username, chats: chats }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}

import React from 'react'
import { useParams } from 'react-router-dom';
export default function Chat() {
  const chatId = useParams()
  return (
    <div>{`Chat ${chatId}`}</div>
  )
}

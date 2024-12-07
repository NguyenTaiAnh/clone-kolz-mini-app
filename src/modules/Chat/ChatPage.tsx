import React from 'react'
import { useParams } from 'react-router';
import { ChatHeader } from './_components/ChatHeader';
import { MessageBubble } from './_components/MessageBubble';
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const ChatPage = () => {
  const { characterId } = useParams();
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([
    { sender: "You", text: "Hello there", time: "22:45" },
    {
      sender: "The Crypto Lord",
      text: "Hey! How’s it going? 😊",
      time: "22:46",
    },
    {
      sender: "You",
      text: "Yo, it’s The Crypto Lord here—your go-to for all things crypto...",
      time: "22:47",
    },
  ]);
  const handleSendMessage = () => {
    if (message.trim() === "") return;
    const newMessage = {
      sender: "You",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleKeyDown = (e:any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <div className='flex flex-col flex-1'>
      <ChatHeader characterId={characterId} />

      <div className='bg-[#222326] flex-1 p-4 overflow-y-auto'>
        {messages.map((message, index) => (
          <MessageBubble key={index} {...message} />
        ))}
      </div>

      <div className='p-4 flex items-center gap-2'>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          type='text'
          placeholder='Speak with The Crypto Lord...'
          className='flex-1 p-2 rounded-3xl bg-white-500 text-black outline-none'
        />
        <button className='p-2 bg-blue-600 rounded-full' onClick={() => handleSendMessage()}>
          <ArrowRightIcon className='h-5 w-5' />
        </button>
      </div>
    </div>
  )
}

export default ChatPage

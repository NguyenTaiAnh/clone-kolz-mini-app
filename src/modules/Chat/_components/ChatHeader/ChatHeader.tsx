import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
interface ChatHeaderProps{
    characterId:any
}
const ChatHeader:React.FC<ChatHeaderProps> = ({ characterId }) => {
  const navigate = useNavigate();
  console.log({characterId})
  return (
    <div className="bg-gray-800 p-4 flex items-center justify-between">
      <button onClick={() => navigate("/")} className="flex items-center space-x-2 text-white hover:text-gray-300 bg-gray-600 rounded-2xl p-2">
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Back</span> 
      </button>
      <div>
        <h2 className="text-lg font-bold">The Crypto Lord</h2>
        <p className="text-sm text-gray-400">Lvl 5</p>
      </div>
    </div>
  );
};

export default ChatHeader;
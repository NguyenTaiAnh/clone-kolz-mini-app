import React from "react";
interface MessageBubbleProps{
    sender:any,
    text:any,
    time:any
}
const MessageBubble:React.FC<MessageBubbleProps> = ({ sender, text, time }) => {
  const isUser = sender === "You";

  return (
    <div className={`flex ${isUser ? "justify-start" : "justify-end"} mb-4`}>
      <div
        className={`p-4 max-w-xs rounded-lg ${
          isUser ? "bg-[#081222] text-white" : "bg-[#081222] text-gray-200"
        }`}
      >
        <div className="flex justify-between">
            <span className="text-xs text-gray-400">{sender}</span>
            <span className="text-xs text-gray-400">{time}</span>
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default MessageBubble;

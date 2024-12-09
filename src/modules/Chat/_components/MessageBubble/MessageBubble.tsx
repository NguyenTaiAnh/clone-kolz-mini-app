import React from "react";
interface MessageBubbleProps{
    sender:any,
    text:any,
    time:any
}
const MessageBubble:React.FC<MessageBubbleProps> = ({ sender, text, time }) => {
  const isUser = sender === "You";
  console.log({time})
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-5`}>
      <div
        className={`px-5 py-[10px] max-w-xs ${
          !isUser ? "bg-white text-black rounded-r-[20px] rounded-tl-[20px]" : "bg-[#3B59A8] text-white rounded-l-[20px] rounded-tr-[20px]"
        }`}
      >
        {/* <div className="flex justify-between">
            <span className="text-xs text-gray-400">{sender}</span>
            <span className="text-xs text-gray-400">{time}</span>
        </div> */}
        <p>{text}</p>
      </div>
    </div>
  );
};

export default MessageBubble;

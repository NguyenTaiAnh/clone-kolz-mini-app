import React from 'react';
import { CalendarIcon, CoinIcon } from '@assets/images';
interface ReferralItemProps{
    name:string,
    reward:any
}
const ReferralItem:React.FC<ReferralItemProps> = ({ name, reward }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-[#ffffff] rounded-2xl mb-4">
      <div className="flex items-center space-x-2">
          <img src={CalendarIcon} className='w-8 h-8' />
        <span className="text-black font-bold">{name}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-yellow-400 font-bold text-xl">+{reward}</span>
        <img src={CoinIcon} className='w-8 h-8' />
      </div>
    </div>
  );
};

export default ReferralItem;

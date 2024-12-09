import React from 'react';

interface CharacterCardProps {
    avt_url:string,
    level:any,
    onClick:any
}
const CharacterCard:React.FC<CharacterCardProps> = ({ avt_url, level, onClick }) => {
    return (
        <div>
            <div className="rounded-3xl p-4 flex flex-col items-center bg-[#3B59A8] border-white border-[1px] mb-[7px]">
                <img
                    src={avt_url}
                    alt="Character"
                    className="rounded-full w-24 h-24 mb-4"
                />
                <button className="px-2 py-[6px] rounded-[30px] mb-2 text-[20px] text-black bg-white" onClick={onClick}>
                    Chat With
                </button>
            </div>
            <div className="text-lg text-white font-bold text-center">Lvl {level}</div>
        </div>
    );
};

export default CharacterCard;
import React from 'react';

interface CharacterCardProps {
    avt_url:string,
    level:any,
    onClick:any
}
const CharacterCard:React.FC<CharacterCardProps> = ({ avt_url, level, onClick }) => {
    return (
        <div>
            <div className="rounded-3xl p-4 flex flex-col items-center" style={{background: '#193782'}}>
                <img
                    src={avt_url}
                    alt="Character"
                    className="rounded-full w-24 h-24 mb-4"
                />
                <button className="px-4 py-2 rounded-2xl mb-2" style={{ background: '#D9D9D9', color: '#1E56F6', fontWeight: 'bolder' }} onClick={onClick}>
                    Chat with
                </button>
            </div>
            <div className="text-lg text-blue-400 text-center">Lvl {level}</div>
        </div>
    );
};

export default CharacterCard;
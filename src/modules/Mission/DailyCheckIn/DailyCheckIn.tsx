import React from 'react';
import { format, isToday } from "date-fns";
import { useStore } from '@stores';
import { CalendarIcon, CheckInRed } from '@assets/images';

const DailyCheckIn = () => {
    const currentUser = useStore((state) => state.currentUser)

    const [todayCheckin, setTodayCheckin] = React.useState(false);

    React.useEffect(() => {
        if (currentUser && currentUser.latest_checkin) {
            const isCheckedInToday = isToday(new Date(currentUser.latest_checkin));
            setTodayCheckin(isCheckedInToday);
        }
    }, [currentUser]);

    const renderLatestCheckin = () => {
        if (currentUser?.latest_checkin)
            return format(new Date(currentUser?.latest_checkin), "yyyy-MM-dd");
        return "No check-in yet";
    };

    return currentUser && (
        <div>
            <h3 className="text-2xl font-semibold mb-5 text-white">Daily Check-in</h3>
            <div className="bg-[#ffffff] px-4 py-2 rounded-2xl mb-6">
                <div className=" flex justify-between text-black font-semibold">
                    <img src={CalendarIcon} className='w-10 h-10' />
                    <span className='flex-grow flex items-center ml-4 text-base'>Last checked-in: { renderLatestCheckin() }</span>
                    { todayCheckin && (
                        <button className="px-4 py-2">
                            <img src={CheckInRed} className='w-8 h-8' />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DailyCheckIn;

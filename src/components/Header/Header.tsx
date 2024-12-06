import React from 'react'

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between p-4 bg-[#222326] text-white">
    <div className="flex items-center">
      <img src={''} className="h-14 w-14 mr-2" />
      <div className="flex flex-col items-start p-1 min-w-[200px]">
        <span className="text-white font-semibold">username</span>
        <span className="text-yellow-500 font-bold text-xl">
        energies
        </span>
      </div>
    </div>
    <div className="flex items-center">
      {/* <WalletIcon
        onClick={() => setShowPopup(true)}
        style={{ width: "40px", height: "40px" }}
      /> */}
    </div>
  </div>
  )
}

export default Header

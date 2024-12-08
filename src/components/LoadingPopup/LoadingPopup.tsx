import React from 'react'

const LoadingPopup = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='flex items-center justify-center'>
        <div className='animate-loading w-[50px] h-[50px] border-[6px] border-[#E2F0E8] shadow-[0_0_8px_#E2F0E8,inset_0_0_8px_#E2F0E8] '></div>
      </div>
    </div>
  )
}

export default React.memo(LoadingPopup)

import React from 'react'

const Notify = ({show}) => {
  return (
    <>
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-10"
      onClick={() => show(false)}
    ></div>

    <div className="w-[22rem] rounded-xl h-[35rem] hide-scrollbar overflow-y-auto bg-black bg-opacity-90 fixed top-[50%] left-[50%] right-[auto] bottom-[auto] -mr-[50%] transform translate-x-[-50%] translate-y-[-50%]  z-20 border-2">
      <h2 className="text-lg text-center pt-2 font-semibold font-sans">
        Notifications
      </h2>
      <div className='p-10 flex flex-col gap-5'>
        <p>notification</p>
      </div>
    </div>
  </>
  )
}

export default Notify
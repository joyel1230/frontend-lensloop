import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import FullPost from '../post/FullPost'

const ProfilePostSection = ({username}) => {
  return (
    <>
        <div className="px-1 sm:w-[85%] sm:mx-auto">
        <div className="flex justify-between my-2 text-lg sm:text-2xl border-b-2 border-t-2 border-current py-3">
          <div className="flex items-center gap-4">
            <h1 className="cursor-pointer">Posts</h1>
            <Link to={`/new-post`}>
              <AiOutlinePlusCircle />
            </Link>
          </div>
          <div>
            <h1 className="cursor-pointer">Saved</h1>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="cursor-pointer">ADS</h1>
            <Link to={`/ad-post`}>
              <AiOutlinePlusCircle />
            </Link>
          </div>
        </div>
      </div>
      <div className="cards flex flex-wrap gap-10 justify-center">
        <FullPost userId={username} />
        <FullPost userId={username} />
        <FullPost userId={username} />
        <FullPost userId={username} />
      </div>
    </>
  )
}

export default ProfilePostSection
import React from 'react'

const Post = (props) => {
    const {w}=props
  return (
    <>
        <img src="https://images.pexels.com/photos/16978823/pexels-photo-16978823/free-photo-of-sea-city-sunset-water.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" width={w} alt="" />
    </>
  )
}

export default Post
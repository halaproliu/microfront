// import React, { useEffect, useCallback } from 'react'
import React from 'react'
import './index.css'

const MyButton = (props) => {
  const { text = '测试按钮', onClick } = props
  const onClickHandler = () => {
    console.log(`MyButton ${text} is clicked`);
    onClick?.()
  }
  // const onClickHandler = useCallback(() => {
  //   console.log(`MyButton ${text} is clicked`);
  //   onClick?.()
  // }, [text, onClick])
  // useEffect(() => {
  //   console.log('MyButton is mounted.')
  //   return () => console.log('MyButton is unmounted.')
  // }, [])

  console.log('MyButton is rendered.');
  return (
    <button className="btn" onClick={onClickHandler}>{text}</button>
  )
}

export default MyButton
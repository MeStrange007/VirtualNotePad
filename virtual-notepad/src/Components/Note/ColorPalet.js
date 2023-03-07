import React, {useState} from 'react'
import { COLOR_PALET } from './constants'


function ColorPalet(props) {
  
  const colorHandler = (value) => {
    props.setColor(value)
  }

  return (
    <div>
      {COLOR_PALET.map((obj,index)=>{
        return <button key={index} onClick={()=>{colorHandler(obj.value)}}>{obj.color}</button>
      })}
    </div>
  )
}

export default ColorPalet
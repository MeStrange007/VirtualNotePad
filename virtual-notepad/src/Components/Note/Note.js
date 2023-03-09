import React, { useEffect, useRef, useState } from 'react'
import ColorPalet from './ColorPalet'
import NoteCanvas from './NoteCanvas'
import loadData from './loadData'
import axios from 'axios'
import { BATCH_SIZE } from './constants'

function Note() {
    const [drawColor,setDrawColor] = useState({R:0,G:0,B:0})
    const [data,setData] = useState({data : []})
    const [canvasWidth,setCanvasWidth] = useState(window.innerWidth)
    const [canvasHeight,setCanvasHeight] = useState(window.innerHeight)
    const [context,setContext] = useState()
    const [startPos,setStartPos] = useState({x:0,y:0,batchStart:{x:0,y:0}})
    const [pageMovement,setPageMovement] = useState({move:false,x:0,y:0})
    const [drawMovement,setDrawMovement] = useState({move:false,x:0,y:0})
    const dataFetchRef = useRef(false)

  useEffect(()=>{
    if(dataFetchRef.current) return;
    dataFetchRef.current = true;
    (async ()=> {
      // const resp = await axios.post("http://localhost:4444/newNote",{"name":"NewName","BATCH_SIZE":BATCH_SIZE})
      // console.log(resp.data);
      const dataFetching = loadData(canvasWidth,canvasHeight) 
      setData(await dataFetching)      
    })()
  },[])

  return (
    <div>
        <ColorPalet setColor={setDrawColor}/>
        <NoteCanvas canvasWidth={canvasWidth} 
                    canvasHeight={canvasHeight}
                    drawColor={drawColor} 
                    startPos={startPos} 
                    setStartPos={setStartPos} 
                    pageMovement={pageMovement} 
                    setPageMovement={setPageMovement} 
                    drawMovement={drawMovement} 
                    setDrawMovement={setDrawMovement} 
                    context={context} 
                    setContext={setContext}
                    data={data}/>
    </div>
  )
}

export default Note
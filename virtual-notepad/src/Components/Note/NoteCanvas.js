import React, { useEffect, useRef, useState } from 'react'
import { BATCH_SIZE } from './constants'

function NoteCanvas(
    {canvasWidth,canvasHeight,
    drawColor,startPos,setStartPos,
    pageMovement,setPageMovement,
    drawMovement,setDrawMovement,
    context,setContext,data}
) {
    
    useEffect(()=>{
        const cvs = canvasRef.current
        cvs.width = canvasWidth
        cvs.height = canvasHeight
        setContext(cvs.getContext('2d'))
    },[])

    useEffect(()=>{
        if(data.data.length!=0){
            for(var i=0;i<canvasHeight/BATCH_SIZE;i++){
                for(var j=0;j<canvasWidth/BATCH_SIZE;j++){
                    for(var k=0;k<BATCH_SIZE;k++){
                        for(var l=0;l<BATCH_SIZE;l++){
                            context.fillStyle=`rgb(${data.data[i][j][k][l][0]},${data.data[i][j][k][l][1]},${data.data[i][j][k][l][2]})`;
                            context.fillRect(j*BATCH_SIZE+l,i*BATCH_SIZE+k,1,1);
                        }
                    }
                }
            }
        }
      },[data])

    useEffect(()=>{
        if(context) context.strokeStyle=`rgb(${drawColor.R},${drawColor.G},${drawColor.B})`;       
    },[drawColor])

    const canvasRef = useRef(null)
    
    const mouseDownHandler = (e) => {
        if(e.ctrlKey){
            setPageMovement({move:true,x:e.clientX-e.target.offsetLeft,y:e.clientY-e.target.offsetTop})
        }
        setDrawMovement({move:true,x:e.clientX-e.target.offsetLeft,y:e.clientY-e.target.offsetTop})
    }

    const mouseUpHandler = (e) => {
        if(pageMovement.move){
            pageMovement.move=false
            setPageMovement(pageMovement)
        }
        if(drawMovement.move){
            drawMovement.move=false
            setDrawMovement(drawMovement)
        }
        console.log(startPos);
    }

    const mouseMoveHandler = (e) => {
        if(pageMovement.move && e.ctrlKey){
            startPos.x=startPos.x+(e.clientX-e.target.offsetLeft-pageMovement.x)
            startPos.y=startPos.y+(e.clientY-e.target.offsetTop-pageMovement.y)
            setPageMovement({move:true,x:e.clientX-e.target.offsetLeft,y:e.clientY-e.target.offsetTop})
            setStartPos({x:startPos.x,y:startPos.y,batchStart:{x:startPos.x-(startPos.x % BATCH_SIZE), y:startPos.y-(startPos.y % BATCH_SIZE)}})
            
        }
        if(drawMovement.move){
            context.beginPath();
            context.moveTo(drawMovement.x, drawMovement.y);
            context.lineTo(e.clientX-e.target.offsetLeft, e.clientY-e.target.offsetTop);
            context.closePath();
            context.stroke();            
            setDrawMovement({move:true,x:e.clientX-e.target.offsetLeft,y:e.clientY-e.target.offsetTop})
        }
    } 

  return (
    <canvas ref={canvasRef} onMouseDown={(e)=>mouseDownHandler(e)} onMouseMove={(e)=>mouseMoveHandler(e)} onMouseUp={(e)=>mouseUpHandler(e)}/>
  )
}

export default NoteCanvas
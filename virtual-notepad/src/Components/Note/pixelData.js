import { BATCH_SIZE } from './constants'

const pixelData =  (canvasWidth,canvasHeight) => {

    return new Promise((resolve,reject)=>{
        let arr = [];
        for(var i=0;i<canvasHeight/BATCH_SIZE;i++){
            arr.push([])    
            for(var j=0;j<canvasWidth/BATCH_SIZE;j++){
                arr[i].push([])
                for(var k=0;k<BATCH_SIZE;k++){
                    arr[i][j].push([])
                    for(var l=0;l<BATCH_SIZE;l++){
                        arr[i][j][k].push([255,255,255])
                    }
                }
            }
        }
        resolve({data:arr})
    })
}

export default pixelData
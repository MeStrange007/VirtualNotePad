import { BATCH_SIZE } from './constants'

const loadData =  (canvasWidth,canvasHeight) => {

    return new Promise((resolve,reject)=>{
        let arr = [];
        console.log(canvasHeight,canvasWidth);
        for(var i=0;i<canvasHeight/BATCH_SIZE;i++){
            arr.push([])    
            for(var j=0;j<canvasWidth/BATCH_SIZE;j++){
                arr[i].push([])
                for(var k=0;k<BATCH_SIZE;k++){
                    arr[i][j].push([])
                    for(var l=0;l<BATCH_SIZE;l++){
                        if(i+1>=canvasHeight/BATCH_SIZE || j+1>=canvasWidth/BATCH_SIZE){
                            arr[i][j][k].push([255,0,255])
                        }
                        arr[i][j][k].push([0,0,0])
                    }
                }
            }
            console.log(i);
        }
        resolve({data:arr})
    })
}

export default loadData
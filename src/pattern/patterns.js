const allPatternsFixed=
    [
        {
            "green":[
                1,2,3,4,5,6,10,11,15,16,20,21,22,23,24,25
            ],
            "blue":[
                7,9,13,18,19
            ],
            "red":[7,13,19]
        },
        {
            "green":[
                1,2,3,4,5,6,10,11,15,16,20,21,22,23,24,25
            ],
            "blue":[
                7,9,13,18,19
            ],
            "red":[12,18,9]
        },
        {    
            "green":[
                1,2,3,4,5,6,10,11,15,16,20,21,22,23,24,25
            ],
            "blue":[
                7,9,13,18,19
            ],
            "red":[17,8,14]
        }
    ]   

    let allPatterns=allPatternsFixed
    let currInd=0;
    export const tilePattern=()=>{
        var currPattern=allPatterns[currInd];
        var temp_tiles=Array.from({ length: 5 }, () => Array(5).fill(' '));
        for(let i=0;i<currPattern.green.length;i++){
            var x=Math.floor((currPattern.green[i]-1)/5);
            var y=(currPattern.green[i]-1)%5;
            // console.log('before assigning green to',x,y)
            temp_tiles[x][y]='green';
            // console.log('after assigning green')
        }
        for(let i=0;i<currPattern.blue.length;i++){
             x=Math.floor((currPattern.blue[i]-1)/5);
             y=(currPattern.blue[i]-1)%5;
            // console.log(x,y)
            temp_tiles[x][y]='blue';
        }
        for(let i=0;i<currPattern.red.length;i++){
            var z=Math.floor((currPattern.red[i]-1)/5);
            var w=(currPattern.red[i]-1)%5;
            // console.log(z,w)
            temp_tiles[z][w]='red';
        }
        const currObj={
            "level":1,
            "time_interval":500,
            "pattern":temp_tiles

        }

        currInd=(currInd+1)%allPatterns.length;
        return currObj
    }
export const removeBlueTileHandler=(ind)=>{
    console.log(ind)
    for(let i=0;i<allPatterns[0].blue.length;i++){
        if(allPatterns[0].blue[i]===ind){
            allPatterns[0].blue=allPatterns[0].blue.filter((currind)=>{return currind!==ind})
        }
    }
    allPatterns[1].blue=allPatterns[0].blue;
    allPatterns[2].blue=allPatterns[0].blue;
    // console.log(allPatterns)
}
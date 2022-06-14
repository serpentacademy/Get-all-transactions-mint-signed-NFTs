const fs = require('fs');

let fromI: number = 3070
let toI: number = 3511
for (let i=fromI; i<= toI; i++){
  fs.readFile('transactions/'+i+'.txt', 'utf8', (err:string, data:Uint8ClampedArrayConstructor) => {
    if (err) {
      console.error(err);
      return;
    }
    try{
      let postTokenBalances = JSON.parse(data.toString().trim())
      let postTokenBalancesO =  postTokenBalances["meta"]["postTokenBalances"];
      let mintS = postTokenBalancesO[0].mint;
      if (postTokenBalancesO[0]["uiTokenAmount"].decimals == 0 && postTokenBalancesO[0]["uiTokenAmount"].uiAmount == 1){
  console.log("mint: "+mintS)
  fs.writeFileSync("mints/"+mintS+".txt", "")
      }
     }
     catch(err){
  console.log("error not a mint tx")
     }
    
    console.log();
  });
}


const fs = require('fs');

fs.readFile('transactions/37.txt', 'utf8', (err:string, data:Uint8ClampedArrayConstructor) => {
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
    }
   }
   catch(err){

   }
  
  console.log();
});
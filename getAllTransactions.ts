import {PublicKey, Connection, clusterApiUrl, ConfirmedSignaturesForAddress2Options} from '@solana/web3.js';
const fs = require('fs')

let globalI = 5746;
//last transaction
//let beforeString = "5pEuabGkJxv7v32iJeSVoPWbraWURjvNT12e18YUHGoEsgPePdqy3GzBeYqijcikg7QQbU4fDUHzmYUGbRG5erSJ"
let beforeString = "A TRANSACTION SIGNATURE"

const connection = new Connection(clusterApiUrl("mainnet-beta"));
async function getTransactionsOfUser(address: string, connection: Connection, beforeS: string, limitI: number) {
  console.log({ address });
  try {
    const publicKey = new PublicKey(address);
    const transSignatures =
      await connection.getSignaturesForAddress(publicKey, {limit:limitI, before: beforeS} );
    console.log({ transSignatures });
    const transactions = [];
    for (let i = 0; i < transSignatures.length; i++) {
      const signature = transSignatures[i].signature;
      const confirmedTransaction = await connection.getConfirmedTransaction(
        signature,
      );
      if (confirmedTransaction) {
        const { meta } = confirmedTransaction;
        if (meta) {
          const oldBalance = meta.preBalances;
          const newBalance = meta.postBalances;
          const amount = oldBalance[0] - newBalance[0];
          const transWithSignature = {
            signature,
            ...confirmedTransaction,
            fees: meta?.fee,
            amount,
          };
          transactions.push(transWithSignature);
        }
      }
    }

    writeTransactions(transactions)

    return transactions;
  } catch (err) {
    throw err;
  }
}

function writeTransactions(transactions:any[]){
  
  for (let i=0; i< transactions.length; i++){
    const content = JSON.stringify(transactions[i])+"";

    try {
      fs.writeFileSync(`transactions/${globalI}.txt`, content);
      // file written successfully
      globalI+=1;
    } catch (err) {
      console.error(err);
    }
  }
  var delayInMilliseconds = 3000; //1 second

  setTimeout(function() {
    //your code to be executed after 1 second
  }, delayInMilliseconds);  getTransactionsOfUser("YOUR PUBLIC WALLET ADDRESS", connection, JSON.parse(JSON.stringify(transactions[transactions.length-1]))["signature"], 1);
}

  let options =""
  getTransactionsOfUser("YOUR PUBLIC WALLET ADDRESS", connection, beforeString, 5);
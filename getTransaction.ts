import {PublicKey, Connection, clusterApiUrl, ConfirmedSignaturesForAddress2Options} from '@solana/web3.js';
const fs = require('fs')

let globalI = 3635;
//last transaction
//let beforeString = "5pEuabGkJxv7v32iJeSVoPWbraWURjvNT12e18YUHGoEsgPePdqy3GzBeYqijcikg7QQbU4fDUHzmYUGbRG5erSJ"
let beforeString = "3eAMATVo3iP6d3BAsNsTpDw6tWL7AvMHbvJaduo4TQxLJh6QTCHfvNT3SXugvnaDSp1Xej22fo82nziXnzBUr4FX"

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
        console.log(signature)
      }
    }


    return transactions;
  } catch (err) {
    throw err;
  }
}
getTransactionsOfUser("9m5kFDqgpf7Ckzbox91RYcADqcmvxW4MmuNvroD5H2r9", connection, beforeString, 5);
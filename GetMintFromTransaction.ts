import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { clusterApiUrl, Connection } from "@solana/web3.js";

(async () => {
  const MY_WALLET_ADDRESS = "YOUR PUBLIC WALLET ADDRESS";
  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

  const accounts = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID, // new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
    {
      filters: [
        {
          dataSize: 165, // number of bytes
        },
        {
          memcmp: {
            offset: 32, // number of bytes
            bytes: MY_WALLET_ADDRESS, // base58 encoded string
          },
        },
      ],
    }
  );

  console.log(
    `Found ${accounts.length} token account(s) for wallet ${MY_WALLET_ADDRESS}: `
  );
  await accounts.forEach((account, i) => {
    // account.account.data;
    // let amountI = account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"];
    // let mint_s = account.account.data["parsed"]["info"]["mint"]
console.log(
      `-- Token Account Address ${i + 1}: ${account.pubkey.toString()} --`
    );
    // console.log(`Mint: ${account.account.data["parsed"]["info"]["mint"]}`);
    // console.log(
    //   `Amount: ${account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"]}`
   
  });

})();
const express = require('express')
const cors = require('cors')
const jose = require('jose')
const app = express()
const PORT= 1024 || process.env.PORT;

app.use(cors())
app.use(express.json())

app.post('/api/verify',async(req,res)=>{

const idToken = req.headers.authorization?.split(' ')[1];

// passed from the frontend in the request body
const app_pub_key = req.body.appPubKey;
// Get the JWK set used to sign the JWT issued by Web3Auth
const jwks = jose.createRemoteJWKSet(new URL("https://api-auth.web3auth.io/jwks"));

// Verify the JWT using Web3Auth's JWKS
const jwtDecoded = await jose.jwtVerify(idToken, jwks, { algorithms: ["ES256"] });

// Checking `app_pub_key` against the decoded JWT wallet's public_key
if ((jwtDecoded.payload).wallets[0].public_key === app_pub_key) {
  // Verified
  res.status(200).json({name: 'Verification Successful'})
} else {
  res.status(400).json({name: 'Verification Failed'})
}
})
app.listen(PORT,()=>{
    console.log(`Server is running at PORT: ${PORT}`)
})
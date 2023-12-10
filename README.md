# Project Name: web3Auth

### Description:
🔐 This project aims to facilitate authentication through Web3 and streamline user login processes using various social providers and authentication platforms.

### YouTube Link:
🎥 [YouTube Tutorial](https://youtu.be/FCcj5_ReYMg)

### Important Steps:

1. **Clone the Repository:** 
   ```bash
   git clone https://github.com/kshitijofficial/web3authentication.git
   ```

2. **Navigate to Client Directory:**
   ```bash
   cd client
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Configuration:**
   - Go to `config/config.js` and input your:
     - Client ID
     - Chain Configuration
     - Contact Address

   - In `utils/authService.js`, enter the client ID from Auth0. Visit [Auth0](https://auth0.com/) for details.

   - Update `components/Login.js`:
     - Enter the domain from Auth0 in the domain field.

5. **Start Client:**
   ```bash
   npm start
   ```

6. **Navigate to Server Directory:**
   ```bash
   cd ../server
   ```

7. **Install Server Dependencies:**
   ```bash
   npm install
   ```

8. **Start Server:**
   ```bash
   npm start
   ```

### Important Links:
- 🌐 [Web3Auth Dashboard Login](https://dashboard.web3auth.io/login)
- 🚀 [Quick Start Guide - Plug and Play SDK (React)](https://web3auth.io/docs/quick-start?product=Plug+and+Play&sdk=Plug+and+Play+Web+No+Modal+SDK&platform=React)
- 🔗 [LinkedIn Authentication Provider Setup](https://web3auth.io/docs/auth-provider-setup/social-providers/linkedin)
- 📝 [Google Authentication Guide](https://web3auth.io/docs/content-hub/guides/google)
- 🔑 [Auth0 Authentication Guide](https://web3auth.io/docs/content-hub/guides/auth0)

For detailed instructions and usage, refer to the [Web3Auth Documentation](https://web3auth.io/docs/).

import {ethers} from 'ethers';
import './App.css';
import contractABI from "./abi.json";

function App() {
    const contractAddress = "0x4271d1840F1f5B021A056A9F1C9Ef2e1a510289e";

    async function requestAccount() {
        await window.ethereum.request({method: 'eth_requestAccounts'});
    }

    async function setMessage() {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            await window.ethereum.enable();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const transaction = await contract.setMessage("Hello World!");
            await transaction.wait();
            console.log('Message set!');
        }
    }

    async function getMessage() {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            await window.ethereum.enable();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            const data = await contract.getMessage();
            console.log('Message retrieved!', data);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <button onClick={setMessage}>Set Message</button>
                </div>
                <div>
                    <button onClick={getMessage}>Get Message</button>
                </div>
            </header>
        </div>
    );
}

export default App;

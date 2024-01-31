import {ethers} from 'ethers';
import './App.css';
import contractABI from "./abi.json";
import {useState} from "react";

function App() {
    const contractAddress = "0x8468D5dd0e61920C65744b6BC42f2D13D37fD759";

    async function requestAccount() {
        await window.ethereum.request({method: 'eth_requestAccounts'});
    }

    const [inputMessage, setInputMessage] = useState('');
    const [outputMessage, setOutputMessage] = useState('');// Renamed state variable

    const handleMessageChange = (e) => {
        setInputMessage(e.target.value);
    }

    async function sendMessageToContract() { // Renamed function
        if (typeof window.ethereum !== 'undefined' && window.ethereum.isConnected()) {
            await requestAccount();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            try {
                const transaction = await contract.setMessage(inputMessage);
                await transaction.wait();
                // const message = await contract.getMessage();
                console.log(`Message set`);
                setInputMessage('');
            } catch (err) {
                console.error('Error:', err);
            }
        }
    }

    async function getMessageFromContract() {
        if (typeof window.ethereum !== 'undefined' && window.ethereum.isConnected()) {
            await requestAccount();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            try {
                const message = await contract.getMessage();
                console.log('Message retrieved');
                setOutputMessage(message);
            } catch (err) {
                console.error('Error:', err);
            }
        }
    }

    return (<div className="container">
        <header className="header">
            <h1>Ethereum Message App</h1>
        </header>
        <div className="input-container">
            <input
                className="input"
                type="text"
                value={inputMessage}
                onChange={handleMessageChange}
                placeholder="Enter your message"
            />
            <button className="button" onClick={sendMessageToContract}>
                Set Message
            </button>
        </div>
        <button className="button" onClick={getMessageFromContract}>
            Get Message
        </button>
        <div className="output-container">
            <p>{outputMessage}</p>
        </div>
    </div>);
}

export default App;

// components/Metamask.jsx
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function Metamask() {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const checkIfWalletIsConnected = async () => {
            const { ethereum } = window;
            if (!ethereum) {
                console.log("Make sure you have MetaMask!");
                return;
            } else {
                console.log("We have the ethereum object", ethereum);
            }

            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length !== 0) {
                const account = accounts[0];
                setAccount(account);
                console.log("Found an authorized account:", account);
            } else {
                console.log("No authorized account found");
            }
        };

        checkIfWalletIsConnected();
    }, []);

    const connectWalletHandler = async () => {
        const { ethereum } = window;
        if (!ethereum) {
            alert("Please install MetaMask!");
            return;
        }

        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected", accounts[0]);
            setAccount(accounts[0]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <button onClick={connectWalletHandler} className="metamask-connect-button">
            {account ? `Connected: ${account}` : "Connect to MetaMask"}
        </button>
    );
}

export default Metamask;

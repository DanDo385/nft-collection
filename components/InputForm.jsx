// components/InputForm.jsx
"use client"
import { useState } from 'react';

function InputForm({ onSubmit, contract }) {
    const [ipfsAddress, setIpfsAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (contract && ipfsAddress) {
            try {
                const txn = await contract.mintNFT(window.ethereum.selectedAddress, `ipfs://${ipfsAddress}`);
                await txn.wait();
                onSubmit(ipfsAddress);  // Handle the display or storage of NFT data after minting
            } catch (err) {
                console.error('Minting failed:', err);
                alert("Minting failed. Make sure you are the admin.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={ipfsAddress}
                onChange={e => setIpfsAddress(e.target.value)}
                placeholder="Enter IPFS Metadata URL"
                className="input"
            />
            <button type="submit" className="button">Mint NFT</button>
        </form>
    );
}

export default InputForm;

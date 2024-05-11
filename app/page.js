// app/page.js
"use client"
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import InputForm from '../components/InputForm';
import NFTCard from '../components/NFTCard';
import Metamask from '../components/Metamask';
import NFTContractFactory from '../artifacts/contracts/NFTContractFactory.sol/NFTContractFactory.json';  // Adjust the path as necessary

export default function Home() {
    const [nfts, setNfts] = useState([]);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined" && window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const nftContract = new ethers.Contract(
                '0x5FbDB2315678afecb367f032d93F642f64180aa3',  // Replace with actual contract address
                NFTContractFactory.abi,
                signer
            );
            setContract(nftContract);
        }
    }, []);
    

    const handleNewNFT = (ipfsAddress) => {
        const newNft = {
            id: nfts.length,
            image: `https://ipfs.io/ipfs/${ipfsAddress}`,
            name: `NFT #${nfts.length + 1}`,
            description: 'Description of newly minted NFT'
        };
        setNfts([...nfts, newNft]);
    };

    return (
        <div className="container mx-auto p-4">
            <Metamask />
            <InputForm onSubmit={handleNewNFT} contract={contract} />
            <div className="grid grid-cols-3 gap-4">
                {nfts.map(nft => (
                    <NFTCard key={nft.id} nft={nft} />
                ))}
            </div>
        </div>
    );
}
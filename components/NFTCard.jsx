// components/NFTCard.jsx
export default function NFTCard({ nft }) {
    return (
        <div className="border rounded p-4">
            <img src={nft.image} alt={nft.name} className="w-full h-auto" />
            <h3 className="text-xl font-bold">{nft.name}</h3>
            <p>{nft.description}</p>
        </div>
    );
}

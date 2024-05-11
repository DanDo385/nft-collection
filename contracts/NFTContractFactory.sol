// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTContractFactory is ERC721URIStorage {
    uint256 public tokenCount;
    address public admin;

    constructor() ERC721("MyNFTCollection", "MNFT") {
        tokenCount = 0;
        admin = msg.sender; 
    }

    function mintNFT(address to, string memory tokenURI) public {
        require(msg.sender == admin, "Only admin can mint");
        _safeMint(to, tokenCount);
        _setTokenURI(tokenCount, tokenURI);
        tokenCount += 1;
    }

    // Optional: Add a function to change the admin
    function setAdmin(address newAdmin) public {
        require(msg.sender == admin, "Only admin can set new admin");
        admin = newAdmin;
    }
}

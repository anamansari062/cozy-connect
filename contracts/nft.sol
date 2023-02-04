// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Deployed on 5ire Chain 0x2BA5f008CD1Eedc9836f89b4f64d036668B0D816

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HTF is ERC1155, Ownable {
    constructor()
        ERC1155(
            "https://ipfs.moralis.io:2053/ipfs/Qma4X1NYjE5sA8Z6gYEQwentwAc11t2jXt9g3Lmh3b5P2r"
        )
    {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }
}

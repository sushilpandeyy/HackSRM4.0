// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract HUSTLETOKEN is ERC20 ("HUSTLE TOKEN","HSTL"),Ownable {

function mintFifty() public  onlyOwner {
    _mint(msg.sender, 809843 * 10**18);
}
    
}

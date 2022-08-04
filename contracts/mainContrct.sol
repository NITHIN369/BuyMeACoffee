// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
contract coffeContract{
    event senderSended(address indexed sender,uint256 timeStamp,string name,uint256 amount,string message);
    struct sender{
        address senderAddress;
        uint256 timeStamp;
        string name;
        uint256 amount;
        string message;
    }
    address payable private owner;
    sender[] senders;
    constructor(){
        owner=payable(msg.sender);
    }
    function getOwner() public view returns(address){
        return owner;
    }
    function BuyMeACoffe(string memory name,string memory message) payable public{
        require(msg.value>0,"Their is no coffe for 0Eth");
        senders.push(sender(
            msg.sender,
            block.timestamp,
            name,
            msg.value,
            message
        ));
        emit senderSended(msg.sender,block.timestamp,
            name,
            msg.value,
            message);
        withDraw();
    }
    function getSenders() view public returns(sender[] memory){
        return senders;
    }
    function withDraw() public{
        owner.transfer(address(this).balance);
    }
}
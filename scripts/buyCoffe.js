const hre = require("hardhat");
async function getBalance(address) {
  const balance = await hre.ethers.provider.getBalance(address);
  //waffale is testing library, provider is bloackchain node provider for testing
  return hre.ethers.utils.formatEther(balance);
}
async function printBalance(addresses) {
  let id = 0;
  for (const address of addresses) {
    id++;
    console.log(`Address ${id} balance is: `, await getBalance(address));
  }
}
function printSenders(senders) {
  for (const sender of senders) {
    console.log(
      `At ${sender.timeStamp} ${sender.name} ${sender.senderAddress} said: ${sender.message}`
    );
  }
}
async function main() {
  //getting random accounts
  const [owner, tipper1, tipper2, tipper3, tipper4] =
    await hre.ethers.getSigners();
  const addresses = [owner.address, tipper1.address,tipper2.address];
  await printBalance(addresses);
  //deploy contract
  const buyMeACoffe = await hre.ethers.getContractFactory("coffeContract"); //to get contract
  const BuyMeCoffe = await buyMeACoffe.deploy();
  await BuyMeCoffe.deployed(); //wait until it deploy
  console.log("Contract deployed at: ", BuyMeCoffe.address);
  //check balance after deployment of contract
  console.log("==start==");
  addresses.push(BuyMeCoffe.address);
  await printBalance(addresses);
  //buy some coffes
  await BuyMeCoffe.connect(tipper1).BuyMeACoffe(
    "tipper 1",
    "Enjoy the day man",
    { value: hre.ethers.utils.parseEther("1") }
  );
  await BuyMeCoffe.connect(tipper2).BuyMeACoffe(
    "tipper 2",
    "Nice day",
    { value: hre.ethers.utils.parseEther("10") }
  );
  console.log("==Checking balance after senders sending money==")
  await printBalance(addresses)
  //getting all senders
  senders=await BuyMeCoffe.getSenders();
  printSenders(senders)
  //withdraw tips
  await BuyMeCoffe.withDraw();
  //check balance adter withdraw
  console.log("==Checking balance after withdraw==")
  await printBalance(addresses)
  
}
main();

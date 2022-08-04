const hre=require("hardhat")
async function main(){
        const buyMeACoffe = await hre.ethers.getContractFactory(
          "coffeContract"
        );
        const BuyMeACoffe=await buyMeACoffe.deploy();
        await BuyMeACoffe.deployed();
        console.log("Contract deplyed at address ",BuyMeACoffe.address);
}
main()
// 0xb1d1db1857d085d1721Eb0D16ed6c34AFeAb36E7;
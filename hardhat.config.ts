import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";

module.exports = {
	zksolc: {
		version: '1.3.5',
		compilerSource: "binary",
		settings: {},
	},
	defaultNetwork: "zkTestnet",
	networks: {
		zkTestnet: {
		  url: "https://testnet.era.zksync.dev", // URL of the zkSync network RPC
		  ethNetwork: "goerli", // Can also be the RPC URL of the Ethereum network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
		  zksync: true,
		},
	  },
	solidity: {
		version: '0.8.17',
	},
}

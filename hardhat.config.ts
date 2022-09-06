import '@nomicfoundation/hardhat-toolbox'
import '@openzeppelin/hardhat-upgrades'
import '@nomicfoundation/hardhat-chai-matchers'
import '@matterlabs/hardhat-zksync-deploy'
import '@matterlabs/hardhat-zksync-solc'
import * as dotenv from 'dotenv'

dotenv.config()

const config = {
	zksolc: {
		version: '1.1.5',
		compilerSource: 'docker',
		settings: {
			optimizer: {
				enabled: true,
			},
			experimental: {
				dockerImage: 'matterlabs/zksolc',
				tag: 'v1.1.5',
			},
		},
	},
	zkSyncDeploy: {
		zkSyncNetwork: 'https://zksync2-testnet.zksync.dev',
		ethNetwork: 'goerli', // Can also be the RPC URL of the network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
	},
	solidity: {
		version: '0.8.16',
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	networks: {
		hardhat: {
			zksync: true,
		},
	},
}

export default config

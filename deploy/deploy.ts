/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { /* utils, */ Wallet } from 'zksync-web3'
// Import * as ethers from 'ethers'
import type { HardhatRuntimeEnvironment } from 'hardhat/types'
import { Deployer } from '@matterlabs/hardhat-zksync-deploy'
import * as dotenv from 'dotenv'

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
	console.log(`Running deploy script for the Greeter contract`)
	dotenv.config()
	console.log(`private key:${process.env.PRIVATE_KEY}`)
	// Initialize the wallet.
	const wallet = new Wallet(process.env.PRIVATE_KEY!)
	const { address } = wallet
	console.log(`address:${address.toString()}`)

	// Create deployer object and load the artifact of the contract we want to deploy.
	const deployer = new Deployer(hre, wallet)
	const artifact = await deployer.loadArtifact('Greeter')

	// // Deposit some funds to L2 in order to be able to perform L2 transactions.
	// const depositAmount = ethers.utils.parseEther('0.001')
	// const depositHandle = await deployer.zkWallet.deposit({
	// 	to: deployer.zkWallet.address,
	// 	token: utils.ETH_ADDRESS,
	// 	amount: depositAmount,
	// })
	// // Wait until the deposit is processed on zkSync
	// await depositHandle.wait()

	// Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
	// `greeting` is an argument for contract constructor.
	const greeting = 'Hi there!'
	const greeterContract = await deployer.deploy(artifact, [greeting])
	// Show the contract info.
	const contractAddress = greeterContract.address
	console.log(`${artifact.contractName} was deployed to ${contractAddress}`)

	// Call the deployed contract.
	const greetingFromContract = await greeterContract.greet()
	if (greetingFromContract == greeting) {
		console.log(`Contract greets us with ${greeting}!`)
	} else {
		console.error(`Contract said something unexpected: ${greetingFromContract}`)
	}

	// Edit the greeting of the contract
	const newGreeting = 'Hey guys'
	const setNewGreetingHandle = await greeterContract.setGreeting(newGreeting)
	await setNewGreetingHandle.wait()

	const newGreetingFromContract = await greeterContract.greet()
	if (newGreetingFromContract == newGreeting) {
		console.log(`Contract greets us with ${newGreeting}!`)
	} else {
		console.error(
			`Contract said something unexpected: ${newGreetingFromContract}`
		)
	}
}

// https://v2-docs.zksync.io/api/hardhat/getting-started.html#initializing-the-project
// contract address 0x76C56252A7A9039D8A8d4836B0f383010a3Df0A5

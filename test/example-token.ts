import { expect } from 'chai'
import { ethers } from 'hardhat'
import type { SnapshotRestorer } from '@nomicfoundation/hardhat-network-helpers'
import { takeSnapshot } from '@nomicfoundation/hardhat-network-helpers'
import type { Example } from '../typechain-types'

describe('Example', () => {
	let example: Example
	let snapshot: SnapshotRestorer
	before(async () => {
		const factory = await ethers.getContractFactory('Example')
		example = (await factory.deploy()) as Example
		await example.deployed()
	})
	beforeEach(async () => {
		snapshot = await takeSnapshot()
	})
	afterEach(async () => {
		await snapshot.restore()
	})
	describe('setValue', () => {
		it('set', async () => {
			await example.setValue(5)
			const value = await example.getValue()
			expect(value.toString()).to.equal('5')
		})
	})
})

import { openDB, type IDBPDatabase } from "idb"

let db: IDBPDatabase

export const VERSION = 4;

export async function initDb() {
	db = await openDB('theme-builder', VERSION, {
		upgrade(db, oldVersion) {
			if (oldVersion < 1) {
				// Table: website
				const websiteStore = db.createObjectStore('website', {
					keyPath: 'url'
				})
				websiteStore.createIndex('url', 'url', { unique: true })

				// Table: tokens
				const tokensStore = db.createObjectStore('tokens', {
					autoIncrement: true
				})
				tokensStore.createIndex('tokenId', 'tokenId') // so we can get <tokenId> for a website
				tokensStore.createIndex('website', 'website') // so we can get all tokens for 1 website
				tokensStore.createIndex('type', 'type') // so we can get all <color> tokens for 1 website
			}

			if (oldVersion < 3) {
				// Table: state
				// Acts as a key-value storage so we can store stuff like { key: 'currentWebsite', value: 'example.com' }
				const stateStore = db.createObjectStore('state', {
					keyPath: 'key',
				})
				stateStore.createIndex('key', 'key', { unique: true })
			}

			if (oldVersion < 4) {
				// Table: StagedTokens
				// Contains { website: 'example.com', type: 'color', value: '#f00' }
				const stagedTokens = db.createObjectStore('stagedTokens', {
					keyPath: ['website', 'type', 'value']
				})
				stagedTokens.createIndex('website', 'website')
				stagedTokens.createIndex('type', 'type')
				stagedTokens.createIndex('value', 'value')
			}
		}
	})
	return db
}

export async function getDb() {
	return db || await initDb()
}

import { reactive } from './tb-reactive.js'
import { ColorOption, FamilyOption, LinHeightOption, SizeOption } from './tb-staging-tokens.js'

let context_key = Symbol('tb_context')

type Context = {
	selectedColors: Set<ColorOption>,
	selectedFamilies: Set<FamilyOption>,
	selectedSizes: Set<SizeOption>,
	selectedLineHeights: Set<LinHeightOption>,
}

export function create_context(initial_set = new Set()) {
	let state = reactive({
		selectedColors: initial_set,
		selectedFamilies: new Set(),
		selectedSizes: new Set(),
		selectedLineHeights: new Set(),
	})

	return {
		// Provide context to children
		provide() {
			if (!this.context_map) {
				this.context_map = new Map()
			}
			this.context_map.set(context_key, state)
		},

		// Get current state
		get_state() {
			return state
		},
	}
}

// Hook for children to consume context
export function use_context(element: HTMLElement): Context {
	let current = element
	let visited = new Set()

	// Walk up the DOM tree to find context provider
	while (current && !visited.has(current)) {
		visited.add(current)

		// Check for context on current element
		if (current.context_map && current.context_map.has(context_key)) {
			return current.context_map.get(context_key)
		}

		// Move up to parent, crossing shadow DOM boundaries
		if (current.parentNode && current.parentNode !== current) {
			current = current.parentNode
		} else if (current.host && current.host !== current) {
			// We're at a shadow root, go to host element
			current = current.host
		} else {
			// No more parents
			break
		}
	}

	throw new Error('Context not found - make sure parent provides context')
}

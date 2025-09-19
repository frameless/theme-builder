import { reactive } from './tb-reactive.js'

let context_key = Symbol('tb_context')

export function create_context(initial_set = new Set()) {
	let state = reactive({
		selectedColors: initial_set,
		selectedFamilies: new Set(),
		selectedSizes: new Set(),
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
export function use_context(element: HTMLElement) {
	let current = element

	// Walk up the DOM tree to find context provider
	while (current) {
		if (current.context_map && current.context_map.has(context_key)) {
			return current.context_map.get(context_key)
		}
		current = current.parentElement
	}

	throw new Error('Context not found - make sure parent provides context')
}

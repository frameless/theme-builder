let current_effect: Function | null = null

export function reactive(obj: any) {
	let effects: Set<Function> = new Set()

	return new Proxy(obj, {
		get(target, prop) {
			// Track dependency
			if (current_effect) {
				effects.add(current_effect)
			}
			return target[prop]
		},

		set(target, prop, value) {
			target[prop] = value

			// Run all effects that depend on this object
			for (let effect_fn of effects) {
				effect_fn()
			}

			return true
		}
	})
}

export function effect(fn: Function) {
	current_effect = fn
	fn() // Run once to establish dependencies
	current_effect = null
}

import { create_context } from "./tb-context"

class ProviderElement extends HTMLElement {
	private context;

	constructor() {
		super()
		this.context = create_context()
		this.context.provide.call(this) // Bind context to this element
	}
}

customElements.define('tb-context-provider', ProviderElement)

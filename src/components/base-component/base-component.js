const render = Symbol("#render")
const setStyles = Symbol("#setStyles")
const dom = Symbol("#dom")
const shadowRoot = Symbol("#shadowRoot")

export class BaseComponent extends HTMLElement {
  constructor() {
    super()
    this[shadowRoot] = this.attachShadow({ mode: "open" })
    this[setStyles]()
    this[render]()
  }

  [setStyles]() {
    if (!this.styles) return

    const styles = this.styles()

    if (typeof styles === "string") {
      this[shadowRoot].appendChild(styles)
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue
      this[render]()
    }
  }

  [render]() {
    if (!this.render) return

    const firstRender = Boolean(!this[dom])
    this[dom] = this[dom] || document.createElement("div")
    const renderedContent = this.render()

    if (renderedContent === this[dom].innerHTML) {
      return
    }

    this[dom].innerHTML = renderedContent

    if (firstRender) this[shadowRoot].appendChild(this[dom])
  }
}

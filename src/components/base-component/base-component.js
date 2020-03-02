const shadowRoot = Symbol("#shadowRoot")
const template = Symbol("#template")
const dom = Symbol("#dom")
const patchDOM = Symbol("#patchDOM")
const patchStyles = Symbol("#patchStyles")

export class BaseComponent extends HTMLElement {
  constructor() {
    super()
    this[shadowRoot] = this.attachShadow({ mode: "open" })

    const id = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now()
    this.setAttribute("id", id)
    this.id = id

    this[patchStyles]()
    this[patchDOM]()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue
      this[patchDOM]()
    }
  }

  [patchDOM]() {
    if (!this.render) return

    const patch = this.render()

    if (typeof patch !== "string") return

    if (!this[template]) {
      this[template] = document.createElement("template")
      this[template].innerHTML = patch.trim()

      // check for multiple children?

      this[shadowRoot].appendChild(this[template].content)
      this[dom] = this[shadowRoot].lastElementChild
    } else {
      if (this[dom].outerHTML === patch) return

      this[template].innerHTML = patch.trim()

      // check for multiple children?

      this[dom].replaceWith(this[template].content)
      this[dom] = this[shadowRoot].lastElementChild
    }
  }

  [patchStyles]() {
    if (!this.styles) return

    const styles = this.styles()

    if (typeof styles === "string") {
      const style = document.createElement("style")
      style.type = "text/css"
      style.textContent = styles
      this[shadowRoot].appendChild(style)
    }
  }
}

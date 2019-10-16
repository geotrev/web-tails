import styles from "./styles.scss"

export class Dropdown extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "open" })
    this.renderStyle()
    this.render()
  }

  renderStyle() {
    const style = document.createElement("style")
    style.textContent = styles
    this.shadow.appendChild(style)
  }

  render() {
    const wrapper = document.createElement("div")

    wrapper.innerHTML = `
      <p>
        <div class="some-selector"></div>
      </p>
    `

    this.shadow.appendChild(wrapper)
  }
}

if (typeof window !== "undefined") {
  customElements.define("tails-dropdown", Dropdown)
}

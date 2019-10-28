import styles from "./styles.scss"

if (typeof window !== "undefined") {
  customElements.define(
    "tails-test", 
    class extends HTMLElement {
      constructor() {
        super()
        this.shadow = this.attachShadow({ mode: "open" })
        this.setStyles()
        this.render()
      }

      setStyles() {
        const style = document.createElement("style")
        style.textContent = styles
        this.shadow.appendChild(style)
      }

      render() {
        const wrapper = document.createElement("p")
        const name = this.getAttribute("name")

        wrapper.innerHTML = `
          <div class="some-class">Hi, I'm ${name}!</div>
        `

        this.shadow.appendChild(wrapper)
      }
    }
  )
}

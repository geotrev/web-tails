import { BaseComponent } from "../base-component"
import { register } from "../../utils"
import styles from "./styles.scss"

class MiniGreeter extends BaseComponent {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.setButtonHandler()
  }

  // setup

  static get observedAttributes() {
    return ["name"]
  }

  styles() {
    return styles
  }

  setButtonHandler() {
    const button = this.shadowRoot.querySelector("#updater")
    button.addEventListener("click", this.handleClick)
  }

  // properties

  get name() {
    return this.getAttribute("name")
  }

  set name(value) {
    if (value) {
      this.setAttribute("name", value)
    } else {
      this.removeAttribute("name")
    }
  }

  // handlers

  handleClick() {
    const names = ["Jerry", "Louise", "George", "Brandon"]
    this.name = names[Math.floor(Math.random() * Math.floor(names.length))]
  }

  // render

  render() {
    return `
      <div class="some-class">
        <p>Whaddup Mr. ${this.name}.</p>
        <button id="updater">Update name</button>
      </div>
    `
  }
}

register("mini-greeter", MiniGreeter)

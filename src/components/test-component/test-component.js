import { BaseComponent } from "../base-component"
import { register } from "utils"
import styles from "./styles.scss"

class TailsTest extends BaseComponent {
  styles() {
    return styles
  }

  static get observedAttributes() {
    return ["name"]
  }

  render() {
    return `<div class="some-class"><p>Whaddup Mr. ${this.name}.</p></div>`
  }
}

register("tails-test", TailsTest)

import { BaseComponent } from "../base-component"
import { canRender } from "utils"
import styles from "./styles.scss"

if (canRender) {
  class TailsTest extends BaseComponent {
    constructor() {
      super()
    }

    setStyles() {
      return styles
    }

    setActiveAttributes() {
      return ["name"]
    }

    didConnect() {
      // do in
    }

    didRender() {
      // do initial render checks
    }

    activeAttributeUpdated() {
      // do stuff only ifa  specific property updated
    }

    didDisconnect() {
      // do teardown logic
    }

    documentChanged() {
      // moved to new document context
    }

    render() {
      return `<div class="some-class"><p>Whaddup Mr. ${this.name}.</p></div>`
    }
  }

  customElements.define("tails-test", TailsTest)
}

export class BaseComponent extends HTMLElement {
  constructor() {
    super()

    // bind lifecycle methods

    this.setActiveAttributes = this.setActiveAttributes.bind(this)
    this.setStyles = this.setStyles.bind(this)
    this.didConnect = this.didConnect.bind(this)
    this.didRender = this.didRender.bind(this)
    this.activeAttributeUpdated = this.activeAttributeUpdated.bind(this)
    this.didDisconnect = this.didDisconnect.bind(this)
    this.documentChanged = this.documentChanged.bind(this)
    this.render = this.render.bind(this)

    this.shadow = this.attachShadow({ mode: "open" })
    this.baseComponent__setStyles()
    this.baseComponent__render()
  }

  // methods to be overriden by parent
  setActiveAttributes() {}
  setStyles() {}
  didConnect() {}
  didRender() {}
  activeAttributeUpdated() {}
  didDisconnect() {}
  documentChanged() {}
  render() {}

  // builtins

  static get observedAttributes() {
    const attributes = this.setActiveAttributes()
    const hasValidAttributes = this.validateActiveAttributes(attributes)

    if (!hasValidAttributes) {
      return []
    }

    return attributes
  }

  attributeChangedCallback() {
    if (this.observedAttributes.length) {
      this.activeAttributeUpdated()
    }
  }

  adoptedCallback() {
    this.documentChanged()
  }

  disconnectedCallback() {
    this.didDisconnect()
  }

  connectedCallback() {
    // prevent disconnectedCallback from triggering this method
    if (this.isConnected) {
      return this.didConnect()
    }
  }

  // custom methods

  hasValidObservedAttributeValues(attributes) {
    return (
      attributes.filter(property => {
        const isString = typeof property === "string"

        if (!isString) {
          console.log(
            "Invalid value given in array returned by 'setActiveAttributes'; all values must be strings. Value:",
            property
          )
          return false
        } else {
          return true
        }
      }).length === attributes.length
    )
  }

  validateObservedAttributesDataType(attributes) {
    if (!Array.isArray(attributes)) {
      console.error(
        "You must return a data type of Array in `setActiveAttributes`; received:",
        typeof definedProperties
      )
      return false
    }

    return true
  }

  validateActiveAttributes(attributes) {
    return (
      this.hasValidObservedAttributeType(attributes) &&
      this.hasValidObservedAttributeValues(attributes)
    )
  }

  baseComponent__setStyles() {
    const styleValue = this.setStyles()

    if (typeof styleValue !== "string" && typeof styleValue !== "undefined") {
      console.log("You must return CSS styles as a string in 'setStyles'.")
      return
    }

    const style = document.createElement("style")
    style.textContent = styleValue
    this.shadow.appendChild(style)
  }

  baseComponent__render() {
    const renderValue = this.render()

    if (typeof renderValue !== "string") {
      console.log("You returned a non-string value to 'render'. Value:", renderValue)
      return
    }

    const wrapper = document.createElement("div")
    wrapper.innerHTML = renderValue
    this.shadow.appendChild(wrapper)
    this.didRender()
  }
}

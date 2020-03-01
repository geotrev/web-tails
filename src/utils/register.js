export const register = (name, constructor) => {
  if (!customElements.get(name)) customElements.define(name, constructor)
}

export class BaseView {
  constructor() {
    this.eventHandlers = [];

    this.beforeUnloadHandler = this.beforeUnloadHandler.bind(this);
  }

  init() {
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
  }

  render(container) {
    container.append(this.elements.template);
  }

  mount(container) {
    this.container = container;
    this.render(this.container);
  }

  addHandler({ element, event, handler }) {
    element.addEventListener(event, handler);

    this.eventHandlers.push({ element, event, handler });
  }

  removeHandlers() {
    this.eventHandlers.forEach(({ element, event, handler }) =>
      element.removeEventListener(event, handler)
    );

    this.eventHandlers = [];
  }

  unmount() {
    this.removeHandlers();
    this.container.innerHTML = '';
  }

  beforeUnloadHandler() {
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
    this.removeHandlers();
  }
}

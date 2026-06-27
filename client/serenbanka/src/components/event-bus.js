const eventBus = {
    events: {},
    $on(eventName, callback) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(callback);
    },
    $off(eventName, callback) {
      const callbacks = this.events[eventName];
      if (!callbacks) return;
      if (!callback) {
        delete this.events[eventName];
        return;
      }
      this.events[eventName] = callbacks.filter(cb => cb !== callback);
    },
    $emit(eventName, ...args) {
      const callbacks = this.events[eventName];
      if (callbacks && callbacks.length > 0) {
        callbacks.forEach(callback => callback(...args));
      }
    }
  };
  export default eventBus;

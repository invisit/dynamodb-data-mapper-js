
if (typeof queueMicrotask !== "function") {
  const queueMicrotask = require("queue-microtask")
  Object.assign(global, {
    queueMicrotask
  })
}

if (typeof window !== "undefined") {
  const { worker } = require("./server");
  worker.start();
}

export {};

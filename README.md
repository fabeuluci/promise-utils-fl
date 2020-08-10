promise-utils-fl
====

Utilities for promises. Module includes defer, wait, forEach and callback to promise converter.

Example
---

```typescript
import {PromiseUtils} from "promise-utils-fl";

// Wait 2s
PromiseUtils.wait(2000);

// Perform promises one by one
PromiseUtils.forEach(["a", "b", "c"], (entry, index) => doWork(entry));

// Create deferred promise
let defer = PromiseUtils.defer<string>();
defer.promise; // returns promise
...
defer.resolve("foo"); // resolve promise
defer.reject("error"); // or reject it

// Convert callback to promise
PromiseUtils.cb2p<Buffer>(x => fs.readFile(filePath, x));

// Convert callback (without error) to promise
PromiseUtils.cbx2p<boolean>(x => fs.exists(filePath, x));
```

License
---

The MIT License (MIT)

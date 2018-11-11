# lunardate
Thi is the javascript library to convert date to lunar date and vice versa.

## installation

```bash

    npm install lunardate

```

## Usages

convert from solar date to lunar date

```bash

import {convertSolar2Lunar} from "lunardate"

const lunarDate = convertSolar2Lunar(20, 5, 1990);

console.log(lunarDate)

// output will give below result
// { year: 1990, month: 4, day: 26, isLeafYear: false }

```

## Credit

This library using the source from [https://www.informatik.uni-leipzig.de/~duc/amlich/](https://www.informatik.uni-leipzig.de/~duc/amlich/) with few small modification

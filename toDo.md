* use withParent

* remove getKeys util, in favor of allIds keys by payload
* make util to get color strings from shape colors, etc.
* remove onClick for bar stack
  * add offset to payload as well as shape
* add ability to rotate and expand bar stacks
* abstract accessors
* abstract keys
* abstract scales
* add parent size wrapper to barstack
* fix BarStacksChart.tsx
* hide controls by default
  
* rename and move `mockWrapper`?
* add stories for shape/bar
* add withParentSize wrapper
* add lazy loading

## Issues to be debugged
* BarStacks.tsx
  * scale configurations cannot be put into useEffect?

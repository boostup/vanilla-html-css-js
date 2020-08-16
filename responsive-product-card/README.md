Note : this is a demo which focuses mainly on responsive design, UI animation, and user interaction. It is not intended to be a production-ready or optimized code. Optimizition and performance can often be implemented only in real production environments with specific constraints, which is not the case here. Read on for further details on why this demo is not production ready.

# Responsive design

## Implementation Strategy

- This is a mobile-first design taking a min-width of 320px as a starting point.
- The [include-media SCSS library](https://github.com/eduardoboucas/include-media) is a serious advantageous tool for finer control over media queries and has therefore been included in this demo.
- For ease of development, media queries are nested where needed instead of being placed only at the end of the main.scss file. This, in a real production website or web app would not be considered optimized as it would slow down browser performance if media queries where to be found in many hundreds of places within the generated main.min.css file. Therefore, in production, a generator package could be used to regroup all media queries under one roof, as an exemple to solve the performance issue.

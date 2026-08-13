## Why

VoteCart এর current implemented features গুলো document করা হচ্ছে যাতে ভবিষ্যতে নতুন feature add করার সময় existing behavior এর সাথে conflict না হয় এবং সব কিছু একটা shared reference এ থাকে।

## What Changes

এটা একটা baseline documentation — কোনো নতুন code change নেই। শুধু existing features spec আকারে capture করা হচ্ছে।

- Document করা হচ্ছে: voting system (cast, undo, dedup)
- Document করা হচ্ছে: poll data (sections, options, seed)
- Document করা হচ্ছে: UI features (search, sort, view, navigation)
- Document করা হচ্ছে: custom option suggestion
- Document করা হচ্ছে: live results display

## Capabilities

### New Capabilities

- `voting-system`: Vote cast করা, IP dedup, cookie fallback, 2-min undo window
- `poll-data`: Section + option structure, seed script, custom option add
- `live-results`: Real-time percentage bars, hero stats, top pick display
- `ui-controls`: Search, sort, grid/list view, collapse/expand, skeleton loading
- `navigation`: Desktop sidebar, mobile pills, section jump, active highlight
- `theme`: Light/dark mode toggle

### Modified Capabilities

_(none — this is a baseline capture)_

## Impact

- কোনো code change নেই
- এই specs ভবিষ্যতের সব feature এর reference হিসেবে কাজ করবে
- নতুন feature add করার আগে এই specs দেখে conflict check করা যাবে

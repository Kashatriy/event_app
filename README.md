# Event App

A cross-platform event discovery app built with Vue 3 + TypeScript + uni-app, powered by the [Ticketmaster Discovery API](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/).



## Project Structure

```
src/
├── api/
│   └── ticketmaster.ts   # API client (searchEvents, getEventDetail)
├── pages/
│   ├── index/            # Event list page
│   ├── detail/           # Event detail page
│   └── webview/          # In-app browser for ticket purchase
├── stores/
│   └── events.ts         # Pinia stores (useEventsStore, useEventDetailStore)
├── utils/
│   └── format.ts         # Date/time formatting helper
├── pages.json            # Route configuration
└── main.ts               # App entry point
```

## Setup

### Prerequisites

- Node.js >= 16
- npm >= 8

### Install

```bash
npm install
```

### Run (H5)

```bash
npm run dev:h5
```

Open `http://localhost:7778` in your browser.


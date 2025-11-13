# Vulnerability Dashboard

A web-based application to visualize, analyze, and compare container image vulnerabilities with advanced filtering and AI-assisted insights.

## Features

* View vulnerability trends over time with line charts
* Frequency analysis of risk factors using bar charts
* Comparison of selected vulnerabilities with color-coded fixed/unfixed status
* Export filtered data in CSV format
* Filter vulnerabilities by AI/manual analysis status
* Customizable dashboard with user preferences

## Tech Stack

* **Frontend:** React + TypeScript, Material UI, Redux Toolkit, React Router v6
* **Data Visualization:** Chart.js / Recharts
* **Backend:** Node.js / Express API (PostgreSQL database)

## Architecture Overview

* **Component-based architecture:** Container and Presentational pattern for maintainability
* **State management:** Redux Toolkit slices manage global state (filters, selected vulnerabilities, metrics)
* **Routing:** Lazy-loaded routes reduce initial bundle size
* **Data flow:** Frontend UI → Redux Store → API → PostgreSQL Database
* **Visualization:** Line, Bar, Pie, and Gauge charts display metrics, trends, and comparisons

## Setup Instructions

### Prerequisites

* Node.js v18+ and npm
* PostgreSQL database

### Frontend Setup

# While running locally make sure to change the 
```bash
# Clone repository
git clone https://github.com/preethamAitha/kaiWatch
cd kai-watch/frontend/kai-watch

# Install dependencies
npm install

# Run development server
npm run dev
```

### Backend Setup

1. Backend APIs are all deployed on render and the url is: https://kaiwatch.onrender.com.

To run locally make sure to follow the steps below

1. Restore the backup (backend/database/backup) file in pgAdmin and make sure all the tables and data is restored.

```bash
cd kai-watch/backend/kai-project
# Install dependencies
npm install

# Run development server
npm run dev
```

### Accessing the App

# use the below url to open the dashnoard app
Open [http://localhost:5173](http://localhost:5173) in your browser to access the dashboard.

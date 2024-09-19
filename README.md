# Vue Dashboard Foodics

## LIVE

<https://vue-dashboard-foodics.vercel.app>

## Table of Contents

- [About the Project](#about-the-project)
- [Technologies Used](#technologies-used)
- [Run Locally](#run-locally)
- [Project Structure](#project-structure)
- [Some Features](#some-features)
- [Assumptions](#assumptions)
- [Possible Improvements](#possible-improvements)

## About the Project

This dashboard application provides insights into posts and comments data fetched from a public API. It offers functionalities such as viewing, searching, and analyzing data with interactive charts and statistics.

## Technologies Used

- **Vite**
- **Vue.js 3**
- **Vue Router**
- **Vuex**
- **Chart.js**
- **Heroicons**
- **JSONPlaceholder API**
- **Tailwind CSS**

## Run Locally

To run this project locally:

```bash
git  clone  https://github.com/Meryx/vue-dashboard-foodics.git
cd  vue-dashboard-foodics
npm  install
npm  run  dev
```

## Project Structure

- **`src/`**: Contains the source code of the application.
  - **`components/`**: Reusable Vue components.
  - **`layouts/`**: Layout components for consistent page structure.
  - **`views/`**: Page components representing different routes.
  - **`store/`**: Vuex store modules for state management.
  - **`router/`**: Vue Router configuration.
  - **`services/`**: Includes the API calls.
  - **`assets/`**: CSS and avatar used.

## Some Features

- **Caching with Vuex**

  - Implemented caching of fetched data using Vuex to minimize redundant API requests.

- **Pagination (Desktop Version)**

  - Provides paginated views of posts on desktop devices.

- **Infinite Scroll (Mobile Version)**

  - Enables infinite scrolling on mobile devices.

- **Force Refresh Button**

  - Includes a button that allows users to force a data refresh, bypassing the cache to retrieve the most recent data.

- **Collapsible Sidebar**

  - Features a collapsible sidebar that can be toggled to show or hide navigation links.

- **Fixed Header**

  - Implements a fixed header that remains visible at the top of the page during scrolling for constant access to navigation and controls.

- **Dark Mode**
  - Supports dark mode. Checks system preference.

## Assumptions

- **API Reliability**: It is assumed that the JSONPlaceholder API is consistently available and returns data in the expected format. Any changes to the API may affect data fetching and display.

- **Data Volume**: It is assumed that the volume of posts and comments is manageable. At the moment the API only allows for fetching of all posts at the same time

## Possible Improvements

What to implement:

- Manage more state using Vuex. At this moment I have some sibling communcation just to demonstrate how to bubble events and repropagate them. Would be much easier to just move it to Vuex store.

- Add force refresh to mobile version

- Write tests

Restructuring and factoring out elements into components can also be done if the project grows bigger and needs to re-use these elements.

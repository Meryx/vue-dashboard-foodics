# Vue.js Dashboard Application

To be filled later...

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Color Palette](#color-palette)

## Features

- **Responsive Dashboard Layout**

  - Fixed header with a title and user avatar.
  - Collapsible sidebar with navigation links.
  - Main content area displaying data from the API.

- **API Integration**

  - Fetches posts from the JSONPlaceholder API.
  - Displays posts in a table format.
  - "Read more" functionality to expand truncated post bodies.

- **Post Details Modal**

  - Clicking on a post title opens a modal.
  - Displays post details, user information, and comments.

- **Dark Mode Toggle**

  - Users can switch between light and dark themes.
  - Theme preference is saved in local storage.

## Technologies Used

- **Vue.js 3**
- **Tailwind CSS**
- **Vue Router**

## Color Palette

This application utilizes Tailwind CSS's predefined colors.

### Light Mode

- **Site Background**: `#EDEDED` (Very Light Gray)
- **Sidebar**:
  - **Background**: `#F5F5F5` (Light Gray)
  - **Text**: `#333333` (Charcoal)
  - **Item Hover**: `#E0E0E0` (Soft Gray)
- **Header**:
  - **Background**: `#FFFFFF` (White)
  - **Text**: `#333333` (Charcoal)
- **Row (Posts)**:
  - **Background**: `#FAFAFA` (Off-White)
  - **Text**: `#333333` (Charcoal)
- **Button**:
  - **Background**: `#007BFF` (Bright Blue)
  - **Text**: `#FFFFFF` (White)

### Dark Mode

- **Site Background**: `#1A1A1A` (Dark Charcoal)
- **Sidebar**:
  - **Background**: `#2C2C2C` (Dark Gray)
  - **Text**: `#E0E0E0` (Light Gray)
  - **Item Hover**: `#3A3A3A` (Medium Gray)
- **Header**:
  - **Background**: `#2A2A2A` (Very Dark Gray)
  - **Text**: `#E0E0E0` (Light Gray)
- **Row (Posts)**:
  - **Background**: `#1E1E1E` (Soft Black)
  - **Text**: `#E0E0E0` (Light Gray)
- **Button**:
  - **Background**: `#007BFF` (Bright Blue)
  - **Text**: `#FFFFFF` (White)

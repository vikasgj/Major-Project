# Quad-Segretronics Dashboard – Main Project

This project is the **dashboard interface** for the Quad-Segretronics system – a smart AI-based waste segregation machine.  
It visualizes bin fill levels, system status, alerts, and classification logs in a responsive web-based UI.

## 📌 Features

- Realtime dashboard layout for waste bins (Plastic, Glass, Metal, E-Waste)
- Styled components using clean and modular CSS
- Sections for system health, overflow alerts, and detection logs
- MQTT + ThingsBoard integration planned for data updates

## 🔧 Tech Stack

| Layer         | Tools/Tech Used               |
|---------------|-------------------------------|
| Frontend UI   | HTML, CSS, JavaScript         |
| Styling       | globals.css, styleguide.css   |
| Dashboard     | ThingsBoard (UI planned)      |
| Data Format   | JSON                          |
| Communication | MQTT Protocol (planned)       |

## 📁 File Overview

- `index.html` – Homepage or info layout  
- `dashboard.html` – Dashboard UI structure  
- `script.js` – General JavaScript logic  
- `dashboard.js` – Handles dashboard behaviors  
- `styles.css`, `dashboard.css` – Component & layout styling  
- `globals.css`, `styleguide.css` – Reusable styles & design tokens  

## 💡 Usage

This dashboard was developed as part of our final-year engineering project.  
It helps visualize the working of our AI-powered waste segregator in a clean, user-friendly way.

---

📍**Note**: Currently UI-ready. Backend live integration with sensor data (via MQTT) is planned in the next version.

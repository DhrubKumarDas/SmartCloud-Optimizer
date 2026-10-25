# SmartCloud Optimizer ☁️

> An intelligent cloud cost optimization platform that analyzes cloud resource data, identifies optimization opportunities, forecasts spending, and helps users make data-driven cloud cost decisions.

## 🚀 Overview

**SmartCloud Optimizer** is a cloud cost management and optimization platform designed to help users understand their cloud infrastructure and reduce unnecessary spending.

Users can upload their cloud resource and usage data as a CSV file. The platform analyzes the data and provides insights through dashboards, resource inventories, optimization recommendations, cost simulations, what-if scenarios, forecasting, and alerts.

The application is designed around a simple principle:

**Upload your data → Analyze it → Understand your cloud usage → Optimize your costs.**

---

## ✨ Features

### 📊 Dashboard
Provides an overview of analyzed cloud infrastructure, usage, costs, and optimization opportunities.

### 📁 Data Upload & Analysis
Upload a compatible CSV dataset and analyze cloud resource and usage information.

The application remains empty until valid data is uploaded and successfully analyzed.

### 🖥️ Resource Inventory
View the cloud resources identified from the uploaded dataset along with their relevant usage and cost information.

### 💡 Optimization Recommendations
Generates optimization recommendations based on the analyzed resource and usage data.

Recommendations can help identify resources that may be:
- Underutilized
- Overprovisioned
- Candidates for optimization
- Contributing unnecessarily to cloud costs

### 💰 Cost Simulator
Simulate potential changes to cloud resources and estimate their effect on overall cost.

### 🔮 What-If Simulator
Explore different optimization scenarios and compare potential cost outcomes before applying changes.

### 📈 Cost & Usage Forecasting
Analyze historical usage and cost patterns to estimate future cloud spending.

### 🚨 Alerts
Highlights important cost and resource-related conditions that may require attention.

### 🔥 Firebase Integration
Firebase is used for application services such as authentication and data-related functionality.

---

## 🧠 How It Works

```text
Cloud Resource Data
        ↓
    CSV Upload
        ↓
 Data Validation
        ↓
    Data Analysis
        ↓
 Centralized Data State
        ↓
 ┌────────┬──────────┬──────────────┐
 ↓        ↓          ↓              ↓
Dashboard Inventory Recommendations Forecasting
              ↓
       Cost Simulator
              ↓
       What-If Scenarios
              ↓
          Alerts
```

The analyzed dataset acts as the **single source of truth** across the application.

No demo cloud statistics are displayed before a valid dataset is analyzed.

---

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- Firebase
- Tailwind CSS
- JavaScript
- Netlify
- CSV data processing

---

## 💻 Run Locally

### Prerequisites

Make sure you have:

- Node.js installed
- npm installed

### 1. Clone the repository

```bash
git clone https://github.com/DhrubKumarDas/SmartCloud-Optimizer
```

### 2. Open the project

```bash
cd smartcloud-optimizer
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file and add the required API keys and configuration values.

**Never commit `.env.local` or private API keys to GitHub.**

### 5. Start the development server

```bash
npm run dev
```

The application will be available on the local development URL shown in the terminal.

---

## 🌐 Deployment

The application is deployed using **Netlify**.

Production deployment:

**SmartCloud Optimizer**  
https://smartcloud-optimizer.netlify.app

---

## 🔐 Security

Sensitive credentials and API keys should be stored using environment variables and should not be committed to the repository.

For production deployments, configure the required environment variables through the hosting platform.

---

## 📂 Project Structure

```text
smartcloud-optimizer/
│
├── public/              # Static assets
├── src/                 # Main application source code
├── server/              # Server-side functionality
├── package.json         # Project dependencies and scripts
├── firebase-*.json      # Firebase project configuration
├── firestore.rules      # Firestore security rules
├── netlify.toml         # Netlify configuration
├── vite.config.*        # Vite configuration
├── tsconfig.*           # TypeScript configuration
└── README.md            # Project documentation
```

---

## 🎯 Project Goal

The goal of SmartCloud Optimizer is to make cloud cost optimization more accessible by transforming raw cloud usage data into clear insights, recommendations, simulations, and forecasts.

Instead of relying on assumptions, the platform uses the user's analyzed data to support optimization decisions.

---

## 🚧 Future Improvements

- Integration with real-time AWS, Azure, and Google Cloud billing APIs
- Automated resource optimization
- Advanced machine-learning-based cost forecasting
- Multi-cloud cost comparison
- Automated anomaly detection
- More detailed optimization recommendations
- Role-based access control
- Advanced analytics and reporting

---

## 👥 Contributors

Built as a cloud optimization project for a hackathon.

---

## 📄 License

This project is intended for educational and hackathon purposes.
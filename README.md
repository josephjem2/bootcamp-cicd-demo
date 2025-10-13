# Bootcamp CI/CD Demo

![Node.js Version](https://img.shields.io/badge/Node.js-14.x-green)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

This repository contains a sample Node.js web application used for the Azure DevOps CI/CD Hands-on Challenge Day.

## Objective
Automate the build and deployment of a Node.js web application to Azure App Service using Azure DevOps.
<<<<<<< HEAD

## Prerequisites
=======
>>>>>>> 023b211 (Update README with lab guide, best practices, and YAML pipeline)

## Prerequisites
- Node.js (v14 or higher)
- Azure DevOps account
- Azure App Service (Web App)
- Git

## Setup Instructions
<<<<<<< HEAD

Install dependencies:
=======
=======
>>>>>>> 023b211 (Update README with lab guide, best practices, and YAML pipeline)
1. Clone this repository:
   ```bash
   git clone https://github.com/josephjem2/bootcamp-cicd-demo.git
<<<<<<< HEAD
2. Install dependencies:
   npm install
3. Run the app locally:
=======
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app locally:
   ```bash
>>>>>>> 023b211 (Update README with lab guide, best practices, and YAML pipeline)
   npm start
   ```

## CI/CD Pipeline Overview
- **Build Pipeline**: Installs dependencies, builds the app, and publishes artifacts.
- **Release Pipeline**: Deploys the app to Azure App Service.

## Azure DevOps Setup Steps
1. Create a new project in Azure DevOps.
2. Import this repository into Azure Repos or connect to GitHub.
3. Create a build pipeline using `azure-pipelines.yml`.
4. Create a release pipeline to deploy to Azure App Service.
5. Configure triggers to automate deployments.

## Deployed App
Visit the deployed app at: `https://your-app-service-url.azurewebsites.net`

<<<<<<< HEAD
Visit the deployed app at: https://your-app-service-url.azurewebsites.net

🔧 Lab Steps
Step 1: Set Up Azure DevOps Project

Go to https://dev.azure.com and sign in.
Click New Project.
Name it: bootcamp-cicd-demo.
Set visibility to Private or Public as needed.
Click Create.


Step 2: Import Code into Azure Repos

Navigate to Repos in your Azure DevOps project.
Click Import.
Paste your GitHub repo URL:
https://github.com/YOUR-USERNAME/bootcamp-cicd-demo.git
Click Import.


Step 3: Create a Build Pipeline

Go to Pipelines → Create Pipeline.
Select Azure Repos Git and choose your repository.
Choose YAML and select azure-pipelines.yml from the repo.
Review the pipeline steps:

Install Node.js
Install dependencies
Build the app
Publish artifacts


Click Run to execute the pipeline.
Confirm the build completes successfully.


Step 4: Create a Release Pipeline

Go to Pipelines → Releases → New Pipeline.
Add an Artifact:

Source: Select your build pipeline.
Source alias: drop


Add a Stage: “Deploy to Azure App Service”.
Click Add → Azure App Service Deploy.
Configure:

Azure subscription (authorize if needed)
App type: Web App on Linux
App name: Select your existing App Service


Save and create a release.


Step 5: Trigger and Monitor

Make a change in the code (e.g., update index.html).
Commit and push to the repo:
Shellgit add .git commit -m "Update homepage"git push origin mainShow more lines

Watch the build pipeline trigger automatically.
Once the build completes, the release pipeline will deploy the app.
Visit your Azure App Service URL to verify the update.


✅ CI/CD Best Practices
🔁 Version Control

Use feature branches for development.
Protect the main or release branches with pull request policies.
Tag releases with semantic versioning (e.g., v1.0.0).

🧪 Automated Testing

Include unit tests in your build pipeline.
Use tools like Jest, Mocha, or Supertest for Node.js.
Fail the build if tests do not pass.

📦 Artifact Management

Publish build artifacts to a secure location.
Use versioned artifacts to track deployments.

🚀 Environment Separation

Use separate pipelines or stages for Dev, Test, and Prod.
Apply approval gates before deploying to production.

🔐 Secrets & Security

Store secrets in Azure Key Vault or Pipeline Variables (marked as secret).
Never hard-code credentials or tokens in your code or YAML files.

📊 Monitoring & Logging

Enable logging in your application.
Use Azure Monitor, App Insights, or Log Analytics to track performance and errors.

🔄 Pipeline Triggers

Use continuous integration (CI) to trigger builds on code changes.
Use continuous deployment (CD) to automate releases after successful builds.

📁 Pipeline as Code

Define pipelines using YAML (azure-pipelines.yml) for version control and reuse.
Keep pipeline files in the root of your repo or in a .azure-pipelines/ folder.

🧹 Clean Builds

Use clean build agents or containers to avoid dependency pollution.
Cache dependencies smartly to speed up builds without compromising isolation.
=======
## 🔧 Lab Steps
### Step 1: Set Up Azure DevOps Project
- Go to https://dev.azure.com and sign in.
- Click New Project.
- Name it: `bootcamp-cicd-demo`.
- Set visibility to Private or Public as needed.
- Click Create.

### Step 2: Import Code into Azure Repos
- Navigate to Repos in your Azure DevOps project.
- Click Import.
- Paste your GitHub repo URL:
  `https://github.com/YOUR-USERNAME/bootcamp-cicd-demo.git`
- Click Import.

### Step 3: Create a Build Pipeline
- Go to Pipelines → Create Pipeline.
- Select Azure Repos Git and choose your repository.
- Choose YAML and select `azure-pipelines.yml` from the repo.
- Review the pipeline steps:
  - Install Node.js
  - Install dependencies
  - Build the app
  - Publish artifacts
- Click Run to execute the pipeline.
- Confirm the build completes successfully.

### Step 4: Create a Release Pipeline
- Go to Pipelines → Releases → New Pipeline.
- Add an Artifact:
  - Source: Select your build pipeline.
  - Source alias: `drop`
- Add a Stage: “Deploy to Azure App Service”.
- Click Add → Azure App Service Deploy.
- Configure:
  - Azure subscription (authorize if needed)
  - App type: Web App on Linux
  - App name: Select your existing App Service
- Save and create a release.

### Step 5: Trigger and Monitor
- Make a change in the code (e.g., update `index.html`).
- Commit and push to the repo:
  ```bash
  git add .
  git commit -m "Update homepage"
  git push origin main
  ```
- Watch the build pipeline trigger automatically.
- Once the build completes, the release pipeline will deploy the app.
- Visit your Azure App Service URL to verify the update.

## ✅ CI/CD Best Practices
### 🔁 Version Control
- Use feature branches for development.
- Protect the main or release branches with pull request policies.
- Tag releases with semantic versioning (e.g., `v1.0.0`).

### 🧪 Automated Testing
- Include unit tests in your build pipeline.
- Use tools like Jest, Mocha, or Supertest for Node.js.
- Fail the build if tests do not pass.

### 📦 Artifact Management
- Publish build artifacts to a secure location.
- Use versioned artifacts to track deployments.

### 🚀 Environment Separation
- Use separate pipelines or stages for Dev, Test, and Prod.
- Apply approval gates before deploying to production.

### 🔐 Secrets & Security
- Store secrets in Azure Key Vault or Pipeline Variables (marked as secret).
- Never hard-code credentials or tokens in your code or YAML files.

### 📊 Monitoring & Logging
- Enable logging in your application.
- Use Azure Monitor, App Insights, or Log Analytics to track performance and errors.

### 🔄 Pipeline Triggers
- Use continuous integration (CI) to trigger builds on code changes.
- Use continuous deployment (CD) to automate releases after successful builds.

### 📁 Pipeline as Code
- Define pipelines using YAML (`azure-pipelines.yml`) for version control and reuse.
- Keep pipeline files in the root of your repo or in a `.azure-pipelines/` folder.

### 🧹 Clean Builds
- Use clean build agents or containers to avoid dependency pollution.
- Cache dependencies smartly to speed up builds without compromising isolation.
>>>>>>> 023b211 (Update README with lab guide, best practices, and YAML pipeline)

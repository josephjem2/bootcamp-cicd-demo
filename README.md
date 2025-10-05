# Bootcamp CI/CD Demo

![Node.js Version](https://img.shields.io/badge/Node.js-14.x-green)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

This repository contains a sample Node.js web application used for the Azure DevOps CI/CD Hands-on Challenge Day.

## Prerequisites

- Node.js (v14 or higher)
- Azure DevOps account
- Azure App Service (Web App)
- Git

## Setup Instructions

<<<<<<< HEAD
1. Clone this repo:
   git clone https://github.com/josephjem2/bootcamp-cicd-demo.git

2. Install dependencies:
=======
1. Clone this repository:
   git clone https://github.com/YOUR-USERNAME/bootcamp-cicd-demo.git
2. Navigate to the project folder:
>>>>>>> b05cea7 (Update README with badges and Azure DevOps instructions)
   cd bootcamp-cicd-demo/app
3. Install dependencies:
   npm install
4. Run the app locally:
   npm start

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

Visit the deployed app at: https://your-app-service-url.azurewebsites.net

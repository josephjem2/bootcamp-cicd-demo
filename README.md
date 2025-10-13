# 🚀 Bootcamp CI/CD Demo

![Node.js Version](https://img.shields.io/badge/Node.js-14.x-green)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

This is a sample Node.js web application created for the Azure DevOps CI/CD Hands-on Challenge Day. It demonstrates how to automate the build and deployment of a web app using Azure DevOps pipelines.

---

## 📦 Prerequisites
- Node.js (v14 or higher)
- Git installed locally
- GitHub account
- Azure DevOps account
- Azure Subscription with App Service created

---

## 🛠️ Setup Instructions
1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/bootcamp-cicd-demo.git
   cd bootcamp-cicd-demo
   ```
2. Install dependencies:
   ```bash
   cd app
   npm install
   ```
3. Run the app locally:
   ```bash
   npm start
   ```

---

## 🌐 Upload Project to GitHub
1. Create a new repository on GitHub.
2. In your terminal:
   ```bash
   git init
   git remote add origin https://github.com/YOUR-USERNAME/bootcamp-cicd-demo.git
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

---

## 🔧 CI/CD Pipeline Overview
- **Build Pipeline**: Installs dependencies, builds the app, and publishes artifacts.
- **Release Pipeline**: Deploys the app to Azure App Service.

---

## 🧪 Azure DevOps CI/CD Lab Guide

### 🎯 Objective
Automate the build and deployment of a Node.js web application to Azure App Service using Azure DevOps.

### 🔧 Lab Steps

#### Step 1: Set Up Azure DevOps Project
- Go to https://dev.azure.com and sign in.
- Click **New Project**.
- Name it: `bootcamp-cicd-demo`.
- Set visibility to Private or Public.
- Click **Create**.

#### Step 2: Import Code into Azure Repos
- Navigate to **Repos**.
- Click **Import**.
- Paste your GitHub repo URL.
- Click **Import**.

#### Step 3: Create a Build Pipeline
- Go to **Pipelines** → **Create Pipeline**.
- Select **Azure Repos Git** and choose your repository.
- Choose **YAML** and select `azure-pipelines.yml`.
- Click **Run**.

#### Step 4: Create a Release Pipeline
- Go to **Pipelines** → **Releases** → **New Pipeline**.
- Add an **Artifact** from the build pipeline.
- Add a **Stage**: “Deploy to Azure App Service”.
- Configure Azure subscription and App Service.
- Save and create a release.

#### Step 5: Trigger and Monitor
- Make a code change and push:
   ```bash
   git add .
   git commit -m "Update homepage"
   git push origin main
   ```
- Watch the build and release pipelines run.
- Visit the App Service URL to verify deployment.

---

## ✅ CI/CD Best Practices

### 🔁 Version Control
- Use feature branches.
- Protect main/release branches.
- Tag releases with semantic versioning.

### 🧪 Automated Testing
- Include unit tests.
- Use Jest, Mocha, or Supertest.
- Fail builds on test failure.

### 📦 Artifact Management
- Publish artifacts securely.
- Use versioned artifacts.

### 🚀 Environment Separation
- Separate Dev, Test, and Prod stages.
- Use approval gates.

### 🔐 Secrets & Security
- Use Azure Key Vault or secret variables.
- Never hard-code credentials.

### 📊 Monitoring & Logging
- Enable logging.
- Use Azure Monitor or App Insights.

### 🔄 Pipeline Triggers
- Use CI for code changes.
- Use CD for automated releases.

### 📁 Pipeline as Code
- Use YAML (`azure-pipelines.yml`).
- Store in repo root or `.azure-pipelines/`.

### 🧹 Clean Builds
- Use clean agents.
- Cache dependencies smartly.

---

## 🧰 Troubleshooting Guide

### 🔁 Git Issues
#### Merge Conflicts
- Open conflicted file.
- Remove conflict markers.
- Stage and continue rebase:
   ```bash
   git add README.md
   git rebase --continue
   ```

#### Push Rejected
- Run:
   ```bash
   git pull origin main --rebase
   git push origin main
   ```

### 🛠️ Pipeline Issues
#### Pipeline Not Triggering
- Ensure `azure-pipelines.yml` is in repo root.
- Confirm `trigger:` includes your branch.

#### Build Pipeline Fails
- Check logs.
- Validate YAML.
- Confirm Node.js version.

### 🚀 Deployment Issues
#### App Service Deployment Fails
- Verify subscription and App Service name.
- Ensure App Service is running.

#### Permission Denied
- Check GitHub and Azure credentials.
- Ensure service connection has access.

### 📦 Artifact Issues
#### Missing Artifacts
- Confirm build pipeline publishes artifacts.
- Use correct alias in release pipeline.

---

## 📄 Sample Azure DevOps YAML Pipeline
```yaml
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '14.x'
    displayName: 'Install Node.js'

  - script: |
      npm install
      npm run build
    displayName: 'Install dependencies and build'

  - task: CopyFiles@2
    inputs:
      SourceFolder: 'app'
      Contents: '**'
      TargetFolder: '$(Build.ArtifactStagingDirectory)'
    displayName: 'Copy files to staging'

  - task: PublishBuildArtifacts@1
    inputs:
      pathToPublish: '$(Build.ArtifactStagingDirectory)'
      artifactName: 'drop'
      publishLocation: 'Container'
    displayName: 'Publish build artifacts'
```

---

For questions or support, contact your instructor or refer to the Azure DevOps documentation.

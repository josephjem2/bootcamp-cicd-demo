# 🚀 Bootcamp CI/CD Demo – Azure DevOps → Azure App Service

This repository contains a **Node.js + Express demo application** and a ready-to-use **Azure DevOps pipeline** that automates build and deployment to **Azure App Service**.  
It is designed for **The Cloud Bootcamp Hands‑on Challenge Day** on CI/CD.

---

## 📖 Context

Modern software delivery relies on **Continuous Integration (CI)** and **Continuous Delivery (CD)**.  
Instead of manually deploying code, we automate the process:

1. **Developer commits code** → triggers pipeline.  
2. **Pipeline builds the app** → installs dependencies, runs tests, packages artifact.  
3. **Pipeline deploys artifact** → pushes to Azure App Service.  
4. **App Service runs the app** → exposes a public URL + health endpoint.  

This repo demonstrates that full cycle with a **minimal Node.js app** and a **YAML pipeline**.

---

## 🎯 Learning Objectives

By working with this repo, you will:

- Understand the **CI/CD workflow** from commit → build → deploy → live app.  
- Configure and run an **Azure DevOps pipeline** for Node.js.  
- Deploy automatically to **Azure App Service (Free F1 plan)**.  
- Troubleshoot common deployment issues.  
- Validate deployments with a **health check endpoint**.  

---

## 🛠 Prerequisites

Before starting, ensure you have:

- [Node.js 20.x](https://nodejs.org/en/download/) installed locally.  
- [Git](https://git-scm.com/downloads) installed.  
- [Azure Subscription](https://azure.microsoft.com/free/) (Free Tier is enough).  
- [Azure DevOps Organization](https://dev.azure.com/).  
- A **self‑hosted agent** registered in Azure DevOps (recommended for free tier).  

---

## 📂 Project Structure

```
bootcamp-cicd-demo/
├── app.js                # Express app entry point
├── package.json          # Node.js metadata + start script
├── azure-pipelines.yml   # CI/CD pipeline definition
├── .gitignore            # Ignore unnecessary files
└── README.md             # Documentation
```

---

## 🚀 Getting Started (Local)

### 1. Clone the repo
```bash
git clone https://github.com/josephjem2/bootcamp-cicd-demo.git
cd bootcamp-cicd-demo
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the app locally
```bash
npm start
```

- Visit: [http://localhost:3000](http://localhost:3000) → `Hello Bootcamp!`  
- Health check: [http://localhost:3000/health](http://localhost:3000/health) → `OK`  

---

## ⚙️ Azure Setup (Free Tier)

### 1. Create an App Service
- Go to **Azure Portal → Create Resource → Web App**.  
- **Name:** `bootcamp-cicd-demo-app` (must be unique).  
- **Runtime stack:** Node.js 20.  
- **OS:** Windows.  
- **Plan:** Free (F1).  

### 2. Configure Health Check
- App Service → **Monitoring → Health check**.  
- Enable → Path: `/health`.  

---

## 🔄 Azure DevOps Pipeline Setup

### 1. Create a new project
- In Azure DevOps, click **New Project**.  
- Name it `bootcamp-cicd-demo`.  

### 2. Create a Service Connection
- **Project Settings → Service connections → New → Azure Resource Manager**.  
- Authentication: Service principal (automatic).  
- Name: `AzureBootcampConnection`.  
- Grant access to all pipelines.  

### 3. Confirm Agent Pool
- **Project Settings → Agent pools → Default → Agents**.  
- Ensure your self‑hosted agent is **Online**.  

### 4. Add Pipeline YAML
The pipeline is defined in [`azure-pipelines.yml`](./azure-pipelines.yml).  
It has two stages: **Build** and **Deploy**.

```yaml
trigger:
- main

variables:
  azureServiceConnection: 'AzureBootcampConnection'
  appServiceName: 'bootcamp-cicd-demo-app'

stages:
- stage: Build
  displayName: 'Build and Package'
  jobs:
  - job: BuildJob
    pool:
      name: 'Default'
    steps:
    - task: NodeTool@0
      inputs:
        versionSpec: '20.x'
      displayName: 'Install Node.js'

    - script: npm install
      displayName: 'Install npm packages'

    - script: npm test
      displayName: 'Run tests'

    - task: ArchiveFiles@2
      inputs:
        rootFolderOrFile: '$(Build.SourcesDirectory)'
        includeRootFolder: false
        archiveFile: '$(Build.ArtifactStagingDirectory)/app.zip'
        replaceExistingArchive: true
      displayName: 'Archive app files'

    - task: PublishBuildArtifacts@1
      inputs:
        PathtoPublish: '$(Build.ArtifactStagingDirectory)/app.zip'
        ArtifactName: 'drop'
        publishLocation: 'Container'
      displayName: 'Publish build artifact'

- stage: Deploy
  displayName: 'Deploy to Azure App Service'
  dependsOn: Build
  jobs:
  - job: DeployJob
    pool:
      name: 'Default'
    steps:
    - task: DownloadPipelineArtifact@2
      inputs:
        artifactName: 'drop'
        targetPath: '$(System.DefaultWorkingDirectory)'
      displayName: 'Download build artifact'

    - task: AzureWebApp@1
      inputs:
        azureSubscription: '$(azureServiceConnection)'
        appName: '$(appServiceName)'
        package: '$(System.DefaultWorkingDirectory)/**/*.zip'
      displayName: 'Deploy to Azure App Service'
```

### 5. Create Pipeline in DevOps
- **Pipelines → New Pipeline → GitHub → Select repo → Existing YAML file**.  
- Run pipeline on `main` branch.  

---

## ✅ Validation

- **Build stage:** Node.js installed, npm install/test succeeded, artifact published.  
- **Deploy stage:** Artifact downloaded, deployed to App Service.  
- **App Service URL:**  
  - `https://bootcamp-cicd-demo-app.azurewebsites.net` → `Hello Bootcamp!`  
  - `https://bootcamp-cicd-demo-app.azurewebsites.net/health` → `OK`  

---

## 🧩 Troubleshooting

- **Error: “No hosted parallelism has been purchased”**  
  → Use a self-hosted agent (`pool: name: 'Default'`).  

- **Error: “You do not have permission to view this directory or page”**  
  → Ensure `app.js` is at the root of the ZIP and `package.json` has `"start": "node app.js"`.  

- **App not starting**  
  → Check App Service logs: Portal → Diagnose and solve problems → Log stream.  

---

## 📘 About `.gitignore`

This repo includes a `.gitignore` to keep it clean:

- **node_modules/** → Prevents dependency bloat.  
- **Logs & temp files** → Avoids clutter.  
- **Build artifacts (`.zip`)** → Generated by pipeline, not stored in Git.  
- **.env files** → Protects secrets.  
- **Editor/OS files** → Ignores `.vscode/`, `.DS_Store`, etc.  

---

## 🔄 CI/CD Pipeline Flow Diagram

```
   [ Developer Commit ]
             |
             v
   ┌───────────────────────┐
   │   Azure DevOps Build  │
   │  - Install Node.js    │
   │  - npm install/test   │
   │  - Package app.zip    │
   └───────────────────────┘
             |
             v
   ┌───────────────────────┐
   │   Artifact Storage    │
   │   (drop/app.zip)      │
   └───────────────────────┘
             |
             v
   ┌───────────────────────┐
   │   Azure DevOps Deploy │
   │  - Download artifact  │
   │  - Deploy to AppSvc   │
   └───────────────────────┘
             |
             v
   ┌───────────────────────┐
   │   Azure App Service   │
   │  - Runs app.js        │
   │  - Exposes URL        │
   │  - /health endpoint   │
   └───────────────────────┘
             |
             v
   [ End User Accesses App ]
```

---

## 📚 References

- [Get started with Azure App Service](https://learn.microsoft.com/en-us/azure/app-service/getting-started)  
- [Build Node.js apps with Azure Pipelines](https://learn.microsoft.com/en-us/azure/devops/pipelines/ecosystems/javascript?view=azure-devops)  
- [Using Azure’s F1 Free Plan](https://

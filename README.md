# 🚀 Azure DevOps CI/CD Pipeline for Node.js App on Azure App Service

Automate build, test, and deployment of your Node.js application using Azure DevOps and Azure App Service.

---

## ⚡ Quick Start

```bash
# Clone repo & install dependencies
git clone <your-repo-url>
cd <your-repo>
npm install && npm test

# Package app
zip -r app.zip .

# Deploy to Azure App Service
az webapp up --name <app-name> --runtime "NODE|18-lts" --resource-group <rg-name>

# Verify deployment
curl https://<app-name>.azurewebsites.net/health
```

✅ Expect: `200 OK`

---

## 📖 Full Guide

### 1. Prerequisites

- Azure subscription  
- Azure DevOps account & project  
- Node.js & Git installed  
- Azure CLI installed  
- Sample Node.js app with:
  - `package.json`
  - `app.js` or `server.js`
  - `/health` endpoint

---

### 2. Pipeline Overview

```text
[ Developer Commit ]
        |
        v
[ Azure DevOps Build ]
  - Install Node.js
  - npm install/test
  - Package app.zip
        |
        v
[ Artifact Storage ]
        |
        v
[ Azure DevOps Deploy ]
  - Deploy to App Service
        |
        v
[ Azure App Service ]
  - Runs app.js
  - Exposes /health endpoint
        |
        v
[ End User Accesses App ]
```

---

### 3. Configure CI Pipeline

Create `.azure-pipelines.yml` in your repo:

```yaml
trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

steps:
- task: NodeTool@0
  inputs:
    versionSpec: '18.x'
  displayName: 'Install Node.js'

- script: |
    npm install
    npm test
  displayName: 'Install dependencies & run tests'

- task: ArchiveFiles@2
  inputs:
    rootFolderOrFile: '$(System.DefaultWorkingDirectory)'
    includeRootFolder: false
    archiveType: 'zip'
    archiveFile: '$(Build.ArtifactStagingDirectory)/app.zip'
    replaceExistingArchive: true

- task: PublishBuildArtifacts@1
  inputs:
    PathtoPublish: '$(Build.ArtifactStagingDirectory)'
    ArtifactName: 'drop'
```

✅ Build should succeed and `app.zip` appears in Artifacts.

---

### 4. Configure CD Pipeline

1. Go to **Pipelines → Releases → New Pipeline**  
2. Add Artifact → select `drop/app.zip`  
3. Add Stage → Deploy to Azure App Service  
4. Configure:
   - Azure subscription connection  
   - App Service name & resource group  

✅ Deployment logs should show success.

---

### 5. Verify Deployment

```bash
curl https://<app-name>.azurewebsites.net/health
```

✅ Expect: `200 OK`

---

### 6. Monitoring

1. Enable **Application Insights** in Azure Portal  
2. Open **Live Metrics Stream**  
3. Generate traffic:

```bash
for i in {1..20}; do curl https://<app-name>.azurewebsites.net/health; sleep 1; done
```

✅ Live Metrics should show activity.

---

### 7. Troubleshooting

#### 🚫 App won’t load
- Ensure App Service is running  
- Check runtime configuration  
- Add missing startup file (`web.config` or startup command)

#### ⚠ Pipeline fails
- Check permissions  
- Validate service connection  
- Fix YAML or missing files

#### 🛑 App deployed but not starting
```bash
az webapp log tail --name <app-name> --resource-group <rg-name>
```
- Check logs for runtime errors or missing config

#### 📉 Live Metrics empty
- Generate traffic  
- Restart App Service  
- Verify Insights connection string

#### 🔄 Git push rejected
```bash
git pull --rebase origin main
git push origin main
```

---

### 8. Cleanup

```bash
# Delete resource group (fastest)
az group delete --name <resource-group-name> --yes --no-wait
```

Also:
- Stop/Delete App Service  
- Remove Application Insights  
- Clean old pipeline runs/artifacts

✅ App URL should no longer respond.

---

### 9. Hands-On Exercises

- Break & Fix: Remove `web.config`, redeploy, troubleshoot  
- Pipeline Error: Misconfigure YAML, fix it  
- Monitoring Drill: Stop app, observe failures  
- Git Conflict: Trigger push rejection, resolve with rebase

---

## 🔑 Key Takeaways

- CI/CD reduces manual errors and speeds up delivery  
- Application Insights provides real-time visibility  
- Structured troubleshooting improves reliability  
- Cleanup is essential for cost and resource management

---

## 📚 Resources

- [Azure DevOps Pipelines](https://learn.microsoft.com/en-us/azure/devops/pipelines/)  
- [Azure App Service](https://learn.microsoft.com/en-us/azure/app-service/)  
- [Application Insights](https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview)  
- [Azure CLI Reference](https://learn.microsoft.com/en-us/cli/azure/)

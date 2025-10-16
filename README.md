# 🚀 Azure DevOps CI/CD Pipeline: Automating Build and Deployment to Azure App Service

!Azure DevOps
!Azure
!Node.js

---

⚡ Quick Start (For Advanced Users)

`bash

Clone repo & install dependencies
git clone <your-repo-url>
cd <your-repo>
npm install && npm test

Package app
zip -r app.zip .

Deploy directly to Azure App Service
az webapp up --name <app-name> --runtime "NODE|18-lts" --resource-group <rg-name>

Verify deployment
curl https://<app-name>.azurewebsites.net/health
`

✅ Expect: 200 OK

---

📖 Full Guide (Step by Step)

1. Prerequisites

- Azure subscription (with permissions to create resources)  
- Azure DevOps account + project  
- Node.js installed locally  
- Git installed  
- Azure CLI installed (az)  
- Sample Node.js app with:
  - package.json
  - app.js (or server.js)
  - /health endpoint returning 200 OK

---

2. Pipeline Flow (Conceptual Map)

`
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
`

---

3. Configure Build Pipeline (CI)

1. Go to Azure DevOps → Pipelines → New Pipeline  
2. Select your repo  
3. Choose YAML pipeline  
4. Add .azure-pipelines.yml:

`yaml
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
`

✅ Validation: Build succeeds, app.zip appears in Artifacts

---

4. Configure Release Pipeline (CD)

1. Go to Pipelines → Releases → New Pipeline  
2. Add Artifact → select drop/app.zip  
3. Add Stage: Deploy to Azure App Service  
4. Configure:
   - Azure subscription service connection  
   - App Service name + resource group  
5. Save & deploy  

✅ Validation: Deployment logs show success

---

5. Verify Deployment

`bash
curl https://<app-name>.azurewebsites.net/health
`

✅ Expect: 200 OK

---

6. Monitoring & Observability

1. In Azure Portal → App Service → Enable Application Insights  
2. Open Live Metrics Stream  
3. Generate traffic:

`bash
for i in {1..20}; do curl https://<app-name>.azurewebsites.net/health; sleep 1; done
`

✅ Validation: Live Metrics shows request activity

---

7. Troubleshooting

Framework:  
1. Reproduce issue  
2. Check basics  
3. Read error carefully  
4. Check logs + metrics  
5. Isolate problem  
6. Apply fix + retest  
7. Document resolution  

Common Issues:

<details>
<summary>🚫 App won’t load</summary>

- Service stopped → Start App Service  
- Wrong runtime → Update runtime  
- Missing startup file → Add web.config (Windows) or startup command (Linux)  

</details>

<details>
<summary>⚠ Pipeline fails</summary>

- Permission denied → Click Permit  
- Missing service connection → Re‑create  
- Build step fails → Fix YAML or missing files  

</details>

<details>
<summary>🛑 App deployed but not starting</summary>

`bash
az webapp log tail --name <appname> --resource-group <rg>
`

- Infra logs only → Missing web.config  
- Runtime errors → Fix code/packages  

</details>

<details>
<summary>📉 Live Metrics empty</summary>

- Generate traffic → curl /health  
- Restart App Service  
- Check Insights connection string  

</details>

<details>
<summary>🔄 Git push rejected</summary>

`bash
git pull --rebase origin main
git push origin main
`

</details>

---

8. Cleanup

1. Stop/Delete App Service  
   - Portal → App Service → Stop/Delete  

2. Remove Application Insights  
   - Portal → Application Insights → Delete  

3. Delete Resource Group (fastest)  
   `bash
   az group delete --name <resource-group-name> --yes --no-wait
   `

4. Clean Azure DevOps Artifacts  
   - Delete old pipeline runs/artifacts  

✅ Validation: Resource group gone, app URL no longer responds

---

9. Hands‑On Exercises

- Break & Fix: Remove web.config, redeploy, troubleshoot  
- Pipeline Error: Misconfigure YAML, fix it  
- Monitoring Drill: Stop app, observe failures in Live Metrics  
- Git Conflict: Trigger push rejection, resolve with rebase  

---

🔑 Key Takeaways

- CI/CD automates build + deploy, reducing manual errors  
- Monitoring with Application Insights provides real‑time visibility  
- Troubleshooting is structured, not guesswork  
- Cleanup is part of the DevOps lifecycle  

---

📚 References & Resources

🔗 Official Documentation

- Azure DevOps Pipelines  
- Azure App Service  
- Application Insights  
- Azure CLI Reference  

📝 Tutorials & Guides

- Quickstart: Create your first pipeline in Azure DevOps  
- Deploy a Node.js web app to Azure App Service  
- Continuous Deployment to Azure App Service  

🎥 Videos & Learning Paths

- Microsoft Learn: Build applications with Azure DevOps  
- YouTube: Azure DevOps CI/CD Pipeline Tutorials  

🛠 Tools

- Azure CLI  
- Git  
- Node.js  
`


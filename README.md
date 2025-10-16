# 🚀 Azure DevOps CI/CD Pipeline – Automating Build and Deployment to Azure App Service

## Scenario

You’ve been handed a Node.js web application called **LearnSphere**, ready for deployment. The team wants to streamline releases by implementing a **CI/CD pipeline using Azure DevOps**. The goal: automate everything from code commit to build, package, deploy, and monitor on **Azure App Service**.

**Demo Repo:**  
https://github.com/josephjem2/bootcamp-cicd-demo.git

---

## Objectives

1. Fork and clone the dummy app repository  
2. Run the app locally and validate the `/health` endpoint  
3. Deploy the app to Azure App Service (Free F1 plan)  
4. Create an Azure DevOps project and configure a service connection  
5. Set up a YAML pipeline to build, package, and publish the app  
6. Add a deployment stage to push the app to Azure App Service  
7. Validate the deployment by browsing the app and testing `/health`  
8. Troubleshoot common issues (artifacts, start script, hosted agent limits)  
9. Add monitoring with Application Insights

---

## Prerequisites

- Azure account (Free Trial)
- Azure DevOps organization (Sign up free)
- Node.js 20.x installed locally
- Git & PowerShell

---

## 1. Fork and Clone the Repository

```bash
git clone https://github.com/<your-username>/bootcamp-cicd-demo.git
cd bootcamp-cicd-demo
```
> Replace `<your-username>` with your GitHub username.

---

## 2. Run the App Locally

```bash
npm install
npm start
```
- Visit http://localhost:3000 → should display **Hello Bootcamp!**
- Visit http://localhost:3000/health → should return **OK**

> ⚠️ If you see `npm warn EBADENGINE`, it’s a version mismatch. For demo, continue; for production, match Node.js version.

---

## 3. Deploy the App to Azure App Service

1. In **Azure Portal**, search for **App Service**.
2. Click **Create → Web App**.
3. Fill out:
   - Resource Group: e.g., `bootcamp-rg`
   - Name: globally unique, e.g., `bootcamp-cicd-demo-app`
   - Region: closest to you
   - Runtime stack: Node.js 20 (Windows)
   - Pricing plan: Free (F1)
4. Leave other settings as default → **Review + Create → Create**
5. Once deployed, test the default URL:  
   `https://<appname>.azurewebsites.net`

---

## 4. Create Azure DevOps Project & Service Connection

1. Go to Azure DevOps, create a new organization if needed.
2. Create a new project (e.g., `bootcamp-cicd-demo`).
3. Navigate to **Project Settings → Service connections → New service connection**.
4. Choose **Azure Resource Manager → Service principal (automatic)**.
5. Name it (e.g., `AzureBootcampConnection`), grant access to all pipelines.

---

## 5. (Optional) Create a Self-Hosted Agent

1. Go to **Project Settings → Agent pools**.
2. Create an **Agent Pool** (e.g., `BootcampPool`).
3. Download and configure the agent on your machine (Windows recommended).
4. Extract the ZIP, run `.\\config.cmd` in PowerShell, provide:
   - Server URL: `https://dev.azure.com/<yourorg>`
   - Authentication: PAT (Personal Access Token)
   - Agent pool: `BootcampPool`
   - Agent name: e.g., `bootcamp-agent-1`
5. Start the agent: `.\\run.cmd`
6. (Optional) Install as a service: `.\\svc install` then `.\\svc start`
7. Verify in Azure DevOps: Agent should show as **Online**.

---

## 6. Set Up the Build Pipeline

1. In Azure DevOps, go to **Pipelines → New Pipeline**.
2. Select **GitHub → your forked repo**.
3. Choose **Existing Azure Pipelines YAML file** → select `azure-pipelines.yml`.
4. Review and run the pipeline.

**Sample `azure-pipelines.yml`:**

```yaml
trigger:
- main

pool:
  vmImage: 'ubuntu-latest' # Or your self-hosted pool

steps:
- task: NodeTool@0
  inputs:
    versionSpec: '20.x'
  displayName: 'Install Node.js'

- script: |
    npm install
    npm test
  displayName: 'Install dependencies & run tests'

- task: CopyFiles@2
  inputs:
    SourceFolder: '$(Build.SourcesDirectory)'
    Contents: |
      app.js
      package.json
      package-lock.json
      web.config
      node_modules/**/* 
    TargetFolder: '$(Build.ArtifactStagingDirectory)/app'
  displayName: 'Stage app files'

- task: ArchiveFiles@2
  inputs:
    rootFolderOrFile: '$(Build.ArtifactStagingDirectory)/app'
    includeRootFolder: false
    archiveType: 'zip'
    archiveFile: '$(Build.ArtifactStagingDirectory)/app.zip'
    replaceExistingArchive: true

- task: PublishBuildArtifacts@1
  inputs:
    PathtoPublish: '$(Build.ArtifactStagingDirectory)'
    ArtifactName: 'drop'
```

> **Validation:** Build succeeds, `app.zip` appears in Artifacts.

---

## 7. Add Deployment Stage

Add to your pipeline YAML:

```yaml
- task: AzureWebApp@1
  inputs:
    azureSubscription: '$(azureServiceConnection)'
    appName: '$(appServiceName)'
    package: '$(System.DefaultWorkingDirectory)/**/*.zip'
  displayName: 'Deploy to Azure App Service'
```

> **Validation:** Deployment logs show success, App Service updated.

---

## 8. Validate Deployment

- Visit `https://<appname>.azurewebsites.net` → **Hello Bootcamp!**
- Visit `https://<appname>.azurewebsites.net/health` → **OK**

---

## 9. Monitoring with Application Insights

1. In Azure Portal → App Service → **Application Insights** → **Enable** → Apply.
2. Open **Live Metrics Stream** in Application Insights.
3. Generate traffic:
   ```bash
   for i in {1..20}; do curl https://<appname>.azurewebsites.net/health; sleep 1; done
   ```
4. Watch Live Metrics update (request rate, response times, success rate).

> **Simulate a failure:** Stop App Service, run the loop again, observe failures in Live Metrics.

---

## 🔍 Troubleshooting

### Framework

1. Reproduce the issue
2. Check the basics (app running, URL correct)
3. Read error messages
4. Check logs & metrics
5. Isolate the problem (code, config, platform)
6. Apply fix & retest
7. Document the resolution

### Common Issues & Fixes

- **App won’t load:** Service stopped, wrong runtime, missing startup file (`web.config` or startup command)
- **Pipeline fails:** Permission denied, missing service connection, build step fails (check YAML, missing files)
- **App deployed but not starting:** Tail logs with  
  ```bash
  az webapp log tail --name <appname> --resource-group <rg>
  ```
- **Live Metrics empty:** Enable Application Insights, generate traffic, restart App Service, check connection string
- **Git push rejected:**  
  ```bash
  git pull --rebase origin main
  git push origin main
  ```

---

## 🧪 Hands-On Exercises

- **Break & Fix:** Remove `web.config`, redeploy, troubleshoot
- **Pipeline Error:** Misconfigure YAML, fix it
- **Monitoring Drill:** Stop app, observe failures in Live Metrics
- **Git Conflict:** Trigger push rejection, resolve with rebase

---

## 🧹 Cleanup (Recommended)

1. **Stop or Delete App Service:**  
   Azure Portal → App Service → Stop/Delete  
   > Validation: App URL no longer responds

2. **Remove Application Insights:**  
   Delete the resource  
   > Validation: No telemetry charges

3. **Delete Resource Group (fastest):**  
   ```bash
   az group delete --name <resource-group-name> --yes --no-wait
   ```
   > Validation: All resources in RG are gone

4. **Clean Azure DevOps Artifacts:**  
   Delete pipeline runs/artifacts if not needed  
   > Validation: No leftover artifacts consuming storage

---

## ✅ Key Takeaways

- Troubleshooting is **structured, not guesswork**
- Logs & metrics are your best allies
- Every error is a **learning opportunity**
- Documenting fixes builds a **knowledge base** for the team

---

## 📚 References

- [Get started with Azure App Service](https://learn.microsoft.com/en-us/azure/app-service/getting-started)
- [Build Node.js apps with Azure Pipelines](https://learn.microsoft.com/en-us/azure/devops/pipelines/ecosystems/javascript?view=azure-devops)
- [Using Azure’s F1 Free Plan](https://dev.to/dhanushreddy29/using-azures-f1-free-plan-to-host-a-rest-api-3l4m)
- [Deploy Node.js Web App with Azure DevOps](https://dev.to/s3cloudhub/how-to-deploy-a-nodejs-web-app-on-azure-devops-a-step-by-step-guide-2bf9)
- [Video: Build & Deploy Node.js Apps with Azure DevOps](https://www.youtube.com/watch?v=fdFENpeQWi0)

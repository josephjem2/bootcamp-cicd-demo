# 🚀 Azure DevOps CI/CD Pipeline: Automating Build and Deployment to Azure App Service

![Azure DevOps](https://img.shields.io/badge/Azure%20DevOps-CI%2FCD-blue?logo=azuredevops)
![Azure](https://img.shields.io/badge/Azure-App%20Service-0089D6?logo=microsoftazure)
![Node.js](https://img.shields.io/badge/Node.js-Deploy-green?logo=node.js)

## 📖 Overview
This project demonstrates how to set up a **CI/CD pipeline** in Azure DevOps to automate the build, test, and deployment of a Node.js application to **Azure App Service**.  

You will learn how to:
- Configure Azure DevOps pipelines (build + release).
- Package and publish artifacts.
- Deploy to Azure App Service.
- Monitor with Application Insights.
- Troubleshoot common issues systematically.
- Clean up resources responsibly.

---

## 📑 Table of Contents
1. [Pipeline Flow](#-pipeline-flow)
2. [Prerequisites](#%EF%B8%8F-prerequisites)
3. [Step 1: Configure Build Pipeline](#%EF%B8%8F-step-1-configure-build-pipeline)
4. [Step 2: Configure Release Pipeline](#-step-2-configure-release-pipeline)
5. [Step 3: Verify Deployment](#-step-3-verify-deployment)
6. [Step 4: Monitoring & Observability](#-step-4-monitoring--observability)
7. [Step 5: Troubleshooting](#%EF%B8%8F-step-5-troubleshooting)
8. [Step 6: Cleanup](#-step-6-cleanup)
9. [Hands-On Exercises](#-hands-on-exercises)
10. [Key Takeaways](#-key-takeaways)

---

## 🗺️ Pipeline Flow

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

## ⚙️ Prerequisites
- Azure subscription with permissions to create App Services.
- Azure DevOps project with repo + pipeline access.
- Node.js application (with `package.json` and `/health` endpoint).
- Git installed locally.
- Azure CLI installed (`az`).

---

## 🏗️ Step 1: Configure Build Pipeline
1. In Azure DevOps → Pipelines → New Pipeline.
2. Connect to your repo.
3. Use YAML pipeline with steps:
   - Install Node.js.
   - Run `npm install` and `npm test`.
   - Package app into `app.zip`.
4. Publish artifact to `drop/`.

✅ **Validation:** Build succeeds and `app.zip` appears in Artifacts tab.

---

## 🚀 Step 2: Configure Release Pipeline
1. Create a Release pipeline in Azure DevOps.
2. Add **Artifact** → select `drop/app.zip`.
3. Add **Stage: Deploy to Azure App Service**.
4. Configure service connection to Azure subscription.
5. Deploy artifact to App Service.

✅ **Validation:** Deployment logs show success.

---

## 🌐 Step 3: Verify Deployment
- Visit: `https://<app>.azurewebsites.net/health`
- Expected response: `200 OK`

✅ **Validation:** App responds successfully.

---

## 📊 Step 4: Monitoring & Observability
1. Enable **Application Insights** in App Service.
2. Open **Live Metrics Stream**.
3. Generate traffic:
   ```bash
   for i in {1..20}; do curl https://<app>.azurewebsites.net/health; sleep 1; done
   ```
4. Watch request rate and response times update in real time.

✅ **Validation:** Live Metrics shows request activity.

---

## 🛠️ Step 5: Troubleshooting

### Framework
1. Reproduce issue  
2. Check basics (URL, service status)  
3. Read error carefully  
4. Check logs + metrics  
5. Isolate problem (code vs config vs platform)  
6. Apply fix + retest  
7. Document resolution  

### Common Issues
<details>
<summary>🚫 App won’t load in browser</summary>

- Service stopped → Start App Service  
- Wrong runtime → Update runtime  
- Missing startup file → Add `web.config` (Windows) or `STARTUP_COMMAND` (Linux)  

</details>

<details>
<summary>⚠️ Pipeline fails</summary>

- Permission denied → First run requires clicking **Permit**  
- Missing service connection → Re‑create connection  
- Build step fails → Check YAML for missing files  

</details>

<details>
<summary>🛑 App deployed but not starting</summary>

- Tail logs:
  ```bash
  az webapp log tail --name <appname> --resource-group <rg>
  ```
- Infra logs only → Missing `web.config`  
- Runtime errors → Fix code/package issues  

</details>

<details>
<summary>📉 Live Metrics empty</summary>

- Generate traffic → curl `/health`  
- Restart App Service  
- Check `APPLICATIONINSIGHTS_CONNECTION_STRING`  

</details>

<details>
<summary>🔄 Git push rejected</summary>

```bash
git pull --rebase origin main
git push origin main
```

</details>

---

## 🧹 Step 6: Cleanup
To avoid unnecessary costs:

1. **Stop/Delete App Service**  
   - Portal → App Service → Stop/Delete  

2. **Remove Application Insights**  
   - Portal → Application Insights → Delete  

3. **Delete Resource Group (fastest)**  
   ```bash
   az group delete --name <resource-group-name> --yes --no-wait
   ```  

4. **Clean Azure DevOps Artifacts**  
   - Delete old pipeline runs/artifacts  

✅ **Validation:** Resource group no longer exists, app URL no longer responds.

---

## 🧑‍💻 Hands-On Exercises
- Break & Fix: Remove `web.config`, redeploy, troubleshoot.  
- Pipeline Error: Misconfigure YAML, fix it.  
- Monitoring Drill: Stop app, observe failures in Live Metrics.  
- Git Conflict: Trigger push rejection, resolve with rebase.  

---

## ✅ Key Takeaways
- CI/CD automates build + deploy, reducing manual errors.  
- Monitoring with Application Insights provides real‑time visibility.  
- Troubleshooting is **structured, not guesswork**.  
- Cleanup is part of the DevOps lifecycle.  

## 📚 References

- [Get started with Azure App Service](https://learn.microsoft.com/en-us/azure/app-service/getting-started)  
- [Build Node.js apps with Azure Pipelines](https://learn.microsoft.com/en-us/azure/devops/pipelines/ecosystems/javascript?view=azure-devops)  

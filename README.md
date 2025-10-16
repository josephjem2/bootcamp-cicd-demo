Azure DevOps CI/CD Pipeline – 
Automating Build and 
Deployment to Azure App 
Service
Scenario
Youʼve been handed a Node.js w eb applic ation c alled LearnSpher e, which is  
activ ely maint ained and r eady for deplo yment. The t eam want s to str eamline their  
release pr ocess b y implementing a CI/CD pipeline using Azur e De vOps . The go al 
is to aut omat e everything: fr om code commit t o build, p ackage, and deplo y, all the  
way to a liv e, running app on Azur e App Ser vice .
The applic ation is simple but pr oduction‑r eady. It includes a r oot r oute that r etur ns 
a welcome message and a / h e a l t h endpoint f or monit oring. 
Hereʼs the r epo y ouʼll be w orking with:
📦 https://github.com/josephjem2/boot camp-cicd-demo.git
Objectives
 Fork and clone the dumm y app r eposit ory
 Run the app loc ally and v alidat e the / h e a l t h endpoint
 Deplo y the app t o Azur e App Ser vice F ree F1 plan)
 Create an Azur e De vOps pr oject and configur e a ser vice connection
 Set up a Y AML pipeline t o build, p ackage, and publish the app
 Add a deplo yment st age t o push the app t o Azur e App Ser vice
 Validat e the deplo yment b y browsing the app and t esting / h e a l t h
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
1
 Troubleshoot common issues (ar tifacts, st art scr ipt, host ed agent limit s)
 Add monit oring with Applic ation Insight s
Note: We will use Azur e Portal and Azur e De vOps  dur ing this demonstration.  
While doing this challenge y ourself , we encourage y ou to use 
infrastructur e‑as‑code  ARM/Bicep/T erraform) for pr oduction scenar ios.
Note 2 For this challenge, y ouʼll need an Azur e account  (you c an secur e a $200  
free tr ial here) and an Azur e De vOps or ganization  (sign up fr ee).
 Prerequisites
• Azur e account F ree T rial OK
• Azur e De vOps or ganization
• Node.js 20 .x inst alled loc ally
• Git & P owerShell
O b j e c t i v e  1 :  F o r k  a n d  C l o n e  t h e  R e p o s i t o r y
 Go t o the pr ovided r epo:
👉 https://github.com/josephjem2/boot camp-cicd-demo.git
 Fork it int o your o wn GitHub account.
 Clone it loc ally:
git clone ht tps://github.com/<y our-user name>/boot camp-cicd-demo.git
cd boot camp-cicd-demo Tip: R eplace  with y our GitHub user name
💡 Tip: R eplace  with y our GitHub user name
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
2
“Cloning the r eposit ory and na vigating int o the pr oject f older using P owerShell. ˮ
O b j e c t i v e  2 :  R u n  t h e  A p p  L o c a l l y
 Install dependencies:
npm inst all
“Inst alling pr oject dependencies. Not e the war ning: the app e xpect s Node.js  
20.x, but her e a ne wer version (v2 4.x) is inst alled. F or the demo it still w orks, 
but in pr oduction alwa ys mat ch the r equir ed engine v ersion. ˮ
 Start the app:
npm st art
“Starting the app loc ally. It should bind t o por t 3000 .ˮ
Validat e:
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
3
http://loc alhost:3000   should displa y Hello Boot camp!
http://loc alhost:3000/he alth → should r etur n OK
💡⚠ If you see n p m  w a r n  E B A D E N G I N E , itʼs just a v ersion mismat ch. 
Continue f or the demo.
O b j e c t i v e  3 :  D e p l o y  t h e  A p p  t o  A z u r e  A p p  S e r v i c e
 In the Azur e Portal, search for App Ser vice .
 Click Create  W eb App .
 Fill out the b asics:
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
4
Resour ce Gr oup:  Create or r euse one ( e.g., b o o t c a m p - r g).
Name:  Must be glob ally unique ( e.g., b o o t c a m p - c i c d - d e m o - a p p).
Region:  Closest t o you.
Runtime st ack:  Node.js 20 Windo ws).
Pricing plan:  Free F1.
 Leave other set tings as def ault → Review  Cr eate  Cr eate.
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
5
 Once deplo yed, t est the def ault URL
h t t p s : / / < a p p n a m e > . a z u r e w e b s i t e s . n e t
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
6
“This is the def ault Azur e placeholder p age. I t confir ms the App Ser vice is liv e, 
but no code has been deplo yed y et.ˮ
Perfect — her eʼs a Notion‑r eady layout of y our pipeline diagram, complet e with 
toggles,  callout s, and v alidation checkpoint s. You c an cop y‑paste this dir ectly 
into your Notion boot camp guide.
🚀  C I / C D  P i p e l i n e  F l o w  ( V i s u a l  M a p )
 De veloper Commit ]
        |
        v
┌───────────────────────┐
│   Azur e De vOps Build  │
│   Inst all Node.js    │
│  - npm inst all/test   │
│   Package app.zip    │
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
7
└───────────────────────┘
        |
        v
┌───────────────────────┐
│   Ar tifact St orage    │
│   (drop/app.zip )      │
└───────────────────────┘
        |
        v
┌───────────────────────┐
│   Azur e De vOps Deplo y │
│   Do wnlo ad ar tifact  │
│   Deplo y to AppSv c   │
└───────────────────────┘
        |
        v
┌───────────────────────┐
│   Azur e App Ser vice   │
│   Runs app.js        │
│   Exposes URL        │
│  - /he alth endpoint   │
└───────────────────────┘
        |
        v
 End User Accesses App ]
🔽  I n t e r a c t i v e  T o g g l e s  f o r  E a c h  S t a g e
 De veloper Commit ]
Details
What happens:  Developer pushes code t o repo.
Common er rors:  Wrong branch, missing files.
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
8
Validation checkpoint:  Commit appe ars in Azur e De vOps  Pipelines  
triggers aut omatic ally.
Azur e De vOps Build
Details
What happens:  Inst alls Node.js, runs n p m  i n s t a l l / t e s t, packages int o a p p . z i p.
Common er rors:  Missing p a c k a g e . j s o n, failing t ests, wr ong Node v ersion.
Validation checkpoint:  Build succeeds, ar tifact a p p . z i p created.
Artifact St orage
Details
What happens:  Build output st ored in d r o p / folder .
Common er rors:  Artifact not published, pipeline misconfigur ed.
Validation checkpoint:  Artifact visible in Azur e De vOps  Pipelines   
Artifacts tab.
Azur e De vOps Deplo y
Details
What happens:  Downlo ads ar tifact, deplo ys to App Ser vice.
Common er rors:  Ser vice connection missing, wr ong r esour ce gr oup,  
permission denied.
Validation checkpoint:  Deplo yment logs sho w success, App Ser vice  
updat ed.
Azur e App Ser vice
Details
What happens:  Runs a p p . j s, exposes URL, / h e a l t h endpoint r esponds.
Common er rors:  Missing w e b . c o n f i g Windo ws), wr ong st artup command  
Linux), runtime mismat ch.
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
9
Validation checkpoint:  Visit h t t p s : / / < a p p > . a z u r e w e b s i t e s . n e t / h e a l t h → r etur ns 2 0 0  
O K.
 End User A ccesses App ]
Details
What happens:  Users access the deplo yed app via br owser .
Common er rors:  DNS not r esol ving, app st opped, SSL misconfigur ed.
Validation checkpoint:  App lo ads in br owser , / h e a l t h endpoint confir ms 
availabilit y.
O b j e c t i v e  4 :  C r e a t e  a n  A z u r e  D e v O p s  P r o j e c t  &  S e r v i c e  
C o n n e c t i o n  &  Create a Self‑Hosted Agent
 Go t o Azur e De vOps . On the r ight, y ouʼll see the “Create ne w or ganization ˮ 
button if y ou don ʼt already ha ve one.
 Create a ne w pr oject ( e.g., b o o t c a m p - c i c d - d e m o).
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
10
 Navigat e to Project Set tings  Ser vice connections  Ne w ser vice  
connection .
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
11
“Ser vice connections let Azur e De vOps authenticat e t o e x t er nal ser vices lik e  
Azur e. Click ‘Cr eat e ser vice connection ʼ t o set one up. ˮ
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
12
 Choose Azur e Resour ce Manager  Ser vice pr incip al (aut omatic ).
 Name it A z u r e B o o t c a m p C o n n e c t i o n.
 Grant access t o all pipelines.
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
13
“Cr eat e an Azur e R esour ce Manager ser vice connection. Select y our  
subscr iption, choose the r esour ce gr oup hosting y our App Ser vice, and name it 
A z u r e B o o t c a m p C o n n e c t i o n . Check ‘Gr ant access t o all pipelinesʼ so it can be r eused. ˮ
(Optional Advanced) Create a Self‑Hosted Agent
 Go t o Project Set tings  and select A gent pools
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
14
 Create an Agent P ool (e.g., B o o t c a m p P o o l).
a Downlo ad and configur e the agent on y our machine.
b Choose Windo ws as the OS.
c Downlo ad the ZIP p ackage pr ovided.
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
15
2 .  E x t r a c t  t h e  P a c k a g e
 Create a f older , e.g., C  \ a g e n t.
 Extract the ZIP cont ents int o that f older .
After extraction, y ou should see files lik e:
c o n f i g . c m d
r u n . c m d
s v c  i n s t a l l
3 .  C o n f i g u r e  t h e  A g e n t
 Open PowerShell  as Administrat or.
 Navigat e to the f older:
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
16
cd C\agent
 Run the configuration scr ipt:
.\config.cmd
 Provide the f ollowing when pr ompt ed:
Server URL  h t t p s : / / d e v . a z u r e . c o m / < y o u r o r g >
Authentic ation t ype:  PAT P ersonal Access T oken)
PAT Create one in User Set tings  P ersonal A ccess T okens with  
scope: Agent P ools (r ead & manage ).
Agent pool:  B o o t c a m p P o o l (the one y ou cr eated).
Agent name:  e.g., b o o t c a m p - a g e n t - 1.
Work folder:  Press Ent er to accept def ault ( _ w o r k).
4 .  R u n  t h e  A g e n t
Start the agent int eractiv ely to test:
.\run.cmd
You should see logs lik e “List ening f or jobsˮ .
5 .  I n s t a l l  a s  a  S e r v i c e  ( O p t i o n a l ,  R e c o m m e n d e d )
To keep the agent running in the b ackground:
.\svc inst all
.\svc start
This wa y, it st arts aut omatic ally with Windo ws.
7 .  V e r i f y  i n  A z u r e  D e v O p s
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
17
Go b ack t o Organization Set tings  A gent pools  Boot campP ool.
You should see y our agent list ed as Online .
8 .  U p d a t e  Y o u r  P i p e l i n e  Y A M L
Point y our pipeline t o the self‑host ed pool:
pool:
  name: Boot campP ool
C I / C D  P i p e l i n e  F l o w  ( V i s u a l  M a p )
 De veloper Commit ]
        |
        v
┌───────────────────────┐
│   Azur e De vOps Build  │
│   Inst all Node.js    │
│  - npm inst all/test   │
│   Package app.zip    │
└───────────────────────┘
        |
        v
┌───────────────────────┐
│   Ar tifact St orage    │
│   (drop/app.zip )      │
└───────────────────────┘
        |
        v
┌───────────────────────┐
│   Azur e De vOps Deplo y │
│   Do wnlo ad ar tifact  │
│   Deplo y to AppSv c   │
└───────────────────────┘
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
18
        |
        v
┌───────────────────────┐
│   Azur e App Ser vice   │
│   Runs app.js        │
│   Exposes URL        │
│  - /he alth endpoint   │
└───────────────────────┘
        |
        v
 End User Accesses App ]
🔽  I n t e r a c t i v e  T o g g l e s  f o r  E a c h  S t a g e
 De veloper Commit ]
Details
What happens:  Developer pushes code t o repo.
Common er rors:  Wrong branch, missing files.
Validation checkpoint:  Commit appe ars in Azur e De vOps  Pipelines  
triggers aut omatic ally.
Azur e De vOps Build
Details
What happens:  Inst alls Node.js, runs n p m  i n s t a l l / t e s t, packages int o 
a p p . z i p.
Common er rors:  Missing p a c k a g e . j s o n, failing t ests, wr ong Node v ersion.
Validation checkpoint:  Build succeeds, ar tifact a p p . z i p created.
Artifact St orage
Details
What happens:  Build output st ored in d r o p / folder .
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
19
Common er rors:  Artifact not published, pipeline misconfigur ed.
Validation checkpoint:  Artifact visible in Azur e De vOps  Pipelines   
Artifacts tab.
Azur e De vOps Deplo y
Details
What happens:  Downlo ads ar tifact, deplo ys to App Ser vice.
Common er rors:  Ser vice connection missing, wr ong r esour ce gr oup,  
permission denied.
Validation checkpoint:  Deplo yment logs sho w success, App Ser vice  
updat ed.
Azur e App Ser vice
Details
What happens:  Runs a p p . j s, exposes URL, / h e a l t h endpoint r esponds.
Common er rors:  Missing w e b . c o n f i g Windo ws), wr ong st artup 
command Linux), runtime mismat ch.
Validation checkpoint:  Visit h t t p s : / / < a p p > . a z u r e w e b s i t e s . n e t / h e a l t h → r etur ns 
2 0 0  O K.
 End User A ccesses App ]
Details
What happens:  Users access the deplo yed app via br owser .
Common er rors:  DNS not r esol ving, app st opped, SSL misconfigur ed.
Validation checkpoint:  App lo ads in br owser , / h e a l t h endpoint confir ms 
availabilit y.
O b j e c t i v e  5 :  S e t  U p  t h e  B u i l d  P i p e l i n e
 In Azur e De vOps, go t o Pipelines  Ne w Pipeline .
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
20
“Start by creating a ne w pipeline in Azur e De vOps. Pipelines aut omat e your build  
and deplo yment pr ocess. ˮ
 Select GitHub → y our f orked repo.
 Choose Existing Azur e Pipelines Y AML f ile → select a z u r e - p i p e l i n e s . y m l.
 Review the Y AML (alr eady included in r epo) and run it:
“R e vie w the a z u r e - p i p e l i n e s . y m l  file. This Y AML defines the pipeline st ages: it uses the 
A z u r e B o o t c a m p C o n n e c t i o n  ser vice connection, t ar get s the b o o t c a m p - c i c d - d e m o - a p p  App  
Ser vice, and runs on an Ubuntu agent. Pipelines as code mak e y our CI/CD  
pr ocess r epeat able and v ersion‑contr olled. ˮ
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
21
5. azure-pipelines.yml (Build stage)
- task: Cop yFiles@2
  input s:
    Sour ceFolder: '$Build.Sour cesDir ectory)'
    Cont ents: |
      app.js
      package.json
      package-lock.json
      web.config
      node_ modules/**/*
    TargetF older: '$Build.Ar tifactSt agingDir ectory)/app '
  displa yName: 'St age app files'
🚨 Common mist ake: forgetting w e b . c o n f i g. Without it, the app w onʼt aut o‑start on 
Windo ws App Ser vice.
💡Note: if y ou see this notific ation belo w:
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
22
💡
💡 “The pipeline paused because it needs per mission t o use the Def aul t  
agent pool. Click P er mit  t o gr ant access so the run can continue. ˮ
Mak e sur e you followed the pr evious st ep on How to create a Self A gent
Why this mat ters:
It sho ws le arners that Azur e De vOps enf orces secur ity checks  — 
pipelines c anʼt just run against r esour ces without appr oval.
“ An agent pool  is just a gr oup of machines that Azur e De vOps uses  
t o run y our pipeline jobs. Think of it as the w or k er that actuall y  
builds and deplo ys y our app. The first time y ou run a pipeline,  
De vOps asks y ou t o confir m that itʼ s allo w ed t o use this pool. By  
clicking P er mit , y ou ʼ r e gr anting that per mission so the pipeline can  
continue. ˮ
 Build st age:  Inst alls Node.js, runs n p m  i n s t a l l, packages app int o a p p . z i p, 
publishes ar tifact.
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
23
"This is the hear t of our CI/CD pipeline. The BuildJob  st age. I tʼ s wher e Azur e  
De vOps pulls our code, inst alls dependencies, runs linting and t est s, and  
pack ages the app f or deplo yment. "
"Each st ep her e has a gr een checkmar k, which means e v er y thing r an  
successfull y . W e can see it used Node.js 16 .x, inst alled 139 pack ages, and passed  
all t est s. That confir ms our app is st able and r ead y t o ship. "
" A t the bot t om, w e see the final st ep: Deplo y t o Azur e App Ser vice . That means  
our app is no w liv e — pushed str aight fr om GitHub t o the cloud, aut omaticall y . "
O b j e c t i v e  6 :  A d d  D e p l o y m e n t  S t a g e
1. Azure-pipelines.yml (Deploy stage)
task: Azur eWebApp@1 input s: azur eSubscr iption: '$(azur eSer viceConnectio
n)' appName: '$(appSer viceName )' package: '$Syst em.Def aultWorkingDir ect
ory)/**/* .zip' displa yName: 'Deplo y to Azur e App Ser vice '
💡ℹ App Ser vice runs in Run F rom P ackage  mode  ZIP is mount ed 
read‑onl y in w w w r o o t.
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
24
 The Y AML alr eady includes a Deplo y stage:
Downlo ads the ar tifact.
Uses A z u r e W e b A p p @ 1 task t o deplo y to your App Ser vice.
References the ser vice connection A z u r e B o o t c a m p C o n n e c t i o n.
"This scr een sho ws the final st age of our pipeline. The Deplo y Job . Af t er building  
and pack aging the app, Azur e De vOps aut omaticall y pushes it t o our Azur e App  
Ser vice. "
"W e can see it do wnloaded the build ar tif act, e x ecut ed the deplo yment t ask using 
A z u r e W e b A p p V 1 , and complet ed with a success message. That means our app is no w
liv e in the cloud — no manual st eps, no missed configur ations. "
"This is the po w er of CI/CD e v er y time w e push code, itʼ s t est ed, pack aged, and  
deplo y ed aut omaticall y . Letʼ s swit ch t o the br o wser and see it in action. "
O b j e c t i v e  7 :  V a l i d a t e  D e p l o y m e n t
 Confir m Build  and Deplo y succeed.
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
25
"This summar y vie w sho ws our entir e pipeline run fr om st ar t t o finish. I t w as  
manuall y tr igger ed, r an f or just under 8 minut es, and complet ed both st ages: 
Build and P ack age  and Deplo y t o Azur e App Ser vice . "
"The build st age t ook 2 minut es and pr oduced a clean ar tif act. The deplo yment  
st age t ook 5 minut es and successfull y pushed that ar tif act t o Azur e. That means  
our app is no w liv e — t est ed, pack aged, and deplo y ed aut omaticall y . "
"This is the full CI/CD loop in action: fr om code commit t o cloud deplo yment, with  
e v er y st ep logged, tr aceable, and r epeat able. "
 In Azur e Portal  App Ser vice  Ov erview  Br owse.
"This is the Azur e por t al sho wing our deplo y ed w eb app: boot camp-cicd-demo-
app . I tʼ s running on Windo ws, using the Node.js runtime, and host ed in the Centr al  
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
26
US r egion. "
"The app is liv e — st atus is Running , and w e ʼ v e got a def aul t  
domain: h t t p s : / / b o o t c a m p - c i c d - d e m o - a p p . a z u r e w e b s i t e s . n e t
Thatʼ s the public URL wher e our pipeline just deplo y ed the app. "
"Ev er y thing w e buil t and pack aged in Azur e De vOps is no w ser v ed fr om this  
endpoint. F r om her e, w e can v alidat e the homepage, check / h e a l t h , and confir m  
our deplo yment w as successful. "
 Validat e:
h t t p s : / / < a p p n a m e > . a z u r e w e b s i t e s . n e t → Hello Boot camp!
h t t p s : / / < a p p n a m e > . a z u r e w e b s i t e s . n e t / h e a l t h → OK
( O p t i o n a l  f o r  t h e  l a b )  O b j e c t i v e  8 :  
M o n i t o r i n g
💡 Why: After deplo yment, y ou need t o confir m the app is he althy and  
responding. Azur e provides buil t‑in monit oring with Applic ation Insight s.
1. Enable Application Insights
In your App Ser vice → lef t menu → Applic ation Insight s → Enable   Appl y.
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
27
2. Open Live Metrics Stream
Once in the Applic ation Insight s resour ce, look f or the  "Liv e Metr ics Str eam" 
option under the "Investigat e" section. This will allo w you to vie w log dat a and
other metr ics in ne ar real-time.
💡Youʼll see char ts for:
• Incoming R equest s ( r at e & dur ation)
• Out going R equest s ( dependencies)
• Ser v er Heal t h CPU ,  memor y)
At first, y ou ma y see a demo o verlay or “Not a vailable ˮ message —  
that just me ans no traf fic has r eached y our app y et
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
28
3. Generate Traffic
To light up Liv e Metr ics, y ou need t o send r equest s to your app:
Browser met hod:  Open h t t p s : / / < y o u r - a p p > . a z u r e w e b s i t e s . n e t / h e a l t h and r efresh se veral 
times.
Loop met hod Bash / Cloud Shell ):
for i in 1..20; do cur l https://boot camp-cicd-demo-app-b8dmg2e whcc ac
pe9.centralus-01.azur ewebsit es.net/he alth; sleep 1; done
PowerShell Windo ws):
for $i=0; $i -l t 20; $i++) {
    Invoke-WebRequest ht tps://boot camp-cicd-demo-app-b8dmg2e whcc a
cpe9 .centralus-01.azur ewebsit es.net/he alth
    Start-Sleep Seconds 1
}
CMD Windo ws):
for /L %i in 1, 1,20 do cur l https://boot camp-cicd-demo-app-b8dmg2e wh
ccacpe9 .centralus-01.azur ewebsit es.net/he alth & timeout /t 1 >nul
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
29
💡👉 Replace with y our actual app URL (y ou alr eady ha ve it).
4 .  W a t c h  L i v e  M e t r i c s  U p d a t e
Within 12 seconds, Incoming R equest s will st art sho wing activit y.
Youʼll see:
Request rat e incr ease
Response times (usuall y very low for / h e a l t h)
Success rat e at 100%
5 .  S i m u l a t e  a  F a i l u r e
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
30
To sho w the v alue of monit oring, simulat e do wntime:
 In the Azur e Portal, st op y our App Ser vice.
 Run the same loop again.
 In Liv e Metr ics:
Request s still appe ar.
Failur es spik e HTTP 503.
Success rat e drops.
This demonstrat es ho w monit oring inst antly reveals issues.
6 .  ( O p t i o n a l )  E x p l o r e  L o g s
In Applic ation Insight s → Logs , run a simple quer y:
request s
| wher e timest amp > ago(5m)
| summar ize count() b y resul tCode
This sho ws ho w man y request s succeeded vs f ailed in the last 5 minut es.
O b j e c t i v e  9 :  T r o u b l e s h o o t i n g
T r o u b l e s h o o t i n g  F r a m e w o r k
Use this st epwise flo w whene ver something br eaks.
 Reproduce t he issue   Can y ou tr igger it consist ently?
 Check t he b asics   Is the app running? Is the URL cor rect?
 Read the er ror carefull y  Er ror messages of ten point t o the fix.
 Check logs & metr ics  Logs = what happened; Metr ics = ho w of ten.
 Isolat e the pr oblem   Code issue, config issue, or plat form issue?
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
31
 Appl y a f ix & r etest  Small, incr ement al changes.
 Document t he resolution   T urn it int o a r epeatable lesson.
🛠  C o m m o n  I s s u e s  &  F i x e s
🚫 App w onʼt load in br owser
Sympt oms:  Browser sho ws Ser vice Una v ailable  or App not f ound .
Checks & Fix es:
App Ser vice st opped  St art it fr om the por tal.
Wrong runtime  Updat e App Ser vice runtime Node, .NET , etc.).
Missing st artup file  Add w e b . c o n f i g Windo ws) or S T A R T U P _ C O M M A N D Linux).
✅ Validation Checkpoint:  After fix, r eload / h e a l t h and confir m 2 0 0  O K.
⚠ Pipeline f ails
Sympt oms:  Azur e De vOps build/r elease f ails.
Checks & Fix es:
Permission denied  First run r equir es clicking Permit.
Missing ser vice connection  R e‑create Azur e Ser vice Connection.
Build st ep fails  Check Y AML f or missing files ( p a c k a g e . j s o n, w e b . c o n f i g).
✅ Validation Checkpoint:  Pipeline complet es successfull y and deplo ys 
artifacts.
🛑 App deplo yed but not st arting
Sympt oms:  Deplo yment succeeds, but app w onʼt respond.
Checks & Fix es:
Tail logs:
az w ebapp log t ail --name <appname> --r esour ce-gr oup <r g>
Only infra logs?  Missing w e b . c o n f i g.
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
32
Runtime er rors?  Fix code/p ackage issues and r edeplo y.
✅ Validation Checkpoint:  Logs sho w app st artup ( e.g., S e r v e r  l i s t e n i n g  o n  p o r t  
8 0 8 0).
📉 Live Metr ics sho ws no dat a
Sympt oms:  Live Metr ics Str eam sho ws demo char ts onl y.
Checks & Fix es:
Confir m Applic ation Insight s is enabled.
Generat e traf fic ( / h e a l t h endpoint).
Restart App Ser vice if still empt y.
Check A P P L I C A T I O N I N S I G H T S _ C O N N E C T I O N _ S T R I N G in App Set tings.
✅ Validation Checkpoint:  Live Metr ics sho ws r equest rat e  0 when / h e a l t h is 
hit.
🔄 Git push r eject ed
Sympt oms:
Updat es w ere reject ed bec ause the r emot e cont ains w ork that y ou do not  
have loc ally.
Fix:
git pull --r ebase or igin main
git push or igin main
✅ Validation Checkpoint:  Push succeeds and pipeline tr iggers.
🔄  D e c i s i o n  T r e e  ( A S C I I  F l o w )
App not w orking
│
├──  App w onʼt load in br owser?
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
33
│   ├──  App st opped  St art App Ser vice
│   ├──  Wrong runtime  Updat e runtime
│   └──  Missing st artup file  Add config
│
├──  Pipeline f ailed?
│   ├──  Permission denied  P ermit in De vOps
│   ├──  Missing ser vice connection  R ecreate
│   └──  Build st ep failed  Fix Y AML/files
│
├──  App deplo yed but not st arting?
│   ├──  Logs sho w infra onl y  Add w eb.config
│   └──  Logs sho w runtime er rors  Fix code/p ackages
│
├──  Live Metr ics empt y?
│   ├──  Generat e traf fic → cur l /he alth
│   ├──  Restart App Ser vice
│   └──  Check Insight s connection str ing
│
└──  Git push r eject ed?
    └──  Run git pull --r ebase, then push
🧑‍💻  H a n d s ‑ O n  E x e r c i s e s
 Break & Fix:  Remo ve w e b . c o n f i g, redeplo y, then tr oubleshoot wh y the app w onʼt 
start.
 Pipeline Er ror: Intentionall y misconfigur e YAML, wat ch the pipeline f ail, then  
fix it.
 Monit oring Dr ill: Stop the app, run the / h e a l t h loop, and obser ve failur es in Liv e 
Metr ics.
 Git Conflict:  Create a branch mismat ch, tr igger a push r ejection, and r esol ve 
it.
✅  K e y  T a k e a w a y s
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
34
Troubleshooting is structur ed, not guessw ork.
Logs + metr ics = y our best allies.
Every error is a learning oppor tunit y.
Documenting fix es builds a knowledge b ase for the t eam.
C l e a n u p  ( O p t i o n a l  b u t  R e c o m m e n d e d )
W h y  C l e a n u p  M a t t e r s
Prevents unnecessar y Azur e cost s.
Keeps y our subscr iption tid y.
Reinforces the discipline of end‑t o‑end lif ecycle management .
🔽  C l e a n u p  S t e p s
1. Stop or Delet e App Ser vice
Details
In Azur e Portal  App Ser vice → Stop or Delet e.
✅ Validation Checkpoint:  App URL no longer r esponds.
2. Remo ve Applic ation Insight s
Details
Navigat e to the Applic ation Insight s resour ce → Delet e.
✅ Validation Checkpoint:  No t elemetr y char ges accrue.
3. Delet e Resour ce Gr oup F astest)
Details
If this was a dedic ated demo r esour ce gr oup:
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
35
az gr oup delet e --name <r esour ce-gr oup-name> --y es --no-wait
✅ Validation Checkpoint:  All r esour ces in that RG ar e gone.
4. Clean Azur e De vOps Ar tifacts
Details
Delet e pipeline runs and ar tifacts if not needed.
✅ Validation Checkpoint:  No lef tover d r o p / artifacts consuming st orage.
💡 R e f l e c t i o n :  “What would happen if we forgot 
this step in a real subscription?ˮ
📚  R e f e r e n c e s
Get st arted with Azur e App Ser vice
Build Node.js apps with Azur e Pipelines
Using Azur eʼs F1 F ree Plan
Deplo y Node.js W eb App with Azur e De vOps
Video: Build & Deplo y Node.js Apps with Azur e De vOps
Azur e De vOps CI/CD Pipeline  Aut omating Build and Deplo yment t o Azur e App Ser vice
36

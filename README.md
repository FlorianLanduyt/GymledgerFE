## Gymledger Frontend 

### Samenvatting 

Ik ben gestart met het ontwikkelen van Gymledger doordat ik dagelijk in aanraking kwam met het onhandig doorsturen van excel bestanden waar mijn dagelijkse sport programma's op stonden uitgelegd door mijn trainers. 

Dit werd door hen elke week opnieuw opgesteld in excel, dus vond ik het nodig tijd om dit op een iets gebruiksvriendelijkere manier te laten verlopen. 
Op dit moment kan een gymnast zijn eigen trainingsprogramma opstellen. 
Zo kan de sporter een eigen training teovoegen aan zijn lijst met trainingen, waar hij op zijn beurt de nodige oefeningen aan kan toevoegen.  
Elke oefening kan per training geēvalueerd worden. Dit kan gebeuren door de benodige sets, herhalingen en gewicht aan toe te voegen. 
Na een bepaalde oefening kan er nog een korte notitie en gevoelscore worden geschreven om later grafisch te kunnen weergeven op basis van gafieken.

### Extra technologie

Ik heb gekozen om als extra technologie mijn applicatie online te zetten.  
Back-end - [Azure](https://azure.microsoft.com/en-us/): 

```
https://gymledgerapi20200518180543.azurewebsites.net
```

Front-end - [Vercel](https://www.vercel.com):  
```
https://gymledger.now.sh/
```

### Localhost Configuratie 

Wanneer je de frontend lokaal wil laten draaien:  

#### 1. Clone de repository: 

```
git clone https://github.com/Web-IV/1920-a2-fe-FlorianLanduyt.git
```

#### 2. Install de gebruikte dependencies in het project 

```
npm install
```

#### 3. Kies in [environment.ts](https://github.com/Web-IV/1920-a2-fe-FlorianLanduyt/blob/master/GymLedger/src/environments/environment.ts) de backend naar keuze 

- online backend:  
haal volgende lijn code in environment.ts uit comment.  
```
//apiUrl: 'https://gymledgerapi20200518180543.azurewebsites.net/api
```


en plaats volgende lijn in environment.ts in comment.⋅⋅

```
apiUrl: '/api'
```

- local backend:  
Verander de target in [proxy.conf.json](https://github.com/Web-IV/1920-a2-fe-FlorianLanduyt/blob/master/GymLedger/proxy.conf.json)



#### 4. Registreer zelf of gebruik volgende credentials
```
Email: sport.gymnast@hotmail.com  
Wachtwoord: P@ssword111 
```

### Tests
```
npx cypress open 
```



### Extra 

Link naar back-end: https://github.com/Web-IV/1920-a2-be-FlorianLanduyt.git

Uitbreidingsmogelijkheden:  
- Verwijderen en aanpassen van oefeningen
- Een foto kunnen uploaden van de oefening (Voor het moment een default foto)
- Toevoegen van een trainer
- Als trainer een training kunnen opstellen en delen met zijn/haar sporters
- Een dashboard met gegevens van de voorbije trainingen die kan gedeeld worden met zijn/ haar trainer 


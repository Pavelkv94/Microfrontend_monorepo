## Monorepo-Microfrontend
```
├── packages
│   ├── shared //весь переиспользуемый код(компоненты кнопки и тд.)
│   ├── build-config //webpack конфигурация, как отдельный проект(npm init)
│   
│   
├── services //микрофронты
│   └── admin //микрофронт
│   └── host //хост-приложение(entry поинт)
│   └── shop //микрофронт
│           
├── package.json
```

запускать npm run start из каждого App внутри /services

https://www.youtube.com/watch?v=acAH2_YT6bs
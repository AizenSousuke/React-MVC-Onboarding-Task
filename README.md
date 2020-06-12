# REACT MVC Onboarding Task

A simple project for Talent Onboarding Task at IndustryConnect. 

## Getting Started

Clone to your local folder and run: 
```
cd React-MVC-Onboarding-Task
cd MVPStudioReactTemplate
cd ClientApp
yarn install
yarn start // To run the frontend
cd ..
dotnet publish -c Release // Only if you want to deploy later
dotnet run -c release
```

Go to https://localhost:5001 OR http://localhost:3000 on your browser to see the app. 

### Prerequisites

* node.js 12.x
* yarn
* sql server installed

### Installing

You might need to change the HOSTNAME in appsettings.json
```
"ConnectionStrings": {
    "Database": "Data Source=YOUR_HOST_NAME;Initial Catalog=OnboardingDatabase;Integrated Security=True"
}
```

## Deployment

```
dotnet publish -c release
```
Go to the publish folder that's created in /bin/release/netcore2.1*
```
dotnet MVPStudioReactTemplate.dll // To test
```

Take this whole folder to the deployment site.

## Built With

* React
* Semantic-UI-React
* .NET Core 2.1

## Authors

* Putera Nik

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgements

* IndustryConnect
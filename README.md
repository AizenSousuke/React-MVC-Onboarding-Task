# REACT MVC Onboarding Task

A simple project for Talent Onboarding Task at IndustryConnect. 

## Live Website

[Azure](http://reactmvconboardingtask.azurewebsites.net/)

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

##### For Azure:

Open the project in VS Studio.
Right click the project name and publish it. Follow the instructions in the modal.

Connection string to the database can be set in Azure so that you don't have to put it in the appSettings.json. 

The name should be ProductionDatabase and string should be like: 
```
Server=tcp:{your_database_name}dbserver.database.windows.net,1433;Initial Catalog={your_database_name};Persist Security Info=False;User ID={your_id};Password={your_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
```

Reference to Startup.cs
```
services.AddDbContext<AppDbContext>(options =>
{

    if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
    {
        options.UseSqlServer(Configuration.GetConnectionString("Database"));
    } else
    {
        // Prod database
        options.UseSqlServer(Configuration.GetConnectionString("ProductionDatabase"));
    }

});
```

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
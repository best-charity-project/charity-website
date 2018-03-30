## To install eslint and prettier follow next steps:

1. npm install (for installing new devDependencies)
2. Open your vscode settings(Ctrl + ,)
3. Search for next props in the "search settings" line and give them next values:


    + "editor.formatOnSave": true,
    + "prettier.eslintIntegration": true,
    + "prettier.printWidth": 100,
    + "prettier.singleQuote": true,
    + "prettier.stylelintIntegration": true,
    + "prettier.trailingComma": "es5",
    + "prettier.tabWidth": 4"

After doing this operetions u can just use "Ctrl + "S"" to update ur file with new settings.

## To create a new database:
 1. Go to https://mlab.com/home and sign up a new account and verifie your email
    + Create new MongoDB Deployment
    + Choose cloud provider and plan type then choose region
    + Create a new user for your database (choose users tab)
 2. Download mongoDB Community Server from https://www.mongodb.com
    + Choose  "All Version Binaries" and download the mongoDB Community Server with version which you have on mongoLab (you can see it via clicking on your Dbname)
    + For example ---mongod version: 3.4.13---
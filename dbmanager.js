const backup = require('mongodb-backup');

backup({
    uri: 'mongodb://localhost:27017/RB2', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
    root: 'dbkp',
    collections:['clientes']
});
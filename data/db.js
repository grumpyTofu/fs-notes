var Datastore = require('nedb'), 
notes = new Datastore(
    { filename: './data/notes', autoload: true }
);

export default notes;
const { v4: uuidV4} = require('uuid');
class Band {

    constructor( name = 'no-name',vote,id){
        if (typeof id === 'undefined') {
            this.id = uuidV4();
            this.name= name;
            this.votes=0;
        }else{
            this.id = id;
            this.name= name;
            this.votes=vote;
        }
        
    }
}

module.exports = Band;
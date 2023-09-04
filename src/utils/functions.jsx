function Id() {
    let id = 0;

    this.createNextId = function() {
        id ++;
        return id;
    } 
};


export default Id;
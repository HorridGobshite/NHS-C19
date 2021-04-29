class Venue {
    constructor(name, postcode){
        this.name = name;
        this.postcode = postcode;
    }

    GetName(){
        return this.name;
    }

    GetPostCode(){
        return this.postcode;
    }
}

export default Venue;
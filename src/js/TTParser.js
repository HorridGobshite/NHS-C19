import Venue from "./Venue"

class TTParser {
    constructor(code){
        this.code = code.toString();
        this.venue = null;
    }

    GetPrefix() {
        return 'UKC19TRACING';
    }

    GetMinVersion(){
        return 1;
    }

    CorrectPrefix(){
        return this.code.startsWith(this.GetPrefix());
    }

    ReadQR(){
        if(this.code == null || this.code == ''){
            throw 'No Code Provided';
        }

        var parts = this.code.split(':');

        if(parts.length != 3){
            throw 'Invalid Format';
        }

        if(parts[0] != this.GetPrefix()){
            throw 'Invalid Prefix';
        }

        if(parseInt(parts[1]) < this.GetMinVersion()){
            throw 'Invalid Version Number';
        }

        if(parts[2] != null && parts[2] != ''){
            
            let segments = parts[2].split('.');
            if(segments.length == 3){
                let header = this.Decode(segments[0], 'header');
                let payload = this.Decode(segments[1], 'payload');
    
                if(payload.opn != undefined && payload.pc != undefined){
                    this.venue = new Venue(payload.opn, payload.pc);
                }else{
                    throw 'Venue properties don\'t exist';
                }
            }else{
                throw 'Invalid number of segments';
            }

        }else{
            throw 'Error with encoded data';
        }     
    }

    Decode(data, type){
        try{
            return JSON.parse(atob(data));
        }catch{
            throw 'Error Parsing ' + type;
        }
    }

    GetVenue(){
        return this.venue;
    }

}

export default TTParser;
import $ from 'jQuery'

class CheckInComponent {
    constructor(element, app){
        this.container = element;
        this.app = app;
        console.log("Check In Component");
    }

    Invoke(data){
        this.Render(data);
    }

    Render(data){
        $(this.container).html(`
            <h1>You've checked into <strong>${data.GetName()}</strong></h1>
        `);
    }

    Clear(){
        $(this.container).html("");
    }

    Show(){
        $(this.container).show();
    }

    Hide(){
        $(this.container).hide();
    }
}

export default CheckInComponent;
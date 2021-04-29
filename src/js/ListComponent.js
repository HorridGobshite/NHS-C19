import $ from 'jQuery'

class ListComponent {
    constructor(element, app){
        this.container = element;
        this.app = app;
        this.rendered = false;
        this.isFullScreen = false;
        console.log("List Component");
    }

    Invoke(){
        if(!this.rendered){
            this.Render();
            this.Events();
            this.rendered = true;
        }
    }

    Render(){
        $(this.container).append(`
            <div>
                <h1>NHS Covid App</h1>
                <ul>
                    <li id="listCheckin">CLICK TO CHECKIN</li>
                    <li id="listFullScreen">Enter Full Screen</li>
                </ul>
            </div>
        `);
    }

    Events(){
        $(this.container).find("#listCheckin").on("click", this.LaunchQR.bind(this));
        $(this.container).find("#listFullScreen").on("click", this.FullScreen.bind(this));
    }

    LaunchQR(){
        this.app.Switch(this, 'QRCodeComponent', null);
    }

    FullScreen(evt){
        if(this.isFullScreen){
            document.exitFullscreen();
            $(evt.target).html('Enter Full Screen');
            this.isFullScreen = false;
        }else{
            document.querySelector("#app").requestFullscreen({ navigationUI: "show" });
            $(evt.target).html('Exit Full Screen');
            this.isFullScreen = true;
        }
    }

    Clear(){
        console.log("List doesn't clear");
    }

    Show(){
        $(this.container).show();
    }

    Hide(){
        $(this.container).hide();
    }
}

export default ListComponent;
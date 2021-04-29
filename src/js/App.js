import $ from 'jQuery'
import ListComponent from "./ListComponent"
import QRCodeComponent from "./QRCodeComponent"
import CheckInComponent from "./CheckInComponent"

class App {
    constructor(element){
        this.container = element;
        this.Render();
        this.components = [];
        
        var listContainer = $(this.container).find("#ListComponent");
        listContainer.hide();

        var qrContainer = $(this.container).find("#QRCodeComponent");
        qrContainer.hide();

        var checkinContainer = $(this.container).find("#CheckInComponent");
        checkinContainer.hide();

        this.components.push(new ListComponent(listContainer, this));
        this.components.push(new QRCodeComponent(qrContainer, this));
        this.components.push(new CheckInComponent(checkinContainer, this));
    }

    Render(){
        $(this.container).append(`
            <div class="component-container list-component" id="ListComponent"></div>
            <div class="component-container qr-component" id="QRCodeComponent"></div>
            <div class="component-container checkin-component" id="CheckInComponent"></div>
        `);
    }

    Start(component, data){
        this.components.forEach(element => {
            if(element.constructor.name == component){
                element.Show();
                if(data !== undefined || data !== null){
                    element.Invoke(data);
                }else{
                    element.Invoke();
                }
            }
        });
    }

    Switch(current, next, data){
        this.components.forEach(element => {
            if(element.constructor.name == next){
                current.Clear();
                current.Hide();
                element.Show();
                if(data !== undefined || data !== null){
                    element.Invoke(data);
                }else{
                    element.Invoke();
                }

            }
        });
    }
}

export default App;
import $ from 'jQuery'
import jsQR from "jsqr";
import TTParser from "./TTParser"

class QRCodeComponent {
    constructor(element, app){
        this.container = element;
        this.app = app;
        this.timer;
        this.timeoutLoad = 3000;
        this.timeout = 500;
        this.stream;
        this.capture;
        this.captureContext;
        console.log("QR Code Component");
    }

    StreamConstraints(){
        return {
            video: true
        };
    }

    Invoke(){
        this.Render();
        this.stream = $(this.container).find("#CameraStream");
        this.capture = $(this.container).find("#CameraCapture");
        this.captureContext = this.capture.get(0).getContext('2d');

        navigator.mediaDevices.getUserMedia(this.StreamConstraints())
            .then(this.StreamSetup.bind(this))
            .catch((e) => {
                console.log("Stream failed...");
            });
    }

    StreamSetup(stream){
        this.stream.get(0).srcObject = stream;
        this.Events();
    }

    Events(){
        this.timer = setTimeout(this.checkQR.bind(this), this.timeoutLoad); 
    }

    checkQR(){
        clearTimeout(this.timer);
        var stream = this.stream.get(0);
        var streamWidth = stream.videoWidth;
        var streamHeight = stream.videoHeight; 
        this.captureContext.canvas.height = streamHeight;
        this.captureContext.canvas.width = streamWidth;
        
        this.captureContext.drawImage(stream, 0, 0, streamWidth, streamHeight);
        var imageData = this.captureContext.getImageData(0, 0, streamWidth, streamHeight);

        var code = jsQR(imageData.data, streamWidth, streamHeight);
      
        if(code){
              var parser = new TTParser(code.data);
              if(parser.CorrectPrefix()){
                try{
                  parser.ReadQR();
                  this.LaunchCheckin(parser.GetVenue());
                }
                catch(e){
                  console.log(e);
                  this.timer = setTimeout(this.checkQR.bind(this), this.timeout); 
                }
              }else{
                console.log("incorrect Prefix");
                this.timer = setTimeout(this.checkQR.bind(this), this.timeout); 
              }
        }else{
              console.log("not code found");
              this.timer = setTimeout(this.checkQR.bind(this), this.timeout); 
        }
        
    }

    LaunchCheckin(data){
        this.app.Switch(this, 'CheckInComponent', data);
    }

    Render(){
        $(this.container).html(`
            <video class="QR-Video-Stream" id="CameraStream" style="border: 1px solid black;" autoplay></video>
            <div class="QR-Overlay"></div>
            <canvas class="QR-Capture" id="CameraCapture" width=500 height=500></canvas>
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

export default QRCodeComponent;
require('file-loader?name=[name].[ext]!./index.html');
import App from './js/App'
import './css/App.scss'

const appElement = document.getElementById('app');
var app = new App(appElement);
app.Start('ListComponent', null);
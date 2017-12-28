/**
 * Created by bhavyaagg on 28/12/17.
 */

const {app, BrowserWindow} = require('electron');
const path = require('path')
const url = require('url');

let win;
app.on('ready', () => {
  win = new BrowserWindow({width: 200, height: 200});

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

})
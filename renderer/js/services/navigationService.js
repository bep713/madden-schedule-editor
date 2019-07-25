const fs = require('fs');
const path = require('path');
const { ipcRenderer, remote, webFrame } = require('electron');

const app = remote.app;

const FranchiseFile = require('../franchise/FranchiseFile');

const menuService = require('./menuService.js');
const welcomeService = require('./welcomeService');
const scheduleService = require('./scheduleService');
const tableEditorService = require('./tableEditorService');
const schemaViewerService = require('./schemaViewerService');
const navigationData = require('../../../data/navigation.json');

const PATH_TO_DOCUMENTS = app.getPath('documents');
const MADDEN_SAVE_BASE_FOLDER = `${PATH_TO_DOCUMENTS}\\Madden NFL 19\\settings`;

setupEvents();
setupMenu();
addIpcListeners();

let navigationService = {};
navigationService.currentlyOpenedFile = {
  path: null,
  data: null
};

navigationService.currentlyOpenService = null;

navigationService.generateNavigation = function (element, activeItem) {
  navigationData.items.forEach((item) => {
    const button = document.createElement('div');
    button.innerHTML = item.text;
    button.classList.add('nav-item', 'action-button');

    if (item === activeItem) {
      button.classList.add('active');
    } else {
      button.addEventListener('click', navigationService[item.clickListener]);
    }

    element.appendChild(button);
  });
};

navigationService.onHomeClicked = function () {
  navigationService.runCloseFunction();
  navigationService.loadPage('welcome.html');
  navigationService.currentlyOpenService = welcomeService;
  welcomeService.start(navigationService.currentlyOpenedFile.path);
};

navigationService.onScheduleEditorClicked = function () {
  navigationService.runCloseFunction();
  navigationService.loadPage('schedule.html');
  appendNavigation('schedule-editor');

  navigationService.currentlyOpenService = scheduleService;
  scheduleService.loadSchedule(navigationService.currentlyOpenedFile.data);
};

navigationService.onTableEditorClicked = function () {
  navigationService.runCloseFunction();
  navigationService.loadPage('table-editor.html');
  appendNavigation('table-editor');

  navigationService.currentlyOpenService = tableEditorService;
  tableEditorService.start(navigationService.currentlyOpenedFile.data);
};

navigationService.onSchemaViewerClicked = function () {
  navigationService.runCloseFunction();
  navigationService.loadPage('schema-viewer.html');
  appendNavigation('schema-viewer');

  navigationService.currentlyOpenService = schemaViewerService;
  schemaViewerService.start(navigationService.currentlyOpenedFile.data);
};

navigationService.loadPage = function (pagePath) {
  const page = fs.readFileSync(path.join(__dirname, '..\\..\\', pagePath));
  const content = document.querySelector('#content');
  content.innerHTML = page;
};

navigationService.runCloseFunction = function () {

  if (navigationService.currentlyOpenService && navigationService.currentlyOpenService.onClose) {
    navigationService.currentlyOpenService.onClose();
  }
};

function getMemory() {
  // `format` omitted  (pads + limits to 15 characters for the output)
  function logMemDetails(x) {
    function toMb(bytes) {
      return (bytes / (1000.0 * 1000)).toFixed(2)
    }

    console.log(
      format(x[0]),
      format(x[1].count),
      format(toMb(x[1].size) + "MB"),
      format(toMb(x[1].liveSize) +"MB")
    )
  }

  console.log(
    format("object"),
    format("count"),
    format("size"),
    format("liveSize")
  )
  Object.entries(webFrame.getResourceUsage()).map(logMemDetails)
  console.log('------')
}

function format(x) {
  if (x.length === 15) {
    return x;
  }
  else if (x.length < 15) {
    return x.padStart(15);
  }
  else if (x.length > 15) {
    return x.substring(0,15);
  }
  else {
    return x;
  }
}

// setInterval(getMemory, 5000)

function logBytes(x) {
  console.log(x[0], x[1] / (1000.0*1000), "MB")
}

function getMemory() {
  Object.entries(process.memoryUsage()).map(logBytes)
  console.log('\n')
}

setInterval(getMemory, 5000)

function clearCache() {
  remote.getCurrentWindow().webContents.session.clearCache(function(){
    console.log("Cache Cleared")
  })
}
setInterval(clearCache, 10000)

// DEV_openFile();

module.exports = navigationService;

function DEV_openFile() {
  welcomeService.eventEmitter.emit('open-file', MADDEN_SAVE_BASE_FOLDER + '\\CAREER-2019');

  setTimeout(() => {
    navigationService.onTableEditorClicked();
  }, 10);
};

function addIpcListeners() {
  ipcRenderer.on('close-file', function () {
    navigationService.currentlyOpenedFile.path = null;
    navigationService.currentlyOpenedFile.data = null;
    navigationService.onHomeClicked();

    ipcRenderer.send('close-file');
  });
};

function setupEvents() {
  welcomeService.eventEmitter.on('open-file', function (file) {
    navigationService.currentlyOpenedFile.path = file;
    navigationService.currentlyOpenedFile.data = new FranchiseFile(file);
    ipcRenderer.send('load-file', file);
    backupFile(navigationService.currentlyOpenedFile.path);

    navigationService.currentlyOpenedFile.data.on('saving', function () {
      ipcRenderer.send('saving');
    });
  
    navigationService.currentlyOpenedFile.data.on('saved', function (game) {
      ipcRenderer.send('saved');
    });

    navigationService.currentlyOpenedFile.data.on('tables-done', function () {
      // const file = navigationService.currentlyOpenedFile.data;
      // tableEditorService.onFileReady(file);
      // schemaViewerService.onFileReady(file);
    });
  });

  welcomeService.eventEmitter.on('open-schedule', function () {
    navigationService.onScheduleEditorClicked();
  });
  
  welcomeService.eventEmitter.on('open-table-editor', function () {
    navigationService.onTableEditorClicked();
  });

  welcomeService.eventEmitter.on('open-schema-viewer', function () {
    navigationService.onSchemaViewerClicked();
  });
};

function setupMenu() {
  menuService.initializeMenu();  
};

function appendNavigation(activeItemId) {
  const navigation = document.querySelector('.navigation');
  const activeItem = navigationData.items.find((item) => { return item.id === activeItemId; });
  navigationService.generateNavigation(navigation, activeItem);
};

function backupFile(franchiseFile) {
  if (!fs.existsSync('temp/backup')) {
    if (!fs.existsSync('temp')) {
      fs.mkdirSync('temp');
    }
    
    fs.mkdirSync('temp/backup');
  }

  fs.writeFile('temp/backup/backup.bak', franchiseFile.rawContents, function (err) {
    if (err) {
      throw err;
    }
  });
};
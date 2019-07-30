const fs = require('fs');
const path = require('path');
const { ipcRenderer, remote, webFrame } = require('electron');

const app = remote.app;

const FranchiseFile = require('madden-franchise');

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
  data: null,
  gameYear: null
};

navigationService.currentlyOpenService = null;

navigationService.generateNavigation = function (activeItem) {
  const element = document.querySelector('.navigation');
  const rightActionButtons = document.querySelector('.right-action-buttons');

  const applicableNavigationData = navigationData.items.filter((navigation) => {
    return navigation.availableVersions.includes(navigationService.currentlyOpenedFile.data._gameYear);
  });

  applicableNavigationData.forEach((item) => {
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

  if (navigationService.currentlyOpenedFile) {
    const gameIcon = document.createElement('div');
    gameIcon.id = `m${navigationService.currentlyOpenedFile.gameYear}-icon`;
    gameIcon.className = 'madden-icon'

    rightActionButtons.appendChild(gameIcon);
  }
};

navigationService.onHomeClicked = function () {
  navigationService.runCloseFunction();
  navigationService.loadPage('welcome.html');
  navigationService.currentlyOpenService = welcomeService;
  welcomeService.start(navigationService.currentlyOpenedFile);
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

// DEV_openFile();

module.exports = navigationService;

function DEV_openFile() {
  // welcomeService.eventEmitter.emit('open-file', MADDEN_SAVE_BASE_FOLDER + '\\CAREER-2019');
  welcomeService.eventEmitter.emit('open-file', 'D:\\Projects\\Madden 20\\CAREER-BEPFRANCHISE');

  setTimeout(() => {
    navigationService.onTableEditorClicked();
  }, 0);
};

function addIpcListeners() {
  ipcRenderer.on('close-file', function () {
    navigationService.currentlyOpenedFile.path = null;
    navigationService.currentlyOpenedFile.data = null;
    navigationService.currentlyOpenedFile.gameYear = null;
    navigationService.onHomeClicked();

    ipcRenderer.send('close-file');
  });
};

function setupEvents() {
  welcomeService.eventEmitter.on('open-file', function (file) {
    navigationService.currentlyOpenedFile.path = file;
    navigationService.currentlyOpenedFile.data = new FranchiseFile(file);
    navigationService.currentlyOpenedFile.gameYear = navigationService.currentlyOpenedFile.data._gameYear;

    ipcRenderer.send('file-loaded', {
      'path': navigationService.currentlyOpenedFile.path,
      'gameYear': navigationService.currentlyOpenedFile.gameYear
    });

    backupFile(navigationService.currentlyOpenedFile);

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

  scheduleService.eventEmitter.on('open-table-editor', function (tableId, index) {
    tableEditorService.initialTableToSelect = {
      tableId: tableId,
      recordIndex: index
    };

    navigationService.runCloseFunction();
    navigationService.onTableEditorClicked();
  });
};

function setupMenu() {
  menuService.initializeMenu();  
};

function appendNavigation(activeItemId) {
  const activeItem = navigationData.items.find((item) => { return item.id === activeItemId; });
  navigationService.generateNavigation(activeItem);
};

function backupFile(franchiseFile) {
  if (!fs.existsSync('temp/backup')) {
    if (!fs.existsSync('temp')) {
      fs.mkdirSync('temp');
    }
    
    fs.mkdirSync('temp/backup');
  }

  fs.writeFile('temp/backup/backup.bak', franchiseFile.data.rawContents, function (err) {
    if (err) {
      throw err;
    }
  });
};
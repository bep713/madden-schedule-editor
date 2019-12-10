const os = require('os');
const path = require('path');
const { app } = require('electron');
const ElectronPreferences = require('electron-preferences');

let preferencesService = {
  preferences: null
};

preferencesService.initialize = function () {
  preferencesService.preferences = new ElectronPreferences({
    'dataStore': path.resolve(app.getPath('userData'), 'preferences.json'),
    'defaults': {
        'general': {
            'defaultDirectory': path.resolve(app.getPath('documents'), 'Madden NFL 20\\settings'),
            'defaultEditor': 'open-home',
            'autoSave': [
                true
            ]
        },
        'gameVersions': {
            'madden19': 'C:\\Program Files (x86)\\Origin Games\\Madden NFL 19',
            'madden20': 'C:\\Program Files (x86)\\Origin Games\\Madden NFL 20'
        }
    },
    'sections': [
        {
            'id': 'general',
            'label': 'General',
            'icon': 'settings-gear-63',
            'form': {
                'groups': [
                    {
                        'fields': [
                            {
                                'label': 'Default directory',
                                'key': 'defaultDirectory',
                                'type': 'directory',
                                'help': 'The directory to open when you choose to open a file.'
                            },
                            {
                                'label': 'Automatically check for updates',
                                'key': 'checkForUpdates',
                                'type': 'checkbox',
                                'options': [
                                    { 'label': 'Check for updates on app start', 'value': true }
                                ],
                                'help': 'If checked, the app will check to see if a new release has been made each time you start the app. You can manually check by clicking About -> Check for update at the top menu.'
                            },
                            {
                                'label': 'Auto-Save',
                                'key': 'autoSave',
                                'type': 'checkbox',
                                'options': [
                                    { 'label': 'Auto-Save', 'value': true }
                                ],
                                'help': 'If checked, the app will save after any change is made.'
                            },
                            {
                                'label': 'Auto-Open',
                                'key': 'defaultEditor',
                                'type': 'dropdown',
                                'options': [
                                    { 'label': 'Home screen', 'value': 'open-home' },
                                    { 'label': 'Schedule editor', 'value': 'open-schedule' },
                                    { 'label': 'Table editor', 'value': 'open-table-editor' },
                                    { 'label': 'Schema viewer', 'value': 'open-schema-viewer' },
                                    { 'label': 'Ability editor', 'value': 'open-ability-editor' }
                                ],
                                'help': 'Choose the editor to open when you open a new file.'
                            }
                        ]
                    }
                ]
            }
        },
        {
            'id': 'gameVersions',
            'label': 'Game Directories',
            'icon': 'folder-15',
            'form': {
                'groups': [
                    {
                        'fields': [
                            {
                                'label': 'Madden 19 game directory',
                                'key': 'madden19',
                                'type': 'directory'
                            },
                            {
                                'label': 'Madden 20 game directory',
                                'key': 'madden20',
                                'type': 'directory'
                            }
                        ]
                    }
                ]
            }
        }
    ]
  });
};

module.exports = preferencesService;
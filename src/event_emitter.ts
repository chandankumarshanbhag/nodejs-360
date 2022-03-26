import {EventEmitter} from 'events';

// create a new event emitter
const eventEmitter = new EventEmitter();

// Somewhere in the code we want to listen for an event
eventEmitter.on('dbBackupCompleted',(timestamp: Date) => {
    console.log('Backup completed at ' + timestamp.toString());
});


function backup(){
    // After backup is completed emit the event
    eventEmitter.emit('dbBackupCompleted',new Date());
}

backup();
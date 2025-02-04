const fsPromise = require('node:fs/promises');
const { log } = require('node:console');

class ExecuteStream{
    constructor(sourceFilePath,sourceOperation,destinationFilePath,destinationOperation){
        this.sourceFilePath       = sourceFilePath;
        this.sourceOperation      = sourceOperation;
        this.destinationFilePath  = destinationFilePath;
        this.destinationOperation = destinationOperation;
    }
    async streamProcess(){
        let fileHandleRead;
        let fileHandleWrite;
        try{
            let lastChunk = null;
            fileHandleRead  = await fsPromise.open(this.sourceFilePath, this.sourceOperation);
            fileHandleWrite = await fsPromise.open(this.destinationFilePath, this.destinationOperation); 
            const streamRead =  fileHandleRead.createReadStream({highWaterMark:8});
            const streamWrite = fileHandleWrite.createWriteStream({writableLength:8});
            streamRead.on('data',(chunk)=>{
                log(chunk)
                if(lastChunk != null)lastChunk = chunk
                // log(streamWrite.writableLength);
                if(streamWrite.write(chunk) === false)streamRead.pause();
            });
            streamRead.on('end',async()=>{
                log('Read Stream ended');
                streamWrite.end(lastChunk);
                await fileHandleRead.close();
                await fileHandleWrite.close();
                log('operation closed')
            })
            streamWrite.on('drain',()=>streamRead.resume());
            streamWrite.on('finish',()=>log('Writable Stream Done!'));
            streamWrite.on('error', (err) => {console.error(`Write stream error: ${err.message}`);});
            streamWrite.on('close', () => {console.log('Write stream closed.');});
        }
        catch(err){
            log(err.message)
        }
    }
}

const sourcePath = './source/source.mp4';
const sourceOperation = 'r';
const destinationPath = './destination/dest.mp4';
const destinationOperation = 'w'


const executeStream1 = new ExecuteStream(sourcePath,sourceOperation,destinationPath,destinationOperation);
executeStream1.streamProcess();
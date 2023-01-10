import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RecordingData, VoiceRecorder, VoiceRecorderPlugin } from 'capacitor-voice-recorder';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { async } from '@firebase/util';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  recording=false;
  storedFiles = [];
  constructor() {}
  
  ngOnInit(){
    this.loadFiles
    VoiceRecorder.requestAudioRecordingPermission();
  }

  public async loadFiles(){
    Filesystem.readdir({
      path:'',
      directory:Directory.Data
    }).then(result =>{
      this.storedFiles=result.files;
    });
  }

  public async grabar(){
    if(this.recording){
      return;
    }
    this.recording=true;
    VoiceRecorder.startRecording();

  }

  public async stop(){
    if(!this.recording){
      return;
    }
    this.recording=false;
    VoiceRecorder.stopRecording().then(async(result: RecordingData)=>{
      if(result.value && result.value.recordDataBase64){
        const recordData= result.value.recordDataBase64;
        console.log(recordData);
        const fileName=new Date().getTime + '.wav';
        await Filesystem.writeFile({
          path:fileName,
          directory:Directory.Data,
          data:recordData
        });
        this.loadFiles();
      }
    })
   
  }

}

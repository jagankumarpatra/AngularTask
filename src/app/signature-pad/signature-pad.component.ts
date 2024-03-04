import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.css']
})
export class SignaturePadComponent implements OnInit {
  signatureNeeded!: boolean;
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: string;
  undoStack: any[] = [];
  redoStack: any[] = [];
  // for date
  selectedDate:string= '';
  savedDates:string[]=[];
  UndoStack:string[]=[];
  RedoStack:string[]=[];
  // for text
  texti:string='';
  savedtext:string[]=[];
  undotext:string[]=[];
  redotext:string[]=[];
  //for textarea
  textArea:string='';
  savedtextarea:string[]=[];
  undotextarea:string[]=[];
  redotextarea:string[]=[];

  
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event: Event) {
    // works in device not in browser
  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearPad() {
    this.undoStack.push(this.signaturePad.toData());
    this.signaturePad.clear();
  }

  undo() {
    if (this.undoStack.length > 0) {
      const data = this.undoStack.pop();
      this.redoStack.push(this.signaturePad.toData());
      this.signaturePad.clear();
      this.signaturePad.fromData(data);
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      const data = this.redoStack.pop();
      this.undoStack.push(this.signaturePad.toData());
      this.signaturePad.clear();
      this.signaturePad.fromData(data);
    }
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.signatureNeeded = this.signaturePad.isEmpty();
    if (!this.signatureNeeded) {
      this.signatureNeeded = false;
    }
  }
  // FOR DATES
  saveDate() {
    this.savedDates.push(this.selectedDate);
    
  }
  Undo(){
    if (this.savedDates.length > 0) {
      const lastDate = this.savedDates.pop();
      this.undoStack.push(lastDate);
    }
  }
  Redo(){
    if (this.undoStack.length > 0) {
      const redoDate = this.undoStack.pop();
      this.savedDates.push(redoDate);
      // this.selectedDate = redoDate;
    }
  }
  // FOR TEXT
  saveText(){
    this.savedtext.push(this.texti);
    this.texti=' ';
  }
  UndoText(){
    if(this.savedtext.length>0){
      const undotet=this.savedtext.pop();
      if(undotet)
      this.undotext.push(undotet);
    }
  }
  RedoText(){
      if(this.undotext.length>0){
        const redotet=this.undotext.pop();
        if(redotet){
        this.savedtext.push(redotet);
        
        }
      }
  }
  // FOR TEXTAREA
  saveTextArea(){
    this.savedtextarea.push(this.textArea);
    this.textArea=' ';
  }
  UndoTextArea(){
    if(this.savedtextarea.length>0){
      const undotet=this.savedtextarea.pop();
      if(undotet)
      this.undotextarea.push(undotet);
    }
  }
  RedoTextArea(){
      if(this.undotextarea.length>0){
        const redotet=this.undotextarea.pop();
        if(redotet){
        this.savedtextarea.push(redotet);

        }
      }
  }
  
}

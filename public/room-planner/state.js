export class History {
  constructor(value, limit=60) { this.values=[structuredClone(value)]; this.index=0; this.limit=limit; }
  get canUndo() { return this.index>0; }
  get canRedo() { return this.index<this.values.length-1; }
  push(value) {
    if (JSON.stringify(this.values[this.index])===JSON.stringify(value)) return;
    this.values.splice(this.index+1); this.values.push(structuredClone(value));
    if(this.values.length>this.limit) this.values.shift();
    this.index=this.values.length-1;
  }
  undo() { if(this.canUndo) this.index--; return structuredClone(this.values[this.index]); }
  redo() { if(this.canRedo) this.index++; return structuredClone(this.values[this.index]); }
}
export const escapeXml = value => String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));

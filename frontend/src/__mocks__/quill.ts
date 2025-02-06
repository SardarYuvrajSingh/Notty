class MockQuill {
    root = { innerHTML: '' };
    private callback?: () => void;
  
    constructor(container: HTMLElement, options: Record<string, unknown>) {
      // Assuming Quill's instance attaches to the container here
      (container as any).__quill__ = this;
    }
  
    on(event: string, callback: () => void) {
      if (event === 'text-change') {
        this.callback = callback;
      }
    }
  
    emit(event: string) {
      if (event === 'text-change' && this.callback) {
        this.callback();
      }
    }
  
    setHTML(html: string) {
      this.root.innerHTML = html;
      if (this.callback) {
        this.callback();
      }
    }
  }
  
  export default MockQuill;
  
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare global {
  interface Element {
    __quill__?: any;  // or `MockQuill` if you want more specific typing
  }
}

export {}; // This ensures the file is treated as a module

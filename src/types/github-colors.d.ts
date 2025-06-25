declare module 'github-colors' {
  interface ColorInfo {
    color: string;
    url: string;
  }
  
  function get(language: string): ColorInfo | undefined;
  
  export = {
    get
  };
} 
// FIX: Augmented the global NodeJS.ProcessEnv interface to include API_KEY.
// This avoids redeclaring the 'process' variable, which was causing a type
// conflict with the global Node.js process type, and resolves the compilation errors.
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
  }
}

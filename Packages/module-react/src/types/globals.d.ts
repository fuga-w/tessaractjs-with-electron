export interface IElectron {
  recognizeText: (data: string) => Promise<string>;
}
declare global {
  interface Window {
    electron: IElectron;
  }
}

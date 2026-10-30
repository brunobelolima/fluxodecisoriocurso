import {networkNumber} from './platform-compatibility';
export function classifyLocalConnection(download:string,upload:string){
 const down=networkNumber(download),up=networkNumber(upload);if(down===null||up===null)return null;
 const ratio=Math.min(down/4,up/2.5);const index=ratio>=2?3:ratio>=1?2:ratio>=0.5?1:0;
 return {index,label:['Muito abaixo da referência','Abaixo da referência','Atende à referência','Atende com margem'][index]};
}

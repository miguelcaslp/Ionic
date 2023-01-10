import { IonImg } from '@ionic/angular';
export interface Note{
    id?:string,
    title:string,
    description:string,
    hided?:boolean,
    //Atributo para guardar imagen
    photo?:String
}
import { Region } from "./region";

export class Cliente {
    id: number;
    nombre: string;
    apellido: string;
    nacimiento: string;
    createAt: string;
    email: string;
    foto: string;
    region: Region
}

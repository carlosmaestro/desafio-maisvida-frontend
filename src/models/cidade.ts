import { Estado } from './estado';
export interface Cidade {
    id?: string;
    nome?: string;
    estado?: string | Estado;
}
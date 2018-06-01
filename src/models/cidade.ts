import { Estado } from './estado';
export interface Cidade {
    id?: string;
    name?: string;
    estado?: string | Estado;
}
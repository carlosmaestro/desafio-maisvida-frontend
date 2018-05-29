import { Cidade } from './cidade';
import { Status } from './status';
import { Estado } from './estado';
export interface Medico {
    id?: string;
    primeiro_nome?: string;
    ultimo_nome?: string;
    especialidade?: string;
    ativo?: boolean;
    status?: string | Status;
    estado?: string | Estado;
    cidade?: string | Cidade;
}
import { Especialidade } from './especialidade';
import { Cidade } from './cidade';
import { Status } from './status';
import { Estado } from './estado';
export interface Medico {
    id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    ativo?: boolean;
    especialidade?: string | Especialidade;
    status?: string | Status;
    cidade?: Cidade | string ;
}
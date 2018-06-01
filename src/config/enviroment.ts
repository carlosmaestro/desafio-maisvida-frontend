//CONSTANTES GLOBAIS

export const APP_VERSION = "0.0.1";


// DEV
// export const API_URL = "http://";
// export const WEB_ADMIN_STATIC_URL = "http://";

// PROD
//url de produção da api
export const API_URL = "http://192.168.0.12:8080";

//storage path para a sessão
export const SESSION_DATA_STORAGE_PATH = "session_data";

//storage path para remember-me
export const REMEMBERME_STORAGE_PATH = "remember_me";

//storage path para credencias do usuário
export const USER_CRENDENTIASL_STORAGE_PATH = "user_credentials";

//storage path para a lingua do usuário
export const LANG_STORAGE_PATH = "default_lang";

//rotas da api
export const PATHS = {
    login: "login",
    medico: "medicos",
    cidade: "cidades",
    estado: "estados",
    especialidade: "especialidades",
    status: "status"
};


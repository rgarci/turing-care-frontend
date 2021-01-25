export interface Registros {
    "idRegistro": number,
    "asunto": string,
    "descripcion": string,
    "fechaCita": string,
    "fechaCreado": string,
    "fechaActualizado": string,
    "paciente": {
      "pacienteId": number,
      "nombre": string,
      "email": string
    },
    "medico": {
      "medicoId": number,
      "nombre": string,
      "email": string
    },
    "sintomas": string,
    "medicamentoRecetado": string,
    "observaciones": string,
    "tipoTratamiento":string,
    "seguimientoTratamiento": string
}

/**
 * Interfaz para el recibo de clinicas
 */
export interface Clinic {
  clinica_id: number;
  nombre: string;
  calle: string;
  numero: string;
  codigo_postal:string;
  cruzamiento:string;
  colonia:string;
  municipio:string;
  estado:string;
  pais:string;
}

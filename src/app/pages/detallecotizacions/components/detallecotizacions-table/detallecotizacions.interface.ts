export interface DetallecotizacionsInterface {
   iddetallecotizacion?: number;
   idcotizacion?: number;
   idcategoria?: number;
   idsubcategoria?: number;
   idmaterial?: number;
   cantidad?: string;
   porcimpuestos?: string;
   porcdescuento?: string;
   porcimpuestosesp?: string;
   importeimpuestos?: string;
   importeimpuestosesp?: string;
   observaciones?: string;
   baja?: boolean;
   created_by?: number;
   created_at?: string;
   modified_at?: string;
}

export interface DetallenotagastosInterface {
   iddetallenotagasto?: number;
   idnotagasto?: number;
   idmaterial?: number;
   noidentificacion?: string;
   descripcion?: string;
   unidad?: string;
   cantidad?: string;
   valorunitario?: string;
   importe?: string;
   importeimpuesto?: string;
   baja?: boolean;
   created_by?: number;
   created_at?: string;
   modified_at?: string;
}

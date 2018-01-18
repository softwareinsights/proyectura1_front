export interface CostosInterface {
   idcosto?: number;
   idmaterial?: number;
   idunidadmedida?: number;
   idcategoria?: number;
   idsubcategoria?: number;
   idobra?: number;
   cantidad?: string;
   preciounitario?: string;
   importeimpuestos?: string;
   importeimpuestosesp?: string;
   subtotal?: string;
   importetotal?: string;
   observaciones?: string;
   baja?: boolean;
   created_by?: number;
   created_at?: string;
   modified_at?: string;
}

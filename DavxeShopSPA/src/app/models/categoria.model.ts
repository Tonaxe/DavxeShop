export interface Categoria {
    categoriaId: number;
    nombre: string;
}

export interface CategoriaResponse {
  categorias: Categoria[];
}

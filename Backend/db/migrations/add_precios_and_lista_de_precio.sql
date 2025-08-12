ALTER TABLE usuarios ADD COLUMN lista_de_precio INTEGER;

CREATE TABLE precios (
  id SERIAL PRIMARY KEY,
  lista_de_precio_id INTEGER UNIQUE NOT NULL,
  porcentaje_a_agregar NUMERIC NOT NULL
);

ALTER TABLE usuarios
  ADD CONSTRAINT fk_lista_precio
  FOREIGN KEY (lista_de_precio)
  REFERENCES precios(lista_de_precio_id);

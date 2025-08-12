ALTER TABLE familias
    RENAME COLUMN familia TO gran_familia,
    RENAME COLUMN tipo TO tipo_familia;

ALTER TABLE productos
    DROP COLUMN IF EXISTS colores_pdf,
    DROP COLUMN IF EXISTS pdf_colores,
    ADD COLUMN codigo_color VARCHAR(20);

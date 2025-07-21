import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
    if (!products.length) return <p>No hay productos.</p>;

    return (
        <div className="grid gap-4">
            {products.map(p => (
                <div key={p.id} className="border p-4 rounded shadow">
                    <h2 className="text-xl font-bold">{p.nombre}</h2>
                    <p>Marca: {p.marca}</p>
                    <p>Modelo: {p.modelo}</p>
                    <p>Stock: {p.stock}</p>
                    <p>Etiquetas: {p.etiquetas}</p>
                    <p>Precio: ${p.precio}</p>
                    <div className="flex gap-2 mt-2">
                        <button onClick={() => onEdit(p)} className="bg-yellow-400 px-3 py-1 rounded">Editar</button>
                        <button onClick={() => onDelete(p.id)} className="bg-red-500 text-white px-3 py-1 rounded">Eliminar</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;

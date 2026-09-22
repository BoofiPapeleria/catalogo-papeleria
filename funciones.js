document.addEventListener("DOMContentLoaded", () => {
    let carrito = [];
    let productoSeleccionadoActual = null;

    // Elementos DOM
    const galeria = document.getElementById("galeriaProductos");
    const inputBuscar = document.getElementById("inputBuscar");
    const selectCategoria = document.getElementById("selectCategoria");
    
    const modalDetalle = document.getElementById("modalDetalle");
    const modalCarrito = document.getElementById("modalCarrito");
    
    const contadorCarrito = document.getElementById("contadorCarrito");
    const itemsCarritoContenedor = document.getElementById("itemsCarrito");
    const totalCarritoPrecio = document.getElementById("totalCarritoPrecio");

    // Renderizar Galería
    function mostrarProductos(productosFiltrados) {
        galeria.innerHTML = "";
        if (productosFiltrados.length === 0) {
            galeria.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">🌸 No hay coincidencias 🌸</p>`;
            return;
        }

        productosFiltrados.forEach(prod => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta-producto");
            let badge = !prod.disponible ? `<span class="badge-agotado">Agotado</span>` : '';
            
            tarjeta.innerHTML = `
                ${badge}
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <div class="producto-info">
                    <h3>${prod.nombre}</h3>
                    <span class="precio-tag">$${prod.precio.toLocaleString('es-CL')}</span>
                </div>
            `;
            tarjeta.addEventListener("click", () => abrirDetalle(prod));
            galeria.appendChild(tarjeta);
        });
    }

    // Buscador y Categorías
    function filtrar() {
        const txt = inputBuscar.value.toLowerCase();
        const cat = selectCategoria.value;
        const res = LISTA_PRODUCTOS.filter(p => {
            return (p.nombre.toLowerCase().includes(txt) || p.descripcion.toLowerCase().includes(txt)) &&
                   (cat === "todos" || p.categoria === cat);
        });
        mostrarProductos(res);
    }

    // Modal Detalle Producto
    function abrirDetalle(prod) {
        productoSeleccionadoActual = prod;
        document.getElementById("modalImagen").src = prod.imagen;
        document.getElementById("modalNombre").innerText = prod.nombre;
        document.getElementById("modalPrecio").innerText = `$${prod.precio.toLocaleString('es-CL')}`;
        document.getElementById("modalDescripcion").innerText = prod.descripcion;

        const btnAdd = document.getElementById("btnAgregarAlCarrito");
        if(prod.disponible) {
            btnAdd.style.display = "block";
            btnAdd.innerText = "Añadir al Carrito ✨";
        } else {
            btnAdd.style.display = "none";
        }
        modalDetalle.style.display = "flex";
    }

    // Lógica interna del carrito
    document.getElementById("btnAgregarAlCarrito").addEventListener("click", () => {
        if (!productoSeleccionadoActual) return;
        
        const existe = carrito.find(item => item.id === productoSeleccionadoActual.id);
        if (existe) {
            existe.cantidad += 1;
        } else {
            carrito.push({ ...productoSeleccionadoActual, cantidad: 1 });
        }
        
        actualizarCarritoVisual();
        modalDetalle.style.display = "none";
    });

    function actualizarCarritoVisual() {
        // Contador del botón flotante
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        contadorCarrito.innerText = totalItems;

        // Lista interna del modal
        itemsCarritoContenedor.innerHTML = "";
        let sumaTotal = 0;

        carrito.forEach(item => {
            const costoItem = item.precio * item.cantidad;
            sumaTotal += costoItem;

            const div = document.createElement("div");
            div.classList.add("item-carrito");
            div.innerHTML = `
                <div>
                    <strong>${item.nombre}</strong><br>
                    <small>${item.cantidad}x $${item.precio.toLocaleString('es-CL')}</small>
                </div>
                <div>
                    <span>$${costoItem.toLocaleString('es-CL')}</span>
                    <button class="btn-eliminar" data-id="${item.id}">&times;</button>
                </div>
            `;
            itemsCarritoContenedor.appendChild(div);
        });

        totalCarritoPrecio.innerText = `$${sumaTotal.toLocaleString('es-CL')}`;

        // Asignar eventos de eliminación
        document.querySelectorAll(".btn-eliminar").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = parseInt(e.target.getAttribute("data-id"));
                carrito = carrito.filter(item => item.id !== id);
                actualizarCarritoVisual();
            });
        });
    }

    // Enviar pedido definitivo por WhatsApp
    document.getElementById("btnEnviarPedido").addEventListener("click", () => {
        if (carrito.length === 0) {
            alert("¡Tu carrito está vacío! Añade algunas cositas lindas primero 🌸");
            return;
        }

        let mensaje = `🌸 *¡Hola ${CONFIG_PAPELERIA.nombreTienda}! Quiero realizar el siguiente pedido:* \n\n`;
        let sumaTotal = 0;

        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            sumaTotal += subtotal;
            mensaje += `• ${item.cantidad}x  ${item.nombre} (- $${subtotal.toLocaleString('es-CL')})\n`;
        });

        mensaje += `\n💰 *Total Estimado:* $${sumaTotal.toLocaleString('es-CL')}\n`;
        mensaje += `✨ _¿Están disponibles para coordinar el pago y envío?_`;

        const link = `https://wa.me{CONFIG_PAPELERIA.telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        window.open(link, "_blank");
    });

    // Modales de control de apertura y cierre
    document.getElementById("btnFlotanteCarrito").onclick = () => modalCarrito.style.display = "flex";
    document.getElementById("btnCerrarCarrito").onclick = () => modalCarrito.style.display = "none";
    document.getElementById("btnCerrarModal").onclick = () => modalDetalle.style.display = "none";
    
    window.onclick = (e) => {
        if (e.target == modalDetalle) modalDetalle.style.display = "none";
        if (e.target == modalCarrito) modalCarrito.style.display = "none";
    };

    inputBuscar.addEventListener("input", filtrar);
    selectCategoria.addEventListener("change", filtrar);
    mostrarProductos(LISTA_PRODUCTOS);
});

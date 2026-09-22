// CONFIGURACIÓN GLOBAL
const CONFIG_PAPELERIA = {
    telefonoWhatsApp: "56912345678", // Reemplaza con tu número (con código de país, sin el +)
    nombreTienda: "🌸 Papelería Kawaii 🌸"
};

// LISTA DE PRODUCTOS
const LISTA_PRODUCTOS = [
    {
        id: 1,
        nombre: "Destacadores de Osito (Set de 6)",
        categoria: "destacadores",
        precio: 4500,
        descripcion: "Lindos destacadores en tonos pastel con caritas de ositos. Ideales para apuntes aesthetic.",
        imagen: "https://unsplash.com",
        disponible: true
    },
    {
        id: 2,
        nombre: "Croquera de Gato Neko",
        categoria: "cuadernos",
        precio: 6200,
        descripcion: "Cuaderno de hojas blancas con diseño de gatito de la suerte. Tapa dura y 80 hojas.",
        imagen: "https://unsplash.com",
        disponible: true
    },
    {
        id: 3,
        nombre: "Lápiz de Gel Patito Flotante",
        categoria: "lapices",
        precio: 1500,
        descripcion: "Lápiz de tinta negra gel con un tierno patito que flota en agua con glitter.",
        imagen: "https://unsplash.com",
        disponible: true
    },
    {
        id: 4,
        nombre: "Set de Stickers Washi Tape",
        categoria: "stickers",
        precio: 2800,
        descripcion: "Caja con 4 rollos de washi tape y 10 láminas de stickers transparentes.",
        imagen: "https://unsplash.com",
        disponible: false // Se muestra como "Agotado" y no deja añadir al carrito
    }
];

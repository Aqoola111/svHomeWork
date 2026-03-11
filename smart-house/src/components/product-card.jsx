export const ProductCard = ({product, toggleItem, room}) => {
    return (
        <button
            onClick={() => toggleItem(product.id, room.name)}
            className={`product-button ${product.on ? 'status-on' : 'status-off'}`}
        >
            {product.name}
        </button>
    )
}
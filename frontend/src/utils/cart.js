const CART_KEY = 'cart_items';

export function getCartItems() {
    try {
        const stored = localStorage.getItem(CART_KEY);
        if (!stored) return [];

        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
}

export function saveCartItems(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addCartItem(product, quantity = 1) {
    const items = getCartItems();
    const productId = Number(product.id);
    const stock = Number(product.stock || 0);

    const existingIndex = items.findIndex((item) => Number(item.id) === productId);

    if (existingIndex >= 0) {
        const nextQuantity = items[existingIndex].quantity + quantity;
        items[existingIndex].quantity = Math.max(1, Math.min(nextQuantity, stock || nextQuantity));
    } else {
        items.push({
            id: productId,
            title: product.title,
            price: Number(product.price || 0),
            image: product.image,
            stock,
            quantity: Math.max(1, quantity),
        });
    }

    saveCartItems(items);
    return items;
}

export function updateCartItemQuantity(productId, quantity) {
    const items = getCartItems();
    const nextItems = items.map((item) => {
        if (Number(item.id) !== Number(productId)) return item;

        const stock = Number(item.stock || 0);
        const safeQuantity = Math.max(1, Math.min(Number(quantity), stock || Number(quantity)));
        return { ...item, quantity: safeQuantity };
    });

    saveCartItems(nextItems);
    return nextItems;
}

export function removeCartItem(productId) {
    const items = getCartItems().filter((item) => Number(item.id) !== Number(productId));
    saveCartItems(items);
    return items;
}

export function clearCart() {
    saveCartItems([]);
}

export function getCartCount() {
    return getCartItems().reduce((total, item) => total + Number(item.quantity || 0), 0);
}

export function getCartTotal() {
    return getCartItems().reduce((total, item) => {
        return total + (Number(item.price || 0) * Number(item.quantity || 0));
    }, 0);
}

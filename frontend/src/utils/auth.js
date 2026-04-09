function parseToken(token) {
    if (!token) return null;

    try {
        const payload = token.split('.')[1];
        if (!payload) return null;

        const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(atob(normalized));
        return decoded || null;
    } catch (error) {
        return null;
    }
}

export function getUserIdFromToken(token) {
    const decoded = parseToken(token);
    return decoded?.id || null;
}

export function getUserRoleFromToken(token) {
    const decoded = parseToken(token);
    return decoded?.role || null;
}

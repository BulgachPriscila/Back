export const authMiddleware = (req, res, next) => {
    const { stock } = req.body;
    if (stock < 1) {
        return res.status(401).json({ message: "Para agregar producto necesita stock mayor a 0" });
    }
    next();
};
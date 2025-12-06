export const notFound = (req, res) => {
  res.status(404).json({ 
    message: "Ruta no encontrada",
    path: req.originalUrl
  });
};

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";
  
  res.status(statusCode).json({
    error: true,
    message: message
  });
};

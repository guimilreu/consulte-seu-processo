export const notFoundHandler = (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
};

export const errorHandler = (err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Erro interno do servidor'
      : err.message || 'Erro interno do servidor',
  });
};

function asyncHandler(funcao) {
  return function tratarRota(req, res, next) {
    Promise.resolve(funcao(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;

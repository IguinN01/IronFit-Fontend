export const inicializarMercadoPago = () => {
  return new window.MercadoPago("TEST-118c78db-f963-423b-bafe-bbf415ea5ba6", {
    locale: "pt-BR"
  });
};
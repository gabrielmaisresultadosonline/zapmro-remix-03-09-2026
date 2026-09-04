/**
 * Links do Business Manager da Meta por cadastro/número.
 *
 * IMPORTANTE: nunca usar IDs fixos como fallback. Cada usuário (e cada número
 * de WhatsApp conectado) tem o seu `business_id` e o seu `waba_id`. Usar IDs de
 * outra conta abre o Billing Hub de um portfólio ao qual o usuário não tem
 * acesso — o que gerava a tela de erro/permissão relatada.
 */

export interface MetaAssetIds {
  /** ID do portfólio (Business Manager) do próprio usuário. */
  businessId?: string | null;
  /** ID da conta do WhatsApp Business (WABA) do número conectado. */
  wabaId?: string | null;
}

const BASE = "https://business.facebook.com/latest";

function clean(value?: string | null): string | null {
  const trimmed = String(value ?? "").trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Monta o link da Central de Pagamentos (Billing Hub) do próprio usuário.
 * Retorna `null` quando não há como identificar a conta com segurança.
 */
export function buildMetaBillingUrl({ businessId, wabaId }: MetaAssetIds): string | null {
  const business = clean(businessId);
  const waba = clean(wabaId);

  if (business && waba) {
    return `${BASE}/billing_hub/accounts/details/?asset_id=${encodeURIComponent(waba)}&business_id=${encodeURIComponent(business)}&placement=whatsapp_ads`;
  }
  // Sem o WABA não há como abrir os detalhes; com o portfólio abrimos a lista.
  if (business) {
    return `${BASE}/billing_hub/accounts?business_id=${encodeURIComponent(business)}&placement=whatsapp_ads`;
  }
  return null;
}

/**
 * Monta o link dos Modelos de Mensagem (WhatsApp Manager) do próprio usuário.
 * Retorna `null` quando os IDs do cadastro ainda não estão disponíveis.
 */
export function buildMetaTemplatesUrl({ businessId, wabaId }: MetaAssetIds): string | null {
  const business = clean(businessId);
  const waba = clean(wabaId);

  if (business && waba) {
    return `${BASE}/whatsapp_manager/message_templates?business_id=${encodeURIComponent(business)}&asset_id=${encodeURIComponent(waba)}`;
  }
  if (waba) {
    return `${BASE}/whatsapp_manager/message_templates?asset_id=${encodeURIComponent(waba)}`;
  }
  if (business) {
    return `${BASE}/whatsapp_manager/message_templates?business_id=${encodeURIComponent(business)}`;
  }
  return null;
}

-- 098: marca de conclusão da varredura única de mídias duplicadas.
-- Por quê: antes ficava só no localStorage do navegador, então o painel
-- "Otimizando armazenamento" reaparecia em cada navegador/dispositivo.
-- Idempotente: pode rodar quantas vezes for preciso.
ALTER TABLE public.crm_settings
  ADD COLUMN IF NOT EXISTS media_dedupe_done_at TIMESTAMPTZ;

create table public.consulta (
  id serial not null,
  nombre character varying(100) null,
  email character varying(100) null,
  empresa character varying(100) null,
  cargo character varying(100) null,
  fecha_consulta date not null,
  motivo text null,
  archivo_url text null,
  creado_en timestamp without time zone null default now(),
  numero_documento character varying(50) null,
  telefono character varying(20) null,
  constraint consulta_pkey primary key (id)
) TABLESPACE pg_default;
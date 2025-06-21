-- =============================
-- TABELA: category
-- =============================
CREATE TABLE public.category (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
) TABLESPACE pg_default;

ALTER TABLE public.category OWNER TO postgres;

-- =============================
-- TABELA: product
-- =============================
CREATE TABLE public.product (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    category_id BIGINT NOT NULL,
    CONSTRAINT product_category_id_fkey FOREIGN KEY (category_id)
        REFERENCES public.category(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) TABLESPACE pg_default;

ALTER TABLE public.product OWNER TO postgres;

-- =============================
-- ÍNDICES
-- =============================
CREATE INDEX idx_product_category_id ON public.product(category_id);
CREATE INDEX idx_product_category_name ON public.product(category_id, name);

-- =============================
-- FUNÇÃO: validar nome único na categoria
-- =============================
CREATE OR REPLACE FUNCTION check_product_name_unique()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.product
    WHERE category_id = NEW.category_id
      AND name = NEW.name
      AND id <> COALESCE(NEW.id, -1)
  ) THEN
    RAISE EXCEPTION USING 
      MESSAGE = format('Produto "%s" já existe na categoria %s.', NEW.name, NEW.category_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================
-- TRIGGER: validação de nome único
-- =============================
CREATE TRIGGER trg_product_check_name_unique
BEFORE INSERT OR UPDATE ON public.product
FOR EACH ROW EXECUTE FUNCTION check_product_name_unique();

-- =============================
-- INSERTS: categorias
-- =============================
INSERT INTO public.category (name) VALUES
  ('Livros'),
  ('Eletrônicos'),
  ('Brinquedos'),
  ('Instrumentos Musicais'),
  ('Games');

-- =============================
-- INSERTS: produtos
-- =============================
INSERT INTO public.product (name, description, price, category_id) VALUES
  ('Bíblia Sagrada', 'Edição de luxo com capa de couro.', 89.90, 1),
  ('Fone Bluetooth', 'Fone sem fio com cancelamento de ruído.', 199.90, 2),
  ('Carrinho de Controle Remoto', 'Velocidade de até 20 km/h.', 149.00, 3),
  ('Violão Acústico', 'Violão folk para iniciantes.', 599.90, 4),
  ('Jogo de Aventura', 'Jogo de RPG em mundo aberto.', 249.90, 5);


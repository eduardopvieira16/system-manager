CREATE TABLE public.category (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
) TABLESPACE pg_default;

ALTER TABLE public.category OWNER TO postgres;

CREATE TABLE public.product (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    price NUMERIC(10,2) NOT NULL,
    category_id BIGINT NOT NULL,
    CONSTRAINT product_category_id_fkey FOREIGN KEY (category_id)
        REFERENCES public.category(id) ON DELETE CASCADE
) TABLESPACE pg_default;

ALTER TABLE public.product OWNER TO postgres;

CREATE INDEX idx_product_category_id ON public.product(category_id);

CREATE OR REPLACE FUNCTION check_product_name_unique()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS(
    SELECT 1 FROM public.product
    WHERE category_id = NEW.category_id
      AND name = NEW.name
      AND id <> COALESCE(NEW.id, -1)
  ) THEN
    RAISE EXCEPTION 'Produto "%" já existe nessa categoria.', NEW.name;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_product_name_unique
BEFORE INSERT OR UPDATE ON public.product
FOR EACH ROW EXECUTE FUNCTION check_product_name_unique();

CREATE OR REPLACE PROCEDURE create_product(
    p_name TEXT,
    p_description TEXT,
    p_price NUMERIC(10,2),
    p_category_id BIGINT
)
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO public.product(name, description, price, category_id)
  VALUES(p_name, p_description, p_price, p_category_id);
END;
$$;

CREATE OR REPLACE PROCEDURE edit_product(
    p_id BIGINT,
    p_name TEXT,
    p_description TEXT,
    p_price NUMERIC(10,2),
    p_category_id BIGINT
)
LANGUAGE plpgsql AS $$
BEGIN
  -- lock record to avoid race conditions
  PERFORM 1 FROM public.product WHERE id = p_id FOR UPDATE;

  UPDATE public.product
  SET name = p_name,
      description = p_description,
      price = p_price,
      category_id = p_category_id
  WHERE id = p_id;
END;
$$;

CREATE OR REPLACE PROCEDURE remove_product(p_id BIGINT)
LANGUAGE plpgsql AS $$
BEGIN
  -- lock record to avoid race conditions
  PERFORM 1 FROM public.product WHERE id = p_id FOR UPDATE;
  DELETE FROM public.product WHERE id = p_id;
END;
$$;

CREATE TABLE IF NOT EXISTS ecommerce.categoria (
	id SERIAL NOT NULL,
	nome VARCHAR(45) NOT NULL,
	CONSTRAINT pk_categoria PRIMARY KEY (id)
);

CREATE TYPE PRODUTO_STATUS AS ENUM('venda','cadastro','cancelado');

CREATE TABLE IF NOT EXISTS ecommerce.produto (
	id SERIAL NOT NULL,
	nome VARCHAR(45) NOT NULL,
	especificacao TEXT,
	status PRODUTO_STATUS,
	CONSTRAINT pk_produto PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ecommerce.produto_possui_categoria (
	categoria_id SERIAL NOT NULL,
	produto_id SERIAL NOT NULL,
	CONSTRAINT fk_categoria FOREIGN KEY (categoria_id) 
		REFERENCES ecommerce.categoria(id) ON DELETE CASCADE,
	CONSTRAINT fk_produto FOREIGN KEY (produto_id) 
		REFERENCES ecommerce.produto(id) ON DELETE CASCADE
);

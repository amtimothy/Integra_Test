BEGIN;

CREATE TABLE users (
	user_id UUID DEFAULT gen_random_uuid (),
	email VARCHAR UNIQUE,
    first_name VARCHAR NULL,
    last_name VARCHAR NULL,
    password VARCHAR,
    user_active integer DEFAULT 0,
    created_at timestamp without time zone
        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone,
	PRIMARY KEY (user_id)
);

INSERT INTO users ("email","first_name","last_name","password","user_active","created_at","updated_at")
VALUES
('admin@example.com','Admin','User','$2a$12$1zGLuYDDNvATh4RA4avbKuheAMpb1svexSzrQm7up.bnpwQHs0jNe',1,'2023-04-06 00:00:00','2022-04-06 00:00:00');


COMMIT;
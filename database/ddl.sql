CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE users (
    id SERIAL primary key,
    oid UUID default uuid_generate_v4() not null unique,

    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) not null unique,
    password VARCHAR(255),
    profile_image VARCHAR(255),

    created_at TIMESTAMP default CURRENT_TIMESTAMP,
    updated_at TIMESTAMP default CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);


create table wallets (
    id SERIAL primary key,
    oid UUID default uuid_generate_v4() not null unique,
    id_user INT4 not null,

    wallet_name VARCHAR(15) default 'PRIMARY' not null,
    balance INT4 default 0 not null,

    created_at TIMESTAMP default CURRENT_TIMESTAMP,
    updated_at TIMESTAMP default CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    foreign key (id_user) references users(id)
);


create table banners (
    id SERIAL primary key,
    oid UUID default uuid_generate_v4() not null unique,

    banner_name VARCHAR(25),
    banner_image VARCHAR(255),
    description TEXT,

    created_at TIMESTAMP default CURRENT_TIMESTAMP,
    updated_at TIMESTAMP default CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);


create table services (
    id SERIAL primary key,
    oid UUID default uuid_generate_v4() not null unique,

    service_code VARCHAR(15),
    service_name VARCHAR(25),
    service_icon VARCHAR(255),
    service_tariff INT4,

    created_at TIMESTAMP default CURRENT_TIMESTAMP,
    updated_at TIMESTAMP default CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);


create table transactions (
    id SERIAL primary key,
    oid UUID default uuid_generate_v4() not null unique,
    id_service INT4 not null,
    id_user INT4 not null,

    invoice_number VARCHAR(25) not null,
    transaction_type VARCHAR(25) not null,
    description VARCHAR(255),
    total_amount INT4 not null,

    created_at TIMESTAMP default CURRENT_TIMESTAMP,
    updated_at TIMESTAMP default CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,

    foreign key (id_service) references services(id),
    foreign key (id_user) references users(id)
);

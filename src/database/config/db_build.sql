BEGIN;

DROP TABLE IF EXISTS users, communities, posts, comments, replies, members CASCADE;

CREATE TABLE users (
    id serial PRIMARY KEY  NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password varchar(150) NOT NULL,
    username varchar(255) UNIQUE NOT NULL,
    bio TEXT NOT NULL
);

CREATE TABLE communities (
    id serial PRIMARY KEY NOT NULL,
    community_name TEXT NOT NULL,
    user_id integer REFERENCES users(id)
);

CREATE TABLE posts (
    id serial PRIMARY KEY NOT NULL,
    post_title TEXT NOT NULL,
    post_content TEXT NOT NULL,
    up_votes integer NOT NULL,
    down_votes integer NOT NULL,
    user_id integer REFERENCES users(id) NOT NULL,
    community_id integer REFERENCES communities(id) NOT NULL
);

CREATE TABLE comments (
    id serial PRIMARY KEY NOT NULL,
    comment_content TEXT NOT NULL,
    up_votes integer NOT NULL,
    down_votes integer NOT NULL,
    user_id integer REFERENCES users(id) NOT NULL,
    post_id integer REFERENCES posts(id) NOT NULL
);

CREATE TABLE replies (
    id serial PRIMARY KEY NOT NULL,
    reply_content TEXT NOT NULL,
    up_votes integer NOT NULL,
    down_votes integer NOT NULL,
    user_id integer REFERENCES users(id),
    comment_id integer REFERENCES comments(id)  
);

CREATE TABLE members (
    user_id integer REFERENCES users(id) NOT NULL,
    community_id integer REFERENCES communities(id) NOT NULL
);

COMMIT;

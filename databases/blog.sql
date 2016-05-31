CREATE TABLE categorys (
    id          INTEGER       PRIMARY KEY,
    description VARCHAR (255) NOT NULL,
    name        VARCHAR (255) NOT NULL
);

CREATE TABLE posts (
    id             INTEGER       PRIMARY KEY,
    category_id    INTEGER       CHECK (category_id > 0)
                                 NOT NULL,
    title          VARCHAR (255) NOT NULL,
    description    VARCHAR (255),
    photograph_url VARCHAR (255),
    content        TEXT          NOT NULL,
    read_count     INTEGER       DEFAULT 0,
    like_count     INTEGER       DEFAULT 0,
    music_url      VARCHAR (255),
    publish_time   DATE,
    created_time   DATE,
    FOREIGN KEY (
        category_id
    )
    REFERENCES categorys (id)
);

CREATE TABLE comments (
    id       INTEGER       PRIMARY KEY,
    post_id  INTEGER       CHECK (post_id > 0)
                           NOT NULL,
    email    VARCHAR (255) NOT NULL,
    username VARCHAR (255) NOT NULL,
    content  TEXT,
    FOREIGN KEY (
        post_id
    )
    REFERENCES posts (id)
);

CREATE TABLE tags (
    id   INTEGER       PRIMARY KEY,
    name VARCHAR (255) NOT NULL
);

CREATE TABLE posts_tags (
    post_id INTEGER CHECK (post_id > 0)
                    NOT NULL,
    tag_id  INTEGER CHECK (tag_id > 0)
                    NOT NULL,
    PRIMARY KEY (
        post_id,
        tag_id
    ),
    FOREIGN KEY (
        post_id
    )
    REFERENCES posts (id),
    FOREIGN KEY (
        tag_id
    )
    REFERENCES tags (id)
);

CREATE TABLE site_config (
    id    INTEGER       PRIMARY KEY,
    key   VARCHAR (255) NOT NULL,
    value TEXT          NOT NULL
);

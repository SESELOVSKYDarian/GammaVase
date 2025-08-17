CREATE TABLE IF NOT EXISTS idea_categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS idea_items (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES idea_categories(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT CHECK (type IN ('pdf', 'video')) NOT NULL,
    url TEXT NOT NULL
);

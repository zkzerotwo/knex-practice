CREATE TABLE IF NOT EXISTS shopping_list (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL,
    price decimal(12,2) NOT NULL,
    checked BOOLEAN DEFAULT false NOT NULL,
    date_added TIMESTAMP DEFAULT now() NOT NULL,
    category grocery NOT NULL
);

DROP TYPE IF EXISTS grocery;
CREATE TYPE grocery AS ENUM (
'Main',
'Snack',
'Lunch',
'Breakfast'
);
-- The shopping_list table should have the following 6 columns. None of the columns should allow null values.

-- A primary key column id
-- A name column
-- A price column that should not be a string and support 2 decimal places.
-- A date_added column that should default to now().
-- A checked column that should be a BOOLEAN with a default of false.
-- A category column. Use the grocery type you created for this column.
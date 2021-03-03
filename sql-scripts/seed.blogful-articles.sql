--Seed table transaction
BEGIN;

INSERT INTO blogful_articles (title, date_published, content) 

VALUES 
('Kadaj', now(), 'This particular blog post is about Kadaj!'), 
('Chase Young', now(), 'This particular blog post is about Chase Young!'), 
('Grimmjow Jaggerjacques', now(), 'This particular blog post is about Grimmjow Jaggerjacques!'), 
('Boo', now(), 'This particular blog post is about Boo!'), 
('Vergil', now(), 'This particular blog post is about Vergil!'), 
('Madara Uchiha', now(), 'This particular blog post is about Madara Uchiha!'), 
('Toguro', now(), 'This particular blog post is about Toguro!'), 
('Overhaul', now(), 'This particular blog post is about Overhaul!'), 
('Garou', now(), 'This particular blog post is about Garou!'), 
('Loki', now(), 'This particular blog post is about Loki!');

COMMIT;
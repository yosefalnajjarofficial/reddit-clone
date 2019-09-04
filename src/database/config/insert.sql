INSERT INTO users (email, password, username, bio) VALUES ('yosefalnajjar1@gmail.com', '123456789', 'yosefalnajjar', 'Just a lonely boy');
INSERT INTO users (email, password, username, bio) VALUES ('fares@gmail.com', '123456789', 'fares98', 'Just a cool boy');

INSERT INTO communities (community_name, user_id) VALUES ('Funny', 1);
INSERT INTO communities (community_name, user_id) VALUES ('Creazy', 2);

INSERT INTO posts (post_title, post_content, up_votes, down_votes, user_id, community_id) VALUES ('Funny Title', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 100, 90, 1, 1);
INSERT INTO posts (post_title, post_content, up_votes, down_votes, user_id, community_id) VALUES ('Creazy Title', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s', 88, 50, 1, 2);

INSERT INTO comments (comment_content, up_votes, down_votes, user_id, post_id) VALUES ('Lorem Ipsum is simply dummy text of the printing', 24, 5, 1, 1);
INSERT INTO comments (comment_content, up_votes, down_votes, user_id, post_id) VALUES ('Lorem Ipsum is simply dummy text of the printing', 32, 5, 2, 1);
INSERT INTO comments (comment_content, up_votes, down_votes, user_id, post_id) VALUES ('Lorem Ipsum is simply dummy text of the printing', 42, 5, 1, 2);
INSERT INTO comments (comment_content, up_votes, down_votes, user_id, post_id) VALUES ('Lorem Ipsum is simply dummy text of the printing', 52, 5, 2, 2);
INSERT INTO comments (comment_content, up_votes, down_votes, user_id, post_id) VALUES ('Lorem Ipsum is simply dummy text of the printing', 92, 5, 1, 1);

INSERT INTO replies (reply_content, up_votes, down_votes, user_id, comment_id) VALUES ('when an unknown printer took a galley of type and scrambled it', 72, 5, 1, 1);
INSERT INTO replies (reply_content, up_votes, down_votes, user_id, comment_id) VALUES ('when an unknown printer took a galley of type and scrambled it', 72, 5, 2, 1);

INSERT INTO members (user_id, community_id) VALUES (1, 1);
INSERT INTO members (user_id, community_id) VALUES (1, 2);
INSERT INTO members (user_id, community_id) VALUES (2, 1);
INSERT INTO members (user_id, community_id) VALUES (2, 2);
 
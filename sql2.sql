CREATE TABLE `achievements_types` (
  `id` int UNSIGNED AUTO_INCREMENT NOT NULL,
  `type` varchar(127) NOT NULL,
  `picture` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `articles_types` (
  `id` int UNSIGNED AUTO_INCREMENT NOT NULL,
  `type` varchar(63) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
  `id` int UNSIGNED AUTO_INCREMENT NOT NULL,
  `nickname` varchar(63) NOT NULL,
  `name` varchar(127) NOT NULL,
  `surname` varchar(127) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum(
    'user', 'editor', 'moderator', 'edimod',
    'admin'
  ) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `about` text NOT NULL,
  `birthday` date NOT NULL,
  `city` varchar(127) NOT NULL,
  `status` enum('active', 'deleted', 'blocked') NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `articles` (
  `id` int UNSIGNED AUTO_INCREMENT NOT NULL,
  `author_id` int UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `created_at` datetime NOT NULL,
  `views` int UNSIGNED NOT NULL,
  `status` enum('active', 'deleted', 'blocked') NOT NULL,
  `type_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `articles_author_id_users_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`),
  CONSTRAINT `articles_type_id_articles_types_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `articles_types` (`id`)
);

CREATE TABLE `categories_types` (
  `id` int UNSIGNED AUTO_INCREMENT NOT NULL,
  `name` varchar(127) NOT NULL,
  `parent_category_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `categories_parent_category_id_categories_id_foreign` FOREIGN KEY (`parent_category_id`) REFERENCES `categories_types` (`id`)
);

CREATE TABLE `categories` (
  `id` int UNSIGNED AUTO_INCREMENT NOT NULL,
  `article_id` int UNSIGNED NOT NULL,
  `category_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `categories_article_id_articles_id_foreign` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`),
  CONSTRAINT `categories_category_id_categories_types_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories_types` (`id`)
);

CREATE TABLE `notification_types` (
  `id` int UNSIGNED AUTO_INCREMENT NOT NULL,
  `type` varchar(127) NOT NULL,
  `picture` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `achievements` (
  `id` int UNSIGNED AUTO_INCREMENT NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `achievement_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `achievements_user_id_users_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `achievements_achievement_id_achievements_types_id_foreign` FOREIGN KEY (`achievement_id`) REFERENCES `achievements_types` (`id`)
);

CREATE TABLE `notifications` (
  `id` int UNSIGNED AUTO_INCREMENT NOT NULL,
  `type_id` int UNSIGNED NOT NULL,
  `text` text NOT NULL,
  `created_at` datetime NOT NULL,
  `read` tinyint(1) NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `notifications_type_id_notification_types_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `notification_types` (`id`),
  CONSTRAINT `notifications_user_id_users_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `subscriptions` (
  `id` int UNSIGNED AUTO_INCREMENT NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `to_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `subscriptions_user_id_users_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `subscriptions_to_id_users_id_foreign` FOREIGN KEY (`to_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `comments_articles` (
  `id` int UNSIGNED AUTO_INCREMENT NOT NULL,
  `author_id` int UNSIGNED NOT NULL,
  `text` text NOT NULL,
  `created_at` datetime NOT NULL,
  `parent_id` int UNSIGNED NOT NULL,
  `to_id` int UNSIGNED NOT NULL,
  `status` enum('active', 'deleted', 'blocked') NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `comments_articles_author_id_users_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`),
  CONSTRAINT `comments_articles_parent_id_comments_articles_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `comments_articles` (`id`),
  CONSTRAINT `comments_articles_to_id_articles_id_foreign` FOREIGN KEY (`to_id`) REFERENCES `articles` (`id`)
);

CREATE TABLE `complaints_types` (
  `id` int UNSIGNED AUTO_INCREMENT NOT NULL,
  `type` varchar(127) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `complaints_articles` (
  `id` int UNSIGNED AUTO_INCREMENT NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `to_id` int UNSIGNED NOT NULL,
  `type_id` int UNSIGNED NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `complaints_articles_user_id_users_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `complaints_articles_to_id_articles_id_foreign` FOREIGN KEY (`to_id`) REFERENCES `articles` (`id`),
  CONSTRAINT `complaints_articles_type_id_complaints_types_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `complaints_types` (`id`)
);

CREATE TABLE `favorites` (
  `id` int UNSIGNED AUTO_INCREMENT NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `to_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `favorites_to_id_articles_id_foreign` FOREIGN KEY (`to_id`) REFERENCES `articles` (`id`),
  CONSTRAINT `favorites_user_id_users_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `helper_authors_articles` (
  `id` int UNSIGNED AUTO_INCREMENT NOT NULL,
  `helper_author_id` int UNSIGNED NOT NULL,
  `article_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `helper_authors_articles_helper_author_id_users_id_foreign` FOREIGN KEY (`helper_author_id`) REFERENCES `users` (`id`),
  CONSTRAINT `helper_authors_articles_article_id_articles_id_foreign` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`)
);

CREATE TABLE `likes_articles` (
  `id` int UNSIGNED AUTO_INCREMENT NOT NULL,
  `from_id` int UNSIGNED NOT NULL,
  `to_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `likes_articles_from_id_users_id_foreign` FOREIGN KEY (`from_id`) REFERENCES `users` (`id`),
  CONSTRAINT `likes_articles_to_id_articles_id_foreign` FOREIGN KEY (`to_id`) REFERENCES `articles` (`id`)
);

CREATE TABLE `complaints_comments_articles` (
  `id` int UNSIGNED AUTO_INCREMENT NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `to_id` int UNSIGNED NOT NULL,
  `type_id` int UNSIGNED NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `complaints_comments_articles_user_id_users_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `complaints_comments_articles_to_id_comments_articles_id_foreign` FOREIGN KEY (`to_id`) REFERENCES `comments_articles` (`id`),
  CONSTRAINT `complaints_comments_articles_type_id_complaints_types_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `complaints_types` (`id`)
);

CREATE TABLE `likes_comments_articles` (
  `id` int UNSIGNED AUTO_INCREMENT NOT NULL,
  `from_id` int UNSIGNED NOT NULL,
  `to_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `likes_comments_articles_from_id_users_id_foreign` FOREIGN KEY (`from_id`) REFERENCES `users` (`id`),
  CONSTRAINT `likes_comments_articles_to_id_comments_articles_id_foreign` FOREIGN KEY (`to_id`) REFERENCES `comments_articles` (`id`)
);

ALTER TABLE users ADD COLUMN is_confirmed tinyint(1) NOT NULL;
ALTER TABLE users ADD COLUMN salt char(20) NOT NULL;
ALTER TABLE users
  MODIFY COLUMN `name` varchar(127),
  MODIFY COLUMN `surname` varchar(127),
  MODIFY COLUMN `role` enum('user', 'editor', 'moderator', 'edimod', 'admin') DEFAULT 'user' NOT NULL,
  MODIFY COLUMN `avatar` varchar(255),
  MODIFY COLUMN `about` text,
  MODIFY COLUMN `birthday` date,
  MODIFY COLUMN `city` varchar(127),
  MODIFY COLUMN `status` enum('active', 'deleted', 'blocked') DEFAULT 'active' NOT NULL,
  MODIFY COLUMN `is_confirmed` tinyint(1) DEFAULT 0 NOT NULL;
CREATE USER 'app'@'localhost' IDENTIFIED BY 'S$PD5TsU@ke8JEhT~J9M';
GRANT SELECT,UPDATE,INSERT,DELETE ON myprogress . * TO 'app'@'localhost';
ALTER TABLE users MODIFY COLUMN `created_at` datetime DEFAULT NOW() NOT NULL;
ALTER TABLE users
  MODIFY COLUMN `nickname` varchar(63) UNIQUE NOT NULL,
  MODIFY COLUMN `email` varchar(255) UNIQUE NOT NULL;

create table captchas(`id` int UNSIGNED AUTO_INCREMENT NOT NULL, `uuid` varchar(36) NOT NULL, `captcha` varchar(200) NOT NULL, PRIMARY KEY (`id`));
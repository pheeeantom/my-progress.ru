CREATE TABLE `achievements_types` (
  `id` int(11) NOT NULL,
  `type` varchar(127) NOT NULL,
  `picture` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `categories_types` (
  `id` int(11) NOT NULL,
  `name` varchar(127) NOT NULL,
  `parent_category` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `categories_parent_category_categories_id_foreign` FOREIGN KEY (`parent_category`) REFERENCES `categories_types` (`id`)
);

CREATE TABLE `notification_types` (
  `id` int(11) NOT NULL,
  `type` varchar(127) NOT NULL,
  `picture` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nickname` varchar(63) NOT NULL,
  `name` int(10) NOT NULL,
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
  `age` int(11) NOT NULL,
  `city` varchar(127) NOT NULL,
  `status` enum('active', 'deleted', 'blocked') NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `achievements` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `achievement_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `achievements_user_id_users_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `achievements_achievement_id_achievements_types_id_foreign` FOREIGN KEY (`achievement_id`) REFERENCES `achievements_types` (`id`)
);

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `author` int(11) NOT NULL,
  `helper_authors` json NOT NULL,
  `title` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `created_at` datetime NOT NULL,
  `views` int(11) NOT NULL,
  `status` enum('active', 'deleted', 'blocked') NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `articles_author_users_id_foreign` FOREIGN KEY (`author`) REFERENCES `users` (`id`)
);

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `type_id` varchar(127) NOT NULL,
  `text` text NOT NULL,
  `created_at` datetime NOT NULL,
  `read` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `notifications_type_id_notification_types_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `notification_types` (`id`),
  CONSTRAINT `notifications_user_id_users_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `subscriptions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `column_3` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `subscriptions_user_id_users_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `subscriptions_column_3_users_id_foreign` FOREIGN KEY (`column_3`) REFERENCES `users` (`id`)
);

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `categories_article_id_articles_id_foreign` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`),
  CONSTRAINT `categories_category_id_categories_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories_types` (`id`)
);

CREATE TABLE `comments_articles` (
  `id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `text` text NOT NULL,
  `created_at` datetime NOT NULL,
  `parent_id` int(11) NOT NULL,
  `to_id` int(11) NOT NULL,
  `status` enum('active', 'deleted', 'blocked') NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `comments_articles_author_id_users_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`),
  CONSTRAINT `comments_articles_parent_id_comments_articles_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `comments_articles` (`id`),
  CONSTRAINT `comments_articles_to_id_articles_id_foreign` FOREIGN KEY (`to_id`) REFERENCES `articles` (`id`)
);

CREATE TABLE `complaints_articles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `to_id` int(11) NOT NULL,
  `type` enum(?) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `complaints_articles_user_id_users_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `complaints_articles_to_id_articles_id_foreign` FOREIGN KEY (`to_id`) REFERENCES `articles` (`id`)
);

CREATE TABLE `likes_articles` (
  `id` int(11) NOT NULL,
  `from_id` int(10) NOT NULL,
  `to_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `likes_articles_from_id_users_id_foreign` FOREIGN KEY (`from_id`) REFERENCES `users` (`id`),
  CONSTRAINT `likes_articles_to_id_articles_id_foreign` FOREIGN KEY (`to_id`) REFERENCES `articles` (`id`)
);

CREATE TABLE `complaints_comments_articles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `to_id` int(11) NOT NULL,
  `type` enum(?) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `complaints_comments_articles_user_id_users_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `complaints_comments_articles_to_id_comments_articles_id_foreign` FOREIGN KEY (`to_id`) REFERENCES `comments_articles` (`id`)
);

CREATE TABLE `likes_comments_articles` (
  `id` int(11) NOT NULL,
  `from_id` int(11) NOT NULL,
  `to_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `likes_comments_articles_from_id_users_id_foreign` FOREIGN KEY (`from_id`) REFERENCES `users` (`id`),
  CONSTRAINT `likes_comments_articles_to_id_comments_articles_id_foreign` FOREIGN KEY (`to_id`) REFERENCES `comments_articles` (`id`)
);
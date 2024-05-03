CREATE TABLE `expenses` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`date` text NOT NULL,
	`value` real NOT NULL,
	`category` text NOT NULL,
	`is_unique` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);

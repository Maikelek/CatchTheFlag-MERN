SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `levels` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `hint` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `points` int(11) NOT NULL,
  `pass` varchar(30) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `points` int(11) DEFAULT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'hrac'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `name`, `email`, `password`, `points`, `role`) VALUES
(1, 'Admin', 'admin@admin.com', '$2a$08$ipujrpkyUoyNmVjsRN6tzO51kKFXScYhorvf/bnKR8cHsGsM4RWE2', 0, 'admin'); 
-- password is same as the name admin@admin.com - admin@admin.com

CREATE TABLE `user_levels` (
  `userID` int(11) DEFAULT NULL,
  `levelID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `levels`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;
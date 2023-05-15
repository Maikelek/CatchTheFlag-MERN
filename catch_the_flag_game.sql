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

INSERT INTO `levels` (`id`, `title`, `hint`, `picture`, `points`, `pass`, `link`) VALUES
(1, 'Beginning', 'No comment', NULL, 5, '/l1-z4c1470k\\', NULL),
(2, 'Encoding', 'Can you decode it?', NULL, 15, '/l2-3nc0d1100100110ng\\', 'https://drive.google.com/file/d/1BJUzT9yk-NDdwzLUwj6sbMO3D2rpaYVB/view?usp=sharing'),
(3, 'Cat ?', 'Is there anything interesting?', NULL, 10, '/l3-m30w\\', NULL),
(4, 'Again ¿?', 'Is there any other way to hide text in photo?', NULL, 10, '/l4-$73gan0gr4f1k\\', NULL),
(5, 'Who is it?', 'This is Petra Bottova, explore her photo and find out on which social network she stores her photos.', NULL, 15, '/l5-1n574gr4m1k\\', NULL),
(6, 'Again her', 'Petra is known for giving people tasks, solve them. Enter the password in lowercase letters.', NULL, 15, '/l6-dzt22\\', NULL),
(7, 'Discord', 'On the Discord server, the user \"MichalPriemerny\" saved a folder, find it.', NULL, 25, '/l7-:d1sc0rd807:\\', 'https://discord.gg/Tvcq7a7RAW'),
(8, 'Communication', 'We intercepted the communication, can you find the password?', NULL, 20, '/l8-w1r3$h.4rk\\', 'https://drive.google.com/file/d/1dP1j30Gew_LFKymRvFd1DZ2Z86i3XJ-C/view?usp=sharing'),
(9, 'Linux', 'Someone attempted to hack into an SSH Linux server in a public local network, can you find out when they managed to penetrate it? Password in the form of HH:MM:SS.', NULL, 5, '22:59:50', 'https://drive.google.com/file/d/1aXZC3RLHV935pEZXefIu-QFuM1t_VMj5/view?usp=sharing'),
(10, 'Have I seen it?', '30xp', NULL, 5, 'enchantmcpass', 'https://drive.google.com/file/d/1q9M-No7RAVioeqB0ClJBMisaQbB4GXN0/view?usp=sharing'),
(11, 'PHP Apps are great', "Find someone interesting on Michal Priemerny's website.", NULL, 30, '/l11-=)$qlinject10n=)\\', 'http://hackthematurita.sk/sqlinjection/index.php');

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
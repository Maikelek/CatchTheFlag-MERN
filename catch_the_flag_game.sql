-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2022 at 03:08 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `catch_the_flag_game`
--

-- --------------------------------------------------------

--
-- Table structure for table `levels`
--

CREATE TABLE `levels` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `hint` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `points` int(6) NOT NULL,
  `pass` varchar(30) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `levels`
--

INSERT INTO `levels` (`id`, `title`, `hint`, `picture`, `points`, `pass`, `link`) VALUES
(1, 'Úvod', 'Tu ti pomoc netreba =)', NULL, 5, '/l1-z4c1470k\\', NULL),
(2, 'Enkódovanie', 'Vieš dekódovať tieto súbory?', NULL, 15, '/l2-3nc0d1100100110ng\\', 'https://drive.google.com/file/d/1BJUzT9yk-NDdwzLUwj6sbMO3D2rpaYVB/view?usp=sharing'),
(3, 'Mačka ?', NULL, NULL, 10, '/l3-m30w\\', NULL),
(4, 'Mačka ¿?', NULL, NULL, 10, '/l4-$73gan0gr4f1k\\', NULL),
(5, 'Kto to je?', 'Toto je Petra Bottová preskúmaj jej fotku a zisti na akú sociálnu sieť ukladá svoje fotky', NULL, 15, '/l5-1n574gr4m1k\\', NULL),
(6, 'Znova Petra', 'Petra je známa, že ľuďom dáva úlohy, vyrieš ich.', NULL, 15, '/l6-dzt22\\', NULL),
(7, 'Discord', 'Na Discord serveri si používateľ \"MichalPriemerny\" uložil priečinok nájdi ho', NULL, 25, '/l7-:d1sc0rd807:\\', 'https://discord.gg/Tvcq7a7RAW'),
(8, 'Komunikácia', 'Odchytili sme komunikáciu, nájdeš heslo? ', NULL, 20, '/l8-w1r3$h.4rk\\', 'https://drive.google.com/file/d/1dP1j30Gew_LFKymRvFd1DZ2Z86i3XJ-C/view?usp=sharing'),
(9, 'Linux', 'Vo verejnej lokálnej sieti sa niekto pokúsil nabúrať do SSH Linux serveru, vieš zistiť kedy sa mu podarilo preniknúť? Heslo vo forme HH-MM-SS', NULL, 5, '22:59:50', 'https://drive.google.com/file/d/1aXZC3RLHV935pEZXefIu-QFuM1t_VMj5/view?usp=sharing'),
(10, 'Známe znaky', 'Skús dekódovať túto správu', NULL, 5, 'enchantmcpass', 'https://drive.google.com/file/d/1q9M-No7RAVioeqB0ClJBMisaQbB4GXN0/view?usp=sharing');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `points` int(6) DEFAULT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'hrac'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `points`, `role`) VALUES
(1, 'admin', 'admin@admin.sk', '$2a$08$797Et9kkaK53TbZrI2zzquGjaTADxsXeB/FRyDEbsBtbvG0UNpe4y', 0, 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `levels`
--
ALTER TABLE `levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

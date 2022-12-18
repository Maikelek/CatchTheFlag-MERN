-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2022 at 10:48 PM
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
-- Database: `user_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `age` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fname`, `lname`, `email`, `age`) VALUES
(1, 'Petra', 'Bottova', 'petrabottova@gmail.com', 22),
(2, 'Marian', 'Zelinka', 'marian.zelinka@student.spseke.sk', 19),
(3, 'Peter', 'Nemec', 'peter.nemec@gmail.com', 27),
(4, 'Svetlana', 'Svetlá', 'svetlana.s@yahoo.com', 47),
(5, 'Marek', 'Včelonos', 'vcelonos.mar@seznam.cz', 31),
(6, 'Igor', 'Metlovič', 'igor.metlovic@student.spseke.sk', 16),
(7, 'Štefan', 'Poštár', 'stefi.postar@yahoo.com', 50),
(8, 'Ingrid', 'Švédová', 'svedovaing@centrum.sk', 59),
(9, 'Michal', 'Komár', 'm.komar@gmail.com', 22),
(10, 'Benjamín', 'Biskup', 'bbiskup@gmail.com', 17),
(11, 'Žigmund', 'Mäsiar', 'masiar.zigmund@masiarik.sk', 34),
(12, 'Erik', 'Bosko', 'erik.bosko@tuke.sk', 21),
(1041998, 'Michal', 'Priemerný', 'michael.priemer@gmail.com', 31);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1041999;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

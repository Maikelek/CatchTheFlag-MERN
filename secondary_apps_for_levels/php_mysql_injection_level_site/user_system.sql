-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2023 at 11:51 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

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
  `motto` varchar(150) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fname`, `motto`, `pass`) VALUES
(1, 'Einstein', 'Neplač, že zapadlo slnko, lebo slzy ti zabránia uvidieť hviezdy. ', '$2y$10$l6Lbki.w09LsVv0E5RZawu8cqrrqpq7P7OoaSraRG8kELzQjSBLga'),
(2, 'Dalajláma', 'Prvým krokom na ceste k šťastiu je učenie sa.', '$2y$10$QDyuQxPr2iJgXx0.VY/25Ocs85DYoDE9bl61M8VdPVKgLjEHmejbC'),
(3, 'Van Gogh', 'Milovať je ľahké; to neľahké na láske je len to, aby nás zasa niekto miloval', '$2y$10$QlR3R1iCobkFDG6YXixa3.4Jm.kpJUSCM/15xD/SuQXg94t/V2a7K'),
(4, 'Bob Marley', 'Nesúďte iných, kým nesúdite aj seba.', '$2y$10$pQkXZRXvpm.pZeT.F0UOO.exl/xjyh/duMlhpxoscMmRYdJzRfceq'),
(5, 'William Shakespeare', 'Čas uteká podľa toho, s kým sme.', '$2y$10$y2Je.qngJSuKvMxHIFr.BOWcr/FsOop2JZrxrr3IRg5VJwgjLltbC'),
(6, 'Antoine de Saint-Exupéry ', 'Len srdcom vidí človek správne, to podstatné je očiam neviditeľné.  Zdroj: https://citaty-slavnych.sk/autori/antoine-de-saint-exupery/', '$2y$10$WPxP3h/ZIqrKiwmUeA.Zo.qMqXO7L2achD2Tanmag9Z.mItftzVMW'),
(7, 'Konfucius', 'Nezáleží na tom, ako pomaly napreduješ, pokiaľ nezastavíš', '$2y$10$.bcrEJS73G0UIX05SfJj4.s4KwypcIEccJfjODHw3DldGOBe9R//u'),
(8, 'Friedrich Nietzsche ', 'Bez hudby by bol život chybou. ', '$2y$10$uB4LXSI62r74uVPNYjUnCOjIwqQE/3BUz7mziSm412BOzuCwUY14S'),
(9, 'Siddhartha Gautama', 'Sme výsledkom nášho myslenia. ', '$2y$10$6VvyhH5xf8gviye9nsIAyuVG3jbGitNb60AVt5op7Ho/ZxF3FKe2.'),
(10, 'Aristoteles', 'Vzdelávanie mysle bez vzdelávania srdca nie je žiadne vzdelávanie. ', '$2y$10$HTn.mJzN9Yb6590Fnk2Dn.afL3aUbNmC8HilpdvcUZqhW4PStTA..'),
(11, 'Ján Slota', 'A možno sa zobudíme až vtedy, keď sa na ten \"félvidék\" zasa dovalia škaredí malí jazdci s krivými nohami na ešte škaredších chlpatých poníkoch.', '$2y$10$rAmHM5f3wXmxBW7XnDwl6eLlVdOrYpWGb9de7TsuDTeqdlSZsE/42'),
(12, 'Platón', 'Nikto nie je viac nenávidený ako ten, čo hovorí pravdu', '$2y$10$exkl05v.VMFmDmzMlD1x3OVWl8oavq4nWyzfMBuQY8ujTdarDhZnu'),
(13, 'Erich Maria Remarque', 'Život je zázrak, no nedejú sa v ňom zázraky. ', '$2y$10$YXe2wHzdIY2Z/4m/pgfH2e6zEzgatYU9G5Fwh7mz5d3gWGeIfIpBG'),
(6352362, 'Michal Priemerny', 'Moje motto je: /l11-=)$qlinject10n=)\\', '$2y$10$OgzEIQiwQi6wHX7fGJhg7eJZiwuiNe5B0/pYqzNK2xdEa9ju93FBS');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6352363;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

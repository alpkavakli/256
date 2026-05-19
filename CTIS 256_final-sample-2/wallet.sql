-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 29, 2024 at 05:35 PM
-- Server version: 8.0.34
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

DROP TABLE IF EXISTS `wallet`;
CREATE TABLE IF NOT EXISTS `wallet` (
  `code` varchar(20)  NOT NULL,
  `name` varchar(100)  NOT NULL,
  `opening` decimal(20,10) NOT NULL,
  `last` decimal(20,10) NOT NULL,
  `icon` varchar(50)  NOT NULL,
  `amount` decimal(20,10) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 ;

--
-- Dumping data for table `wallet`
--

INSERT INTO `wallet` (`code`, `name`, `opening`, `last`, `icon`, `amount`) VALUES
('BTC', 'Bitcoin', '67800.0000000000', '74580.0000000000', 'bitcoin.png', '0.5000000000'),
('ETH', 'Ethereum', '3800.0000000000', '4560.0000000000', 'ethereum.png', '4.0000000000'),
('INJ', 'Injective', '26.2000000000', '24.8900000000', 'inj.png', '55.0000000000'),
('GRT', 'The Graph', '0.3200000000', '0.2880000000', 'grt.png', '1600.0000000000'),
('DOGE', 'Dogecoin', '0.1600000000', '0.1840000000', 'doge.png', '5000.0000000000'),
('RNDR', 'Render Token', '10.3000000000', '14.4200000000', 'render.png', '320.0000000000'),
('SOL', 'Solana', '168.6000000000', '143.3100000000', 'solana.png', '60.0000000000');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

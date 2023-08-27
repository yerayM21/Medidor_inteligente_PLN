-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-08-2023 a las 00:03:17
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agrovoltaica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `panel`
--

CREATE TABLE `panel` (
  `idpanel` int(11) NOT NULL,
  `nombrePanel` varchar(45) NOT NULL,
  `kilowatts` double NOT NULL,
  `captura` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `panel`
--

INSERT INTO `panel` (`idpanel`, `nombrePanel`, `kilowatts`, `captura`) VALUES
(1, 'panel1', 70, '2023-08-02'),
(2, 'panel2', 100, '2023-08-02'),
(3, 'panel3', 68, '2023-08-02'),
(4, 'panel4', 130, '2023-08-02'),
(5, 'panel5', 82, '2023-08-02'),
(6, 'panel1', 120, '2023-08-03'),
(7, 'panel2', 180, '2023-08-03'),
(8, 'panel3', 96, '2023-08-03'),
(9, 'panel4', 190, '2023-08-03'),
(10, 'panel5', 131, '2023-08-03'),
(11, 'panel1', 145, '2023-08-04'),
(12, 'panel2', 72, '2023-08-04'),
(13, 'panel3', 220, '2023-08-04'),
(14, 'panel4', 36, '2023-08-04'),
(15, 'panel5', 52, '2023-08-04'),
(16, 'panel1', 320, '2023-08-05'),
(17, 'panel2', 123, '2023-08-05'),
(18, 'panel3', 82, '2023-08-05'),
(19, 'panel4', 215, '2023-08-05'),
(20, 'panel5', 207, '2023-08-05'),
(21, 'panel1', 25, '2023-08-06'),
(22, 'panel2', 19, '2023-08-06'),
(23, 'panel3', 35, '2023-08-06'),
(24, 'panel4', 22, '2023-08-06'),
(25, 'panel5', 19, '2023-08-06'),
(26, 'panel1', 123, '2023-08-07'),
(27, 'panel2', 99, '2023-08-07'),
(28, 'panel3', 132, '2023-08-07'),
(29, 'panel4', 57, '2023-08-07'),
(30, 'panel5', 46, '2023-08-07'),
(31, 'panel1', 75, '2023-08-08'),
(32, 'panel2', 62, '2023-08-08'),
(33, 'panel3', 93, '2023-08-08'),
(34, 'panel4', 36, '2023-08-08'),
(35, 'panel5', 52, '2023-08-08'),
(36, 'panel1', 235, '2023-08-09'),
(37, 'panel2', 123, '2023-08-09'),
(38, 'panel3', 117, '2023-08-09'),
(39, 'panel4', 189, '2023-08-09'),
(40, 'panel5', 99, '2023-08-09'),
(41, 'panel1', 73, '2023-08-10'),
(42, 'panel2', 145, '2023-08-10'),
(43, 'panel3', 36, '2023-08-10'),
(44, 'panel4', 29, '2023-08-10'),
(45, 'panel5', 36, '2023-08-10'),
(46, 'panel1', 43, '2023-08-11'),
(47, 'panel2', 22, '2023-08-11'),
(48, 'panel3', 45, '2023-08-11'),
(49, 'panel4', 39, '2023-08-11'),
(50, 'panel5', 26, '2023-08-11'),
(51, 'panel1', 245, '2023-08-12'),
(52, 'panel2', 93, '2023-08-12'),
(53, 'panel3', 320, '2023-08-12'),
(54, 'panel4', 73, '2023-08-12'),
(55, 'panel5', 185, '2023-08-12'),
(56, 'panel1', 115, '2023-08-13'),
(57, 'panel2', 96, '2023-08-13'),
(58, 'panel3', 122, '2023-08-13'),
(59, 'panel4', 46, '2023-08-13'),
(60, 'panel5', 38, '2023-08-13'),
(61, 'panel1', 38, '2023-08-14'),
(62, 'panel2', 46, '2023-08-14'),
(63, 'panel3', 163, '2023-08-14'),
(64, 'panel4', 77, '2023-08-14'),
(65, 'panel5', 57, '2023-08-14'),
(66, 'panel1', 315, '2023-08-15'),
(67, 'panel2', 135, '2023-08-15'),
(68, 'panel3', 83, '2023-08-15'),
(69, 'panel4', 113, '2023-08-15'),
(70, 'panel5', 171, '2023-08-15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temperatura`
--

CREATE TABLE `temperatura` (
  `idtemperatura` int(11) NOT NULL,
  `centigrados` float NOT NULL,
  `captura` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `temperatura`
--

INSERT INTO `temperatura` (`idtemperatura`, `centigrados`, `captura`) VALUES
(1, 15, '2023-08-02'),
(2, 20, '2023-08-03'),
(3, 4, '2023-08-04'),
(4, 18, '2023-08-05'),
(5, 16, '2023-08-06'),
(6, 21, '2023-08-07'),
(7, 25, '2023-08-08'),
(8, 12, '2023-08-09'),
(9, 19, '2023-08-10'),
(10, 23, '2023-08-11'),
(11, 24, '2023-08-12'),
(12, 11, '2023-08-13'),
(13, 27, '2023-08-14'),
(14, 9, '2023-08-15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `totalwatts`
--

CREATE TABLE `totalwatts` (
  `idwatts` int(11) NOT NULL,
  `watts` double DEFAULT NULL,
  `captura` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `totalwatts`
--

INSERT INTO `totalwatts` (`idwatts`, `watts`, `captura`) VALUES
(1, 450, '2023-08-02'),
(2, 717, '2023-08-03'),
(3, 525, '2023-08-04'),
(4, 947, '2023-08-05'),
(5, 120, '2023-08-06'),
(6, 457, '2023-08-07'),
(7, 318, '2023-08-08'),
(8, 763, '2023-08-09'),
(9, 319, '2023-08-10'),
(10, 175, '2023-08-11'),
(11, 916, '2023-08-12'),
(12, 417, '2023-08-13'),
(13, 381, '2023-08-14'),
(14, 817, '2023-08-15');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `panel`
--
ALTER TABLE `panel`
  ADD PRIMARY KEY (`idpanel`);

--
-- Indices de la tabla `temperatura`
--
ALTER TABLE `temperatura`
  ADD PRIMARY KEY (`idtemperatura`);

--
-- Indices de la tabla `totalwatts`
--
ALTER TABLE `totalwatts`
  ADD PRIMARY KEY (`idwatts`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `panel`
--
ALTER TABLE `panel`
  MODIFY `idpanel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT de la tabla `temperatura`
--
ALTER TABLE `temperatura`
  MODIFY `idtemperatura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `totalwatts`
--
ALTER TABLE `totalwatts`
  MODIFY `idwatts` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 18 Nov 2020 pada 14.06
-- Versi server: 10.4.13-MariaDB
-- Versi PHP: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(18, 51, 12, 1, '2020-10-11 22:49:30', '2020-10-11 22:49:30');

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'T-Shirt', '2020-09-26 03:51:24', '2020-09-26 03:51:24'),
(3, 'Shorts', '2020-09-26 03:53:31', '2020-09-26 05:45:14'),
(4, 'Jacket', '2020-09-26 03:53:42', '2020-09-26 03:53:42'),
(5, 'Pants', '2020-09-26 03:53:48', '2020-09-26 03:53:48'),
(6, 'Beauty', '2020-09-26 03:54:11', '2020-09-26 03:54:11'),
(7, 'Electronic', '2020-09-26 03:54:18', '2020-09-26 03:54:18'),
(9, 'Food', '2020-09-26 03:54:36', '2020-09-26 03:54:36');

-- --------------------------------------------------------

--
-- Struktur dari tabel `conditions`
--

CREATE TABLE `conditions` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `conditions`
--

INSERT INTO `conditions` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'New', '2020-09-26 19:33:18', '2020-09-26 19:33:18'),
(2, 'Used', '2020-09-26 19:34:07', '2020-09-26 19:34:07');

-- --------------------------------------------------------

--
-- Struktur dari tabel `gender`
--

CREATE TABLE `gender` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `gender`
--

INSERT INTO `gender` (`id`, `name`) VALUES
(1, 'Male'),
(2, 'Female'),
(3, 'not defined');

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `description` text NOT NULL,
  `condition_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `seller_id`, `name`, `price`, `description`, `condition_id`, `category_id`, `created_at`, `updated_at`) VALUES
(10, 29, 'Asus ROG Phone3 8/128GB', 9999000, 'ROG Phone 3\nGAME CHANGER\nROG Phone 3 adalah ponsel gaming terkuat yang menggunakan Platform Mobile Qualcomm® Snapdragon™ 865 Plus 5G terbaru dengan kemampuan komunikasi seluler 5G yang canggih. Dibangun untuk memuaskan bahkan para gamer paling hardcore, ia memiliki layar 144 Hz / 1 ms baru yang menakjubkan yang membuat persaingan tetap berdiri. Di samping fitur-fitur yang ditingkatkan seperti AirTrigger 3, Anda akan menemukan semua yang Anda sukai dari generasi sebelumnya, termasuk baterai monster 6000 mAh, desain pengisian daya samping yang unik, speaker ganda menghadap ke depan, dan berbagai aksesori modular. ROG Phone 3 menetapkan standar baru untuk game seluler!', 1, 7, '2020-09-27 03:57:22', '2020-09-27 03:57:22'),
(11, 30, 'Asus ROG Phone3 8/128GB', 8500000, 'ROG Phone 3\nGAME CHANGER\nROG Phone 3 adalah ponsel gaming terkuat yang menggunakan Platform Mobile Qualcomm® Snapdragon™ 865 Plus 5G terbaru dengan kemampuan komunikasi seluler 5G yang canggih. Dibangun untuk memuaskan bahkan para gamer paling hardcore, ia memiliki layar 144 Hz / 1 ms baru yang menakjubkan yang membuat persaingan tetap berdiri. Di samping fitur-fitur yang ditingkatkan seperti AirTrigger 3, Anda akan menemukan semua yang Anda sukai dari generasi sebelumnya, termasuk baterai monster 6000 mAh, desain pengisian daya samping yang unik, speaker ganda menghadap ke depan, dan berbagai aksesori modular. ROG Phone 3 menetapkan standar baru untuk game seluler!', 2, 7, '2020-09-27 04:02:05', '2020-09-27 04:02:05'),
(12, 30, 'Asus ROG - Kunai GamePad', 900000, 'Gamepad or Handheld\nGamepad ROG Kunai dapat digunakan secara independen di masing-masing tangan, menawarkan pengalaman permainan terbaik Anda, Dapat Konversi Antara Gamepad & Mode Genggam.', 1, 7, '2020-09-28 02:21:44', '2020-09-28 02:21:44'),
(13, 30, 'Asus ROG - Kunai GamePad', 900000, 'Gamepad or Handheld\nGamepad ROG Kunai dapat digunakan secara independen di masing-masing tangan, menawarkan pengalaman permainan terbaik Anda, Dapat Konversi Antara Gamepad & Mode Genggam.', 1, 7, '2020-10-11 13:28:37', '2020-10-11 13:28:37'),
(14, 30, 'Asus ROG - Kunai GamePad', 900000, 'Gamepad or Handheld\nGamepad ROG Kunai dapat digunakan secara independen di masing-masing tangan, menawarkan pengalaman permainan terbaik Anda, Dapat Konversi Antara Gamepad & Mode Genggam.', 1, 7, '2020-10-11 13:28:39', '2020-10-11 13:28:39'),
(15, 30, 'Asus ROG - Kunai GamePad', 900000, 'Gamepad or Handheld\nGamepad ROG Kunai dapat digunakan secara independen di masing-masing tangan, menawarkan pengalaman permainan terbaik Anda, Dapat Konversi Antara Gamepad & Mode Genggam.', 1, 7, '2020-10-12 03:05:46', '2020-10-12 03:05:46'),
(16, 30, 'Asus ROG - Kunai GamePad', 900000, 'Gamepad or Handheld\nGamepad ROG Kunai dapat digunakan secara independen di masing-masing tangan, menawarkan pengalaman permainan terbaik Anda, Dapat Konversi Antara Gamepad & Mode Genggam.', 1, 7, '2020-10-12 03:24:49', '2020-10-12 03:24:49'),
(17, 30, 'Asus ROG - Kunai GamePad', 900000, 'Gamepad or Handheld\nGamepad ROG Kunai dapat digunakan secara independen di masing-masing tangan, menawarkan pengalaman permainan terbaik Anda, Dapat Konversi Antara Gamepad & Mode Genggam.', 1, 7, '2020-10-12 03:24:51', '2020-10-12 03:24:51'),
(18, 30, 'Asus ROG - Kunai GamePad', 900000, 'Gamepad or Handheld\nGamepad ROG Kunai dapat digunakan secara independen di masing-masing tangan, menawarkan pengalaman permainan terbaik Anda, Dapat Konversi Antara Gamepad & Mode Genggam.', 1, 7, '2020-10-12 03:24:52', '2020-10-12 03:24:52'),
(19, 30, 'Asus ROG - Kunai GamePad', 900000, 'Gamepad or Handheld\nGamepad ROG Kunai dapat digunakan secara independen di masing-masing tangan, menawarkan pengalaman permainan terbaik Anda, Dapat Konversi Antara Gamepad & Mode Genggam.', 1, 7, '2020-10-12 03:24:54', '2020-10-12 03:24:54'),
(20, 30, 'Asus ROG - Kunai GamePad', 900000, 'Gamepad or Handheld\nGamepad ROG Kunai dapat digunakan secara independen di masing-masing tangan, menawarkan pengalaman permainan terbaik Anda, Dapat Konversi Antara Gamepad & Mode Genggam.', 1, 7, '2020-10-12 03:25:23', '2020-10-12 03:25:23'),
(21, 30, 'Asus ROG - Kunai GamePad', 900000, 'Gamepad or Handheld\nGamepad ROG Kunai dapat digunakan secara independen di masing-masing tangan, menawarkan pengalaman permainan terbaik Anda, Dapat Konversi Antara Gamepad & Mode Genggam.', 1, 7, '2020-10-12 03:25:24', '2020-10-12 03:25:24'),
(22, 30, 'Asus ROG - Kunai GamePad', 900000, 'Gamepad or Handheld\nGamepad ROG Kunai dapat digunakan secara independen di masing-masing tangan, menawarkan pengalaman permainan terbaik Anda, Dapat Konversi Antara Gamepad & Mode Genggam.', 1, 7, '2020-10-12 03:25:25', '2020-10-12 03:25:25'),
(23, 30, 'Asus ROG - Kunai GamePad', 900000, 'Gamepad or Handheld\nGamepad ROG Kunai dapat digunakan secara independen di masing-masing tangan, menawarkan pengalaman permainan terbaik Anda, Dapat Konversi Antara Gamepad & Mode Genggam.', 1, 7, '2020-10-12 03:25:25', '2020-10-12 03:25:25'),
(24, 30, 'Asus ROG - Kunai GamePad', 900000, 'Gamepad or Handheld\nGamepad ROG Kunai dapat digunakan secara independen di masing-masing tangan, menawarkan pengalaman permainan terbaik Anda, Dapat Konversi Antara Gamepad & Mode Genggam.', 1, 7, '2020-10-12 03:25:26', '2020-10-12 03:25:26'),
(25, 30, 'Asus ROG - Kunais GamePad', 900000, 'Gamepad or Handheld\nGamepad ROG Kunai dapat digunakan secara independen di masing-masing tangan, menawarkan pengalaman permainan terbaik Anda, Dapat Konversi Antara Gamepad & Mode Genggam.', 1, 7, '2020-10-12 03:42:19', '2020-10-12 03:42:19');

-- --------------------------------------------------------

--
-- Struktur dari tabel `products_colors`
--

CREATE TABLE `products_colors` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `hexcode` varchar(30) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `products_colors`
--

INSERT INTO `products_colors` (`id`, `product_id`, `name`, `hexcode`, `quantity`, `created_at`, `updated_at`) VALUES
(49, 15, 'Black', '#00000', 1, '2020-10-12 03:06:26', '2020-10-12 03:06:26'),
(50, 10, 'Black', '#00000', 1, '2020-11-14 12:49:20', '2020-11-14 12:49:20'),
(51, 11, 'Black', '#00000', 1, '2020-11-14 12:49:26', '2020-11-14 12:49:26'),
(52, 12, 'Black', '#00000', 1, '2020-11-14 12:49:30', '2020-11-14 12:49:30'),
(53, 13, 'Black', '#00000', 1, '2020-11-14 12:49:33', '2020-11-14 12:49:33'),
(54, 14, 'Black', '#00000', 1, '2020-11-14 12:49:37', '2020-11-14 12:49:37'),
(55, 16, 'Black', '#00000', 1, '2020-11-14 12:50:08', '2020-11-14 12:50:08'),
(56, 17, 'Black', '#00000', 1, '2020-11-14 12:50:12', '2020-11-14 12:50:12'),
(57, 18, 'Black', '#00000', 1, '2020-11-14 12:50:16', '2020-11-14 12:50:16'),
(58, 19, 'Black', '#00000', 1, '2020-11-14 12:50:20', '2020-11-14 12:50:20'),
(59, 20, 'Black', '#00000', 1, '2020-11-14 12:50:25', '2020-11-14 12:50:25'),
(60, 21, 'Black', '#00000', 1, '2020-11-14 12:50:28', '2020-11-14 12:50:28'),
(61, 22, 'Black', '#00000', 1, '2020-11-14 12:50:31', '2020-11-14 12:50:31'),
(62, 23, 'Black', '#00000', 1, '2020-11-14 12:50:34', '2020-11-14 12:50:34'),
(63, 24, 'Black', '#00000', 1, '2020-11-14 12:50:44', '2020-11-14 12:50:44'),
(64, 25, 'Black', '#00000', 1, '2020-11-14 12:50:46', '2020-11-14 12:50:46');

-- --------------------------------------------------------

--
-- Struktur dari tabel `products_images`
--

CREATE TABLE `products_images` (
  `id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL,
  `image` varchar(60) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `products_images`
--

INSERT INTO `products_images` (`id`, `color_id`, `image`, `created_at`, `updated_at`) VALUES
(36, 49, 'uploads/1602471985985.jpg', '2020-10-12 03:06:26', '2020-10-12 03:06:26'),
(37, 50, 'uploads/1605358160556.jpg', '2020-11-14 12:49:20', '2020-11-14 12:49:20'),
(38, 51, 'uploads/1605358166277.jpg', '2020-11-14 12:49:26', '2020-11-14 12:49:26'),
(39, 52, 'uploads/1605358170262.jpg', '2020-11-14 12:49:30', '2020-11-14 12:49:30'),
(40, 53, 'uploads/1605358173862.jpg', '2020-11-14 12:49:33', '2020-11-14 12:49:33'),
(41, 54, 'uploads/1605358177158.jpg', '2020-11-14 12:49:37', '2020-11-14 12:49:37'),
(42, 55, 'uploads/1605358208945.jpg', '2020-11-14 12:50:08', '2020-11-14 12:50:08'),
(43, 56, 'uploads/1605358212182.jpg', '2020-11-14 12:50:12', '2020-11-14 12:50:12'),
(44, 57, 'uploads/1605358216962.jpg', '2020-11-14 12:50:16', '2020-11-14 12:50:16'),
(45, 58, 'uploads/1605358220310.jpg', '2020-11-14 12:50:20', '2020-11-14 12:50:20'),
(46, 59, 'uploads/1605358225776.jpg', '2020-11-14 12:50:25', '2020-11-14 12:50:25'),
(47, 60, 'uploads/1605358228830.jpg', '2020-11-14 12:50:28', '2020-11-14 12:50:28'),
(48, 61, 'uploads/1605358231918.jpg', '2020-11-14 12:50:31', '2020-11-14 12:50:31'),
(49, 62, 'uploads/1605358234934.jpg', '2020-11-14 12:50:34', '2020-11-14 12:50:34'),
(50, 63, 'uploads/1605358244095.jpg', '2020-11-14 12:50:44', '2020-11-14 12:50:44');

-- --------------------------------------------------------

--
-- Struktur dari tabel `products_ratings`
--

CREATE TABLE `products_ratings` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `products_ratings`
--

INSERT INTO `products_ratings` (`id`, `product_id`, `user_id`, `rating`, `created_at`, `updated_at`) VALUES
(1, 12, 14, 3, '2020-10-11 11:28:02', '2020-10-11 11:28:02'),
(2, 12, 14, 3, '2020-10-11 11:28:02', '2020-10-11 11:29:05'),
(3, 11, 14, 4, '2020-10-11 11:28:02', '2020-10-11 11:28:02'),
(4, 11, 14, 2, '2020-10-11 11:28:02', '2020-10-11 11:28:02'),
(5, 11, 14, 5, '2020-10-11 11:28:02', '2020-10-11 11:28:02'),
(6, 10, 14, 5, '2020-10-11 11:28:02', '2020-10-11 11:28:02'),
(7, 10, 14, 4, '2020-10-11 11:28:02', '2020-10-11 11:28:20'),
(8, 10, 14, 5, '2020-10-11 11:28:02', '2020-10-11 11:28:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Super Administrator', '2020-09-24 11:56:51', '2020-09-24 11:56:51'),
(2, 'Seller', '2020-09-24 11:58:35', '2020-09-24 11:58:35'),
(3, 'Customer', '2020-09-24 11:59:15', '2020-09-24 15:44:14');

-- --------------------------------------------------------

--
-- Struktur dari tabel `stores`
--

CREATE TABLE `stores` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `stores`
--

INSERT INTO `stores` (`id`, `user_id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(2, 29, 'Susanti Store', 'Tempat Jual Beli Handphone Terpercaya', '2020-09-26 09:56:46', '2020-09-27 02:58:15'),
(3, 30, 'BTS Cell', 'Sedia HP Baru dan Second', '2020-09-27 04:00:51', '2020-09-27 04:00:51'),
(4, 46, 'Junior House', NULL, '2020-09-30 02:14:53', '2020-09-30 02:14:53'),
(5, 47, 'BeautyMe', NULL, '2020-09-30 02:20:28', '2020-09-30 02:20:28');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `transaction_id` varchar(30) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_color` varchar(100) DEFAULT NULL,
  `product_image` varchar(100) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `delivery_fee` int(11) NOT NULL,
  `summary` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `transactions`
--

INSERT INTO `transactions` (`id`, `transaction_id`, `seller_id`, `user_id`, `product_name`, `product_color`, `product_image`, `price`, `quantity`, `total_price`, `delivery_fee`, `summary`, `created_at`) VALUES
(14, 'SHOPID1601641248532', 30, 44, 'Asus ROG - Kunai GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-02 12:20:48'),
(15, 'SHOPID1601642677736', 30, 44, 'Asus ROG - Kunai GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-02 12:44:37'),
(18, 'SHOPID1601644613956', 29, 44, 'Asus ROG Phone3 8/128GB', NULL, NULL, 9999000, 1, 9999000, 10000, 10009000, '2020-10-02 13:16:53'),
(19, 'SHOPID1601644613956', 30, 44, 'Asus ROG Phone3 8/128GB', NULL, NULL, 8500000, 1, 8500000, 10000, 8510000, '2020-10-02 13:16:53'),
(20, 'SHOPID1601866459528', 30, 51, 'Asus ROG - Kunai GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-05 02:54:19'),
(21, 'SHOPID1602468746664', 29, 18, 'Asus ROG Phone3 8/128GB', NULL, NULL, 9999000, 1, 9999000, 10000, 10009000, '2020-10-12 02:12:26'),
(22, 'SHOPID1602468746664', 30, 18, 'Asus ROG Phone3 8/128GB', NULL, NULL, 8500000, 1, 8500000, 10000, 8510000, '2020-10-12 02:12:27'),
(23, 'SHOPID1602478058551', 29, 18, 'Asus ROG Phone3 8/128GB', NULL, NULL, 9999000, 1, 9999000, 10000, 10009000, '2020-10-12 04:47:38'),
(24, 'SHOPID1602478058551', 29, 18, 'Asus ROG Phone3 8/128GB', NULL, NULL, 9999000, 1, 9999000, 10000, 10009000, '2020-10-12 04:47:38'),
(25, 'SHOPID1602478058551', 30, 18, 'Asus ROG Phone3 8/128GB', NULL, NULL, 8500000, 1, 8500000, 10000, 8510000, '2020-10-12 04:47:38'),
(26, 'SHOPID1602489858293', 29, 18, 'Asus ROG Phone3 8/128GB', NULL, NULL, 9999000, 1, 9999000, 10000, 10009000, '2020-10-12 08:04:18'),
(27, 'SHOPID1602674282611', 30, 18, 'Asus ROG - Kunai GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-14 11:18:02'),
(28, 'SHOPID1602674282611', 30, 18, 'Asus ROG - Kunai GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-14 11:18:03'),
(29, 'SHOPID1602674282611', 30, 18, 'Asus ROG - Kunai GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-14 11:18:03'),
(30, 'SHOPID1602674735760', 30, 18, 'Asus ROG - Kunais GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-14 11:25:35'),
(31, 'SHOPID1602674735760', 30, 18, 'Asus ROG - Kunais GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-14 11:25:35'),
(32, 'SHOPID1602675204922', 30, 18, 'Asus ROG - Kunais GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-14 11:33:24'),
(33, 'SHOPID1602675272551', 30, 18, 'Asus ROG - Kunais GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-14 11:34:32'),
(34, 'SHOPID1602675381480', 30, 18, 'Asus ROG - Kunais GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-14 11:36:21'),
(35, 'SHOPID1602675534227', 30, 18, 'Asus ROG - Kunais GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-14 11:38:54'),
(36, 'SHOPID1602675656551', 30, 18, 'Asus ROG - Kunais GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-14 11:40:56'),
(37, 'SHOPID1602675859974', 30, 18, 'Asus ROG - Kunais GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-14 11:44:19'),
(38, 'SHOPID1602675972883', 30, 18, 'Asus ROG - Kunais GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-14 11:46:12'),
(39, 'SHOPID1602676044368', 30, 18, 'Asus ROG - Kunais GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-14 11:47:24'),
(40, 'SHOPID1602676123711', 30, 18, 'Asus ROG - Kunais GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-14 11:48:43'),
(41, 'SHOPID1602676195240', 30, 18, 'Asus ROG - Kunais GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-14 11:49:55'),
(42, 'SHOPID1602676972694', 30, 18, 'Asus ROG - Kunais GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-14 12:02:52'),
(43, 'SHOPID1602677075561', 30, 18, 'Asus ROG - Kunais GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-14 12:04:35'),
(44, 'SHOPID1602677137998', 30, 18, 'Asus ROG - Kunais GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-14 12:05:37'),
(45, 'SHOPID1602677255673', 30, 18, 'Asus ROG - Kunais GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-14 12:07:35'),
(46, 'SHOPID1602677322878', 30, 18, 'Asus ROG - Kunai GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-10-14 12:08:42'),
(47, 'SHOPID1604405660340', 30, 18, 'Asus ROG - Kunai GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-11-03 12:14:20'),
(48, 'SHOPID1605687425255', 30, 18, 'Asus ROG - Kunai GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-11-18 08:17:05'),
(49, 'SHOPID1605687491940', 30, 18, 'Asus ROG - Kunai GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-11-18 08:18:11'),
(50, 'SHOPID1605687794837', 30, 18, 'Asus ROG - Kunai GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-11-18 08:23:14'),
(51, 'SHOPID1605688030244', 30, 18, 'Asus ROG - Kunai GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-11-18 08:27:10'),
(52, 'SHOPID1605688112566', 30, 18, 'Asus ROG - Kunai GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-11-18 08:28:32'),
(53, 'SHOPID1605688151828', 30, 18, 'Asus ROG - Kunai GamePad', NULL, NULL, 900000, 1, 900000, 10000, 910000, '2020-11-18 08:29:11'),
(54, 'SHOPID1605703983729', 30, 18, 'Asus ROG - Kunai GamePad', 'Black', 'uploads/1605358170262.jpg', 900000, 1, 900000, 10000, 910000, '2020-11-18 12:53:03'),
(55, 'SHOPID1605703983729', 30, 18, 'Asus ROG - Kunai GamePad', 'Black', 'uploads/1602471985985.jpg', 900000, 1, 900000, 10000, 910000, '2020-11-18 12:53:03');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(80) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `role_id`, `email`, `password`, `created_at`, `updated_at`) VALUES
(14, 3, 'susan@mail.com', '$2b$10$PhPF0oTfkkvgz3pqvVHAqeboeX3nCSjc5wK1tT6jE35mQ5P/1mmSS', '2020-09-25 15:31:31', '2020-09-25 22:08:21'),
(16, 1, 'admin1@mail.com', '$2b$10$TaUTIkMeJYJCP37CLuY2MupSJJVC57rDRIisL3cM/fUkcDk6fQ74y', '2020-09-25 23:59:49', '2020-09-26 00:34:40'),
(18, 3, 'jay@mail.com', '$2b$10$DN6SPLs7LpZ5F7GzWUduHOBXBkgTdypXQzAzGD4kbLQTMhC8IdFEe', '2020-09-26 03:37:29', '2020-11-17 08:40:23'),
(29, 2, 'susanti4@mail.com', '$2b$10$NenxC/hOMnOGirIazw6GleJHrESOlrCUJLpXGtrOsfumROZblqYzi', '2020-09-26 09:56:46', '2020-09-26 09:56:46'),
(30, 2, 'andy@mail.com', '$2b$10$YosINTyQlAm/frS5HfWg/OFfuGIGFOnjNI2s09/lPPxET6jRCuQWy', '2020-09-27 04:00:51', '2020-09-27 04:00:51'),
(31, 1, 'admin@mail.com', '$2b$10$v33w7AgYo23HYQ5ps//4u.RG4BeVNw9WIy43uC8gnTBievMILeXsG', '2020-09-27 04:44:22', '2020-09-27 04:44:22'),
(40, 3, 'jane@mail.com', '$2b$10$Z7VfSNkqxpCnvAMzBEe1Burch6/ZlFU4KU.7DaxeFBHOODWUhK60i', '2020-09-27 12:08:55', '2020-09-27 12:08:55'),
(41, 2, 'samuel@mail.com', '$2b$10$aneEx2K0BAbu1pvhciErk.cfopRvXR.u2T0fK8dqeAFcVidZ8Py8y', '2020-09-28 00:09:05', '2020-09-28 00:09:05'),
(43, 3, 'lea@mail.com', '$2b$10$SnFA0ttn5sgiJqZr7zpeTu221Zo/zEIzIK2vFqHRvjYDNA62mgfQq', '2020-09-30 02:04:39', '2020-09-30 02:04:39'),
(44, 3, 'dita@mail.com', '$2b$10$8C25Bh/YfPpXTzDOJ725M.aOHzZgPfnPFigWps5V.2XsV.nyZjBzm', '2020-09-30 02:05:59', '2020-09-30 02:05:59'),
(46, 2, 'junior@mail.com', '$2b$10$t3XGp1UoiGT6mq86LOzYGulBhGsr.8R2Vaq0e1c73kW13rsL1HuxW', '2020-09-30 02:14:53', '2020-09-30 02:14:53'),
(47, 2, 'silvya@mail.com', '$2b$10$Sh4FUtV2L2ezOZivvBwSR.ZlK7utxjyzscBh6pvwGPK3Vb21ynaoa', '2020-09-30 02:20:28', '2020-09-30 02:20:28'),
(50, 3, 'jun@mail.com', '$2b$10$yffoXOpNiUfn6pJUq2ZWN.s6Q6GZUL6mN66HyRtMKLbatMKSjQeYy', '2020-10-02 03:33:11', '2020-10-02 03:33:11'),
(51, 3, 'san@mail.com', '$2b$10$AnknnF7s4sgJtYpdmjtQWODqu.HHY7x4Q4Zzx/FTRAiE34zj36vFS', '2020-10-05 02:48:52', '2020-10-05 02:48:52'),
(52, 3, 'sandi@mail.com', '$2b$10$q8ZcF.qmKjXqkFZ4itGO0.QZ9KgK6VlpL9144taw2/kK0aF3W3.MC', '2020-10-13 13:13:03', '2020-10-13 13:13:03'),
(53, 3, 'rani@mail.com', '$2b$10$Kv5LdXWjy7qRJbkgqbEBvuMjtFHz45m0i.VzFjtIOcZo3oN4qzzrW', '2020-10-13 13:13:56', '2020-10-13 13:13:56'),
(54, 3, 'ran@mail.com', '$2b$10$F77YvRqW9t7yhopKshWxCOJx5SL0/D6M905AqK7xCsWo7Wc0RudtC', '2020-10-13 13:14:55', '2020-10-13 13:14:55'),
(55, 3, 'sunny@mail.com', '$2b$10$d4jn38jGVXJRmcZ6ioBIL.R5PNWFQukWbE8rrmD1fIR0CBjRIpbZi', '2020-10-13 13:16:06', '2020-10-13 13:16:06'),
(56, 3, 'jess@mail.com', '$2b$10$T0gnTKnQPphO.3jN.z1cBeZd1BGnZB6w.BCsR8glJKA6qq1Gsg7Yu', '2020-11-01 23:38:11', '2020-11-01 23:38:11'),
(57, 3, 'novi@mail.com', '$2b$10$MbptqFaZD0sHeaZ5wNCFguJkaopFRoWCokwblp2gLCjOnljGFtRJW', '2020-11-02 23:09:35', '2020-11-02 23:09:35'),
(58, 3, 'novia@mail.com', '$2b$10$mTigaIhzSrBq1E5nEcZnyOBCu6UfalamvfzCEAfcycH65rTMh5Vy.', '2020-11-02 23:16:50', '2020-11-02 23:16:50'),
(59, 3, 'fadil@mail.com', '$2b$10$78XHiiHfx4i5UtN8Ogv71u4E.avh/OD6C4PbmVqajw59c04DJAgv6', '2020-11-05 06:47:41', '2020-11-05 06:47:41'),
(60, 3, 'yanan@mail.com', '$2b$10$WtIobDQbuBVtDKWlmKvst.rxHUi0UijfbDae.ZV75mlVmTjZ5n5dq', '2020-11-17 02:09:38', '2020-11-17 02:09:38');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_address`
--

CREATE TABLE `user_address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `isPrimary` int(11) NOT NULL DEFAULT 0,
  `name` varchar(30) NOT NULL,
  `recipient_name` varchar(30) NOT NULL,
  `recipient_phone` bigint(20) NOT NULL,
  `address` text NOT NULL,
  `postal_code` int(5) NOT NULL,
  `city` varchar(80) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_address`
--

INSERT INTO `user_address` (`id`, `user_id`, `isPrimary`, `name`, `recipient_name`, `recipient_phone`, `address`, `postal_code`, `city`, `created_at`, `updated_at`) VALUES
(3, 18, 1, 'My Home', 'Jay', 86756987453, 'Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas,', 53182, 'Banyumas', '2020-09-29 22:58:03', '2020-11-17 23:12:28'),
(4, 44, 0, 'My Home', 'Dita', 87635482537, 'Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas,', 53181, 'Banyumas', '2020-10-02 12:20:41', '2020-10-02 12:20:41'),
(5, 51, 0, 'My Home', 'San', 87635482537, 'Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas,', 53181, 'Banyumas', '2020-10-05 02:53:12', '2020-10-05 02:53:12'),
(6, 18, 0, 'My Office', 'Jay', 87635482537, 'Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas,', 53181, 'Banyumas', '2020-11-02 11:28:34', '2020-11-02 11:28:34'),
(7, 18, 0, 'Lina House', 'Lina', 89765467856, 'Medan', 55555, 'Medan', '2020-11-04 22:56:24', '2020-11-17 23:18:13'),
(8, 18, 0, 'Lisa House', 'Lisa', 87456839456, 'Jakarta', 55555, 'Jakarta', '2020-11-04 23:01:07', '2020-11-04 23:01:07'),
(9, 18, 0, 'Nusa House', 'Nusa', 87965465738, 'Malang', 56745, 'Malang', '2020-11-04 23:03:55', '2020-11-04 23:03:55'),
(10, 18, 0, 'Nisa House', 'Nisa', 89767654567, 'Semarang', 55555, 'Semarang', '2020-11-04 23:05:15', '2020-11-04 23:05:15'),
(11, 18, 0, 'Lina Office', 'Lina', 273678564, 'Surabaya', 55555, 'Surabaya', '2020-11-04 23:10:36', '2020-11-04 23:10:36'),
(12, 18, 0, 'Siti', 'Siti', 89765434543, 'Gerdu, Rt.03/07, Giripurwo, Wonogiri', 57612, 'Wonogiri', '2020-11-17 22:39:58', '2020-11-17 22:39:58');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_details`
--

CREATE TABLE `user_details` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `picture` varchar(60) DEFAULT NULL,
  `phone` bigint(20) DEFAULT NULL,
  `gender_id` int(11) DEFAULT 3,
  `birthdate` varchar(16) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_details`
--

INSERT INTO `user_details` (`id`, `user_id`, `name`, `picture`, `phone`, `gender_id`, `birthdate`, `created_at`, `updated_at`) VALUES
(6, 14, 'Susan', 'uploads/1601452110285.jpg', 89765467534, 2, '2000-08-09', '2020-09-25 15:31:31', '2020-10-11 10:36:38'),
(10, 18, 'Jay', 'uploads/1605693359994.jpeg', 85736482091, 1, '2000-09-09', '2020-09-26 03:37:29', '2020-11-18 09:56:03'),
(21, 29, 'Susanti', 'uploads/1601452379482.jpg', 86457362968, 2, '1998-05-06', '2020-09-26 09:56:46', '2020-10-11 10:36:38'),
(22, 30, 'Andy', 'uploads/1601451682860.jpg', 86457362968, 1, '1998-05-06', '2020-09-27 04:00:51', '2020-10-11 10:36:38'),
(31, 40, 'Jane', 'uploads/1601208535669.jpg', 87653980765, 2, '1999-09-09', '2020-09-27 12:08:55', '2020-10-11 10:36:38'),
(32, 41, 'Samuel', 'uploads/1601251745118.jpg', 87653980766, 1, '1999-09-09', '2020-09-28 00:09:05', '2020-10-11 10:36:38'),
(33, 43, 'Lea', 'uploads/1601449600502.jpg', 87635482536, 2, '2000-08-09', '2020-09-30 02:04:39', '2020-10-11 10:36:38'),
(34, 44, 'Ditas', '[object Object]', NULL, 3, NULL, '2020-09-30 02:05:59', '2020-10-14 04:12:06'),
(36, 46, 'Junior', 'uploads/1601454757462.jpeg', 86524367145, 1, '1997-03-02', '2020-09-30 02:14:53', '2020-10-11 10:36:38'),
(37, 47, 'Silvya', 'uploads/1601455653742.jpg', 86547365240, 2, '1997-03-02', '2020-09-30 02:20:28', '2020-10-11 10:36:38'),
(40, 50, 'Jun', NULL, NULL, 3, NULL, '2020-10-02 03:33:11', '2020-10-02 03:33:11'),
(41, 51, 'San', 'uploads/1601866606473.jpg', 87635482536, 3, '1998-07-06', '2020-10-05 02:48:52', '2020-10-11 10:36:38'),
(42, 52, 'Sandi', NULL, NULL, 3, NULL, '2020-10-13 13:13:03', '2020-10-13 13:13:03'),
(43, 53, 'Rani', NULL, NULL, 3, NULL, '2020-10-13 13:13:56', '2020-10-13 13:13:56'),
(44, 54, 'Ran', NULL, NULL, 3, NULL, '2020-10-13 13:14:55', '2020-10-13 13:14:55'),
(45, 55, 'Sunny', NULL, NULL, 3, NULL, '2020-10-13 13:16:06', '2020-10-13 13:16:06'),
(46, 56, 'Jess', NULL, NULL, 3, NULL, '2020-11-01 23:38:11', '2020-11-01 23:38:11'),
(47, 57, 'Novi', NULL, NULL, 3, NULL, '2020-11-02 23:09:36', '2020-11-02 23:09:36'),
(48, 58, 'Novia', NULL, NULL, 3, NULL, '2020-11-02 23:16:51', '2020-11-02 23:16:51'),
(49, 59, 'Fadil', NULL, NULL, 3, NULL, '2020-11-05 06:47:41', '2020-11-05 06:47:41'),
(50, 60, 'Yanan', NULL, NULL, 3, NULL, '2020-11-17 02:09:38', '2020-11-17 02:09:38');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `conditions`
--
ALTER TABLE `conditions`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `gender`
--
ALTER TABLE `gender`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_name` (`category_id`),
  ADD KEY `condition` (`condition_id`),
  ADD KEY `user` (`seller_id`);

--
-- Indeks untuk tabel `products_colors`
--
ALTER TABLE `products_colors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product` (`product_id`);

--
-- Indeks untuk tabel `products_images`
--
ALTER TABLE `products_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `color_id` (`color_id`);

--
-- Indeks untuk tabel `products_ratings`
--
ALTER TABLE `products_ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_ratings_ibfk_1` (`product_id`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `detail_id` (`user_id`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_ibfk_1` (`user_id`),
  ADD KEY `seller_id` (`seller_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role` (`role_id`);

--
-- Indeks untuk tabel `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_name` (`user_id`),
  ADD KEY `gender` (`gender_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `conditions`
--
ALTER TABLE `conditions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `gender`
--
ALTER TABLE `gender`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT untuk tabel `products_colors`
--
ALTER TABLE `products_colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT untuk tabel `products_images`
--
ALTER TABLE `products_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT untuk tabel `products_ratings`
--
ALTER TABLE `products_ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `stores`
--
ALTER TABLE `stores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT untuk tabel `user_address`
--
ALTER TABLE `user_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `category_name` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `condition` FOREIGN KEY (`condition_id`) REFERENCES `conditions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `products_colors`
--
ALTER TABLE `products_colors`
  ADD CONSTRAINT `product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `products_images`
--
ALTER TABLE `products_images`
  ADD CONSTRAINT `products_images_ibfk_1` FOREIGN KEY (`color_id`) REFERENCES `products_colors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `products_ratings`
--
ALTER TABLE `products_ratings`
  ADD CONSTRAINT `products_ratings_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `detail_id` FOREIGN KEY (`user_id`) REFERENCES `user_details` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `user_address`
--
ALTER TABLE `user_address`
  ADD CONSTRAINT `user_address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `user_details`
--
ALTER TABLE `user_details`
  ADD CONSTRAINT `gender` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_name` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2023 at 06:36 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `forkit`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `user_name` varchar(20) NOT NULL,
  `amount` int(10) NOT NULL,
  `order_id` varchar(50) NOT NULL,
  `payment_id` varchar(50) NOT NULL,
  `razorpay_sign` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`user_name`, `amount`, `order_id`, `payment_id`, `razorpay_sign`) VALUES
('ParthBhuva97', 100, 'order_N2kaAkchfJsTeP', 'pay_N2kaHRAN9FBsqS', '596fb8c4f0f071e23457737b0734afce874e7cf855671327d7'),
('ParthBhuva97', 5000, 'order_N2kifIFKZbe1oI', 'pay_N2kiv21yuzRBth', 'eb5f5092f0a783f33e8b7e7c4ec242c58c6de64197b22008b9'),
('ParthBhuva97', 5000, 'order_N2kk9RyF8xx9BF', 'pay_N2kkOITdKEo64M', '341c14dd67a0a5cafcde8fb0ea60503282e05362baed9dcde4'),
('ParthBhuva97', 100, 'order_N2kMOyI4nLLIZ0', 'pay_N2kN7r37JEXOc9', 'e1bac1729eef3875cda31f8c246f15102c174e57039871f691'),
('ParthBhuva97', 100, 'order_N2kqie1ckDf27u', 'pay_N2kqxm6vRvxHZK', 'c4866ea3afe1037c7c5002c42b20c42235148c8940478a4f20'),
('ParthBhuva97', 100, 'order_N2krdRrtyMRjeE', 'pay_N2kromPepbHJLM', '2488e26ce2be0f59318883a27c348dc5c1495c7b48b8cdd82d'),
('undefined', 0, 'order_N2kUIEW6ztVgEN', 'pay_N2kUVcrwI5Bu21', 'ee367c03f6d67ac35c90eef0e3ff24e74fb1531377107ed3e2'),
('ParthBhuva97', 5000, 'order_N2kvZN0SWJTXxN', 'pay_N2kvtuzxz3r8RI', '165db15730cba2d9166c9361e48f156b6a518f5b1aff3766fc'),
('undefined', 0, 'order_N2kWJ06SfziSsd', 'pay_N2kWQ4bNEaL1Gw', 'ac27a240714f2859de9206d7d42dd7c07d2d712b15cc6a3a94'),
('ParthBhuva97', 5000, 'order_N2ky6yHXq2xb3K', 'pay_N2kyMgoWyNwHQe', '58211f0dc097ba5b8f51016a176e508a4e682cdeb765d8cdb2'),
('ParthBhuva97', 100, 'order_N2kZZH1t1WgoCb', 'pay_N2kZpFS4epL89x', '2f2c1df51497155676d9363ebffb4f36b2bbcf93499d4d033d'),
('ParthBhuva97', 100, 'order_N2oFz5HLx9sT9y', 'pay_N2oG7xc1PrBHji', '83a89597e4a4d73778668e33853f4f2ec1b51279d7148e5234'),
('ParthBhuva97', 100, 'order_N2oGfzLsHIybVi', 'pay_N2oGpyxZP4GaN6', 'ecd7498f86381515ad4a73d43bf137ca3b5e30ad49adafe2f1'),
('ParthBhuva97', 100, 'order_N2oI4hx5WUwWE8', 'pay_N2oIFXKs9T48Mh', 'd28ec067f7c879f6b46a3e6fe0433d588b29eb6361b0f000fd'),
('ParthBhuva97', 5000, 'order_N2oJAB1cw4poss', 'pay_N2oJJmJj6i0GDt', '3b5654dd34084aeb7fd84cbe2303a90db5e730a99e609352db');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `project_id` int(15) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `status` varchar(10) NOT NULL,
  `repo_link` varchar(50) NOT NULL,
  `readme` varchar(5000) NOT NULL,
  `amount` int(10) DEFAULT NULL,
  `remarks` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`project_id`, `user_name`, `status`, `repo_link`, `readme`, `amount`, `remarks`) VALUES
(1, 'ParthBhuva97', 'pending', 'https://api.github.com/repos/Fork-IT/birthday-4', 'PGgxPlByb2plY3QgVGl0bGU8L2gxPgoKPGgyPkxhbmd1YWdlczogUmVhY3Qs\nIFRhaWx3aW5kQ1NTPC9oMj4KCjxoMz5UaGlzIGlzIERlbW8gUHJvamVjdDwv\naDM+Cg==\n', 500, 'Not upto the Readme Standards'),
(2, 'ParthBhuva97', 'pending', 'https://api.github.com/repos/Fork-IT/birthday-5', 'PGgxPkJpcnRoZGF5IDwvaDE+Cgo8aDI+TGFuZ3VhZ2VzOiBSZWFjdCwgVGFp\nbHdpbmRDU1M8L2gyPgoKPGgzPlRoaXMgaXMgYUJpcnRoZGF5IEdpZnQgUHJv\namVjdDwvaDM+CgohW0hpUmVzLTE3XShodHRwczovL2dpdGh1Yi5jb20vUGFy\ndGhCaHV2YTk3L2JpcnRoZGF5L2Fzc2V0cy85ODk3MzI5NS81Y2VjNjU0Ny1i\nYTczLTQ1N2MtYTEwYS00ODY5YzczZjdiMmQpCgoKaHR0cHM6Ly9naXRodWIu\nY29tL1BhcnRoQmh1dmE5Ny9iaXJ0aGRheS9hc3NldHMvOTg5NzMyOTUvMDdj\nZWI3ODYtMGY0Ni00ZTdlLWJlY2UtYjdkNzdiY2E5ODU3Cgo=\n', 1000, NULL),
(3, 'ParthBhuva97', 'rejected', 'https://api.github.com/repos/Fork-IT/birthday-6', 'PGgxPkJpcnRoZGF5IDwvaDE+Cgo8aDI+UmVhY3QsIFRhaWx3aW5kQ1NTPC9o\nMj4KCjxoMz5UaGlzIGlzIGFCaXJ0aGRheSBHaWZ0IFByb2plY3Q8L2gzPgoK\nPGg0PldlYjwvaDQ+Cg==\n', 5000, NULL),
(4, 'ParthBhuva97', 'rejected', 'https://api.github.com/repos/Fork-IT/demo2', 'PGgxPlByb2plY3QgMTAxPC9oMT4KPGgyPlBIUCwgUHl0aG9uPC9oMj4KPGgz\nPlRoaXMgUHJvamVjdCBpcyBtYWRlIGluIFBIUDwvaDM+CjxoND5Nb2JpbGU8\nL2g0Pgo=\n', 100, NULL),
(5, 'ParthBhuva97', 'rejected', 'https://api.github.com/repos/Fork-IT/Adison', 'PGgxPkVkaXNvbiBQcm9qZWN0PC9oMT4KPGgyPlJlYWN0LCBUYWlsd2luZDwv\naDI+CjxoMz5UaGlzIGlzIGxpZ2h0YnVsYjwvaDM+Cgo8aW1nIHNyYz0iaHR0\ncHM6Ly9kcml2ZS5nb29nbGUuY29tL3RodW1ibmFpbD9pZD0xOV94N19nM0tZ\ncHhkY1JSZk4xZnhvR0ZNTG1vQ3hwN0UiIC8+Cg==\n', 500, NULL),
(6, 'ParthBhuva97', 'approved', 'https://api.github.com/repos/Fork-IT/Adison-1', 'PGgxPkVkaXNvbiBQcm9qZWN0PC9oMT4KPGgyPlJlYWN0LCBUYWlsd2luZDwv\naDI+CjxoMz5UaGlzIGlzIGxpZ2h0YnVsYjwvaDM+CjxoND5Nb2JpbGU8L2g0\nPgoKPGltZyBzcmM9Imh0dHBzOi8vZHJpdmUuZ29vZ2xlLmNvbS90aHVtYm5h\naWw/aWQ9MTlfeDdfZzNLWXB4ZGNSUmZOMWZ4b0dGTUxtb0N4cDdFIiAvPgo=\n', 500, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_name` varchar(20) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `upi_id` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_name`, `email`, `upi_id`) VALUES
('ParthBhuva97', 'Parthbhuva97@gmail.com', 'parthbhuva97@okhdfcbank');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`project_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `project_id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

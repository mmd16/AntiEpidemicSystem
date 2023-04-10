-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-04-10 20:07:38
-- 伺服器版本： 10.4.27-MariaDB
-- PHP 版本： 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `antiepidemicsystem`
--

-- --------------------------------------------------------

--
-- 資料表結構 `token`
--

CREATE TABLE `token` (
  `id` int(11) NOT NULL,
  `expired` bit(1) NOT NULL,
  `revoked` bit(1) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_type` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `token`
--

INSERT INTO `token` (`id`, `expired`, `revoked`, `token`, `token_type`, `user_id`) VALUES
(1, b'1', b'1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4MTE0NjM1MSwiZXhwIjoxNjgxMTU3MTUxfQ.S4exWa5OutxhYr0THOZ7dErzSnfnIXlepMe2DkzDMmQ', 'BEARER', 2),
(2, b'0', b'0', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaWF0IjoxNjgxMTQ2NDExLCJleHAiOjE2ODExNTcyMTF9.7clV7Mry8fI-YRmM5dnXCEN4ZNoFkld_qfZlCUrlN60', 'BEARER', 1),
(3, b'1', b'1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4MTE0NjcwOSwiZXhwIjoxNjgxMTU3NTA5fQ.tIR6aacTe7KxtDgRc1uSKOTd3ACEJ287EcZAlHGbF7w', 'BEARER', 2),
(4, b'1', b'1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrb2xhcCIsImlhdCI6MTY4MTE0Njg2NSwiZXhwIjoxNjgxMTU3NjY1fQ.uhtxNQFiKxsXPEtwQLDq3LzPt_Zw3ZZyX43UzeDrDPc', 'BEARER', 4),
(5, b'1', b'1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4MTE0NzA4MywiZXhwIjoxNjgxMTU3ODgzfQ.kzf2XZp9GcaEmiEdUXFmUuPrelXEoWFdxsPhghDvpUU', 'BEARER', 2),
(6, b'1', b'1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMiIsImlhdCI6MTY4MTE0NzI4OCwiZXhwIjoxNjgxMTU4MDg4fQ.GYL5i0Vb-PruOv8l5KkyQ28Vj-Ufl-iuaV0Aiw18NFo', 'BEARER', 5),
(7, b'1', b'1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4MTE0NzQ5OSwiZXhwIjoxNjgxMTU4Mjk5fQ._UKfAGT4WfuBjeTNGkgA6-0oekigKjhuHJ7896hOi1Y', 'BEARER', 2),
(8, b'1', b'1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrb2xhcDE2IiwiaWF0IjoxNjgxMTQ3NzQzLCJleHAiOjE2ODExNTg1NDN9.fvYAnSPJAaBRqwYOeXTM4f0fO2uzjTWMNsLCJaxMAB8', 'BEARER', 6),
(9, b'1', b'1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4MTE0NzkzOCwiZXhwIjoxNjgxMTU4NzM4fQ.TwKCxyqxajo3zmxiAsQZZ7mq8p9zn9_W37foZAIaJEU', 'BEARER', 2),
(10, b'1', b'1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrb2xhcDE2IiwiaWF0IjoxNjgxMTQ4MzA3LCJleHAiOjE2ODExNTkxMDd9.KZFGqcUyvzXcV5XML6EOdliwYQnqyyYO0-4qq2dUTbg', 'BEARER', 6),
(11, b'1', b'1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4MTE0ODU1NiwiZXhwIjoxNjgxMTU5MzU2fQ.mwxM87YGGk-hI1aI2AiMy-HnMvXoZ4IZxVOJfW59V3Q', 'BEARER', 2),
(12, b'1', b'1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrb2xhcDE2IiwiaWF0IjoxNjgxMTQ4NjQ3LCJleHAiOjE2ODExNTk0NDd9.iQKCblVTb7O6Q-SB8OAi8sMTB7LZsQ5F0lmlG7LXU7U', 'BEARER', 6),
(13, b'1', b'1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4MTE0ODY2OSwiZXhwIjoxNjgxMTU5NDY5fQ.V56abVGJJzJyf-2ftR8mLLG55cyFnqZUbyYyRVC_nmU', 'BEARER', 2),
(14, b'0', b'0', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrb2xhcDE2IiwiaWF0IjoxNjgxMTQ4Nzk3LCJleHAiOjE2ODExNTk1OTd9.hWeRW_mGTAJLtEeaGJ49M1ke3nPw8Q9QqGeSo4Aug34', 'BEARER', 6);

-- --------------------------------------------------------

--
-- 資料表結構 `token_seq`
--

CREATE TABLE `token_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `token_seq`
--

INSERT INTO `token_seq` (`next_val`) VALUES
(101);

-- --------------------------------------------------------

--
-- 資料表結構 `user_events`
--

CREATE TABLE `user_events` (
  `user_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `user_events`
--

INSERT INTO `user_events` (`user_id`, `event_id`) VALUES
(6, 6);

-- --------------------------------------------------------

--
-- 資料表結構 `user_groups`
--

CREATE TABLE `user_groups` (
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `user_groups`
--

INSERT INTO `user_groups` (`user_id`, `group_id`) VALUES
(1, 1),
(4, 1),
(5, 2),
(6, 2);

-- --------------------------------------------------------

--
-- 資料表結構 `_event`
--

CREATE TABLE `_event` (
  `id` int(11) NOT NULL,
  `is_active` bit(1) NOT NULL,
  `end` datetime DEFAULT NULL,
  `is_editable` bit(1) NOT NULL,
  `start` datetime DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `_event`
--

INSERT INTO `_event` (`id`, `is_active`, `end`, `is_editable`, `start`, `title`) VALUES
(6, b'1', '2023-04-14 23:59:59', b'0', '2023-04-11 00:00:00', 'Sick Leave');

-- --------------------------------------------------------

--
-- 資料表結構 `_form`
--

CREATE TABLE `_form` (
  `id` int(11) NOT NULL,
  `approved_by_username` varchar(255) DEFAULT NULL,
  `approved_time` varchar(255) DEFAULT NULL,
  `cancelled_time` varchar(255) DEFAULT NULL,
  `case_date` varchar(255) DEFAULT NULL,
  `close_result` varchar(255) DEFAULT NULL,
  `form_code` varchar(255) DEFAULT NULL,
  `form_name` varchar(255) DEFAULT NULL,
  `form_status` varchar(255) DEFAULT NULL,
  `leave_end_date` varchar(255) DEFAULT NULL,
  `leave_reason` varchar(255) DEFAULT NULL,
  `leave_start_date` varchar(255) DEFAULT NULL,
  `pcr_result` varchar(255) DEFAULT NULL,
  `photos` varchar(64) DEFAULT NULL,
  `rat_result` varchar(255) DEFAULT NULL,
  `rat_test_date` varchar(255) DEFAULT NULL,
  `reject_reason` varchar(255) DEFAULT NULL,
  `rejected_by_username` varchar(255) DEFAULT NULL,
  `rejected_time` varchar(255) DEFAULT NULL,
  `submitted_by_username` varchar(255) DEFAULT NULL,
  `submitted_time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `_form`
--

INSERT INTO `_form` (`id`, `approved_by_username`, `approved_time`, `cancelled_time`, `case_date`, `close_result`, `form_code`, `form_name`, `form_status`, `leave_end_date`, `leave_reason`, `leave_start_date`, `pcr_result`, `photos`, `rat_result`, `rat_test_date`, `reject_reason`, `rejected_by_username`, `rejected_time`, `submitted_by_username`, `submitted_time`) VALUES
(1, NULL, NULL, NULL, NULL, NULL, 'RAT', 'Rapid Antigen Test Form', 'PENDING', NULL, NULL, NULL, NULL, 'form/RAT/1/Rat.jpg', 'Positive', '11-04-2023', NULL, NULL, NULL, 'kolap', '11-04-2023'),
(2, NULL, NULL, NULL, '11-04-2023', 'Positive', 'POCL', 'Positive Close Contact Form', 'PENDING', NULL, NULL, NULL, 'Positive', 'form/POCL/2/medical.jpg', NULL, NULL, NULL, NULL, NULL, 'kolap', '11-04-2023'),
(3, NULL, NULL, NULL, NULL, NULL, 'SL', 'Sick Leave Request Form', 'PENDING', '14-04-2023', 'confirmed', '11-04-2023', NULL, 'form/SL/3/medical.jpg', NULL, NULL, NULL, NULL, NULL, 'kolap', '11-04-2023'),
(4, NULL, NULL, NULL, NULL, NULL, 'RAT', 'Rapid Antigen Test Form', 'PENDING', NULL, NULL, NULL, NULL, 'form/RAT/4/Rat.jpg', 'Positive', '11-04-2023', NULL, NULL, NULL, 'user2', '11-04-2023'),
(5, NULL, NULL, NULL, '11-04-2023', 'Positive', 'POCL', 'Positive Close Contact Form', 'PENDING', NULL, NULL, NULL, 'Positive', 'form/POCL/5/medical.jpg', NULL, NULL, NULL, NULL, NULL, 'user2', '11-04-2023'),
(6, NULL, NULL, NULL, NULL, NULL, 'SL', 'Sick Leave Request Form', 'PENDING', '14-04-2023', 'confirmed', '11-04-2023', NULL, 'form/SL/6/medical.jpg', NULL, NULL, NULL, NULL, NULL, 'user2', '11-04-2023'),
(7, 'admin', '11-04-2023', NULL, NULL, NULL, 'RAT', 'Rapid Antigen Test Form', 'APPROVED', NULL, NULL, NULL, NULL, 'form/RAT/7/Rat.jpg', 'Positive', '11-04-2023', NULL, NULL, NULL, 'kolap16', '11-04-2023'),
(8, NULL, NULL, NULL, '11-04-2023', 'Positive', 'POCL', 'Positive Close Contact Form', 'PENDING', NULL, NULL, NULL, 'Positive', 'form/POCL/8/medical.jpg', NULL, NULL, NULL, NULL, NULL, 'kolap16', '11-04-2023'),
(9, 'admin', '11-04-2023', NULL, NULL, NULL, 'SL', 'Sick Leave Request Form', 'APPROVED', '14-04-2023', 'confirmed', '11-04-2023', NULL, 'form/SL/9/medical.jpg', NULL, NULL, NULL, NULL, NULL, 'kolap16', '11-04-2023'),
(10, 'admin', '11-04-2023', NULL, NULL, NULL, 'SL', 'Sick Leave Request Form', 'APPROVED', '14-04-2023', 'confirmed', '12-04-2023', NULL, 'form/SL/10/covid19-record.jpg', NULL, NULL, NULL, NULL, NULL, 'kolap16', '11-04-2023'),
(11, 'admin', '11-04-2023', NULL, NULL, NULL, 'SL', 'Sick Leave Request Form', 'APPROVED', '14-04-2023', 'confirmed', '11-04-2023', NULL, 'form/SL/11/medical.jpg', NULL, NULL, NULL, NULL, NULL, 'kolap16', '11-04-2023');

-- --------------------------------------------------------

--
-- 資料表結構 `_group`
--

CREATE TABLE `_group` (
  `id` int(11) NOT NULL,
  `is_active` bit(1) NOT NULL,
  `member_number` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `_group`
--

INSERT INTO `_group` (`id`, `is_active`, `member_number`, `name`) VALUES
(1, b'0', 2, 'Chess Club'),
(2, b'1', 2, 'Debating Club');

-- --------------------------------------------------------

--
-- 資料表結構 `_user`
--

CREATE TABLE `_user` (
  `id` int(11) NOT NULL,
  `class_name` varchar(255) DEFAULT NULL,
  `class_role` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `emergency_email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `is_positive` bit(1) NOT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `vaccinated_dose` int(11) DEFAULT NULL,
  `vaccination_record` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `_user`
--

INSERT INTO `_user` (`id`, `class_name`, `class_role`, `email`, `emergency_email`, `firstname`, `is_positive`, `lastname`, `mobile`, `password`, `role`, `username`, `vaccinated_dose`, `vaccination_record`) VALUES
(1, '1A', 'TEACHER', 'noahkolawong@gmail.com', 'noahkolawong@gmail.com', 'Tester', b'0', 'Teacher', '95382899', '$2a$10$kd.omw64NzN7cgOxJeDZMOVibLn.lort6MwH4XCk1Um4Rz1XKJ0FO', 'ADMIN', 'user', 2, '/user/1/covid19-record.jpg'),
(2, '1A', 'TEACHER', 'kolawong@hotmail.com', 'kolawong@hotmail.com', 'Tester', b'0', 'Teacher2', '95382899', '$2a$10$DqEuwpEkFwz8l4ZzCnsZiu0tl8R4UWLROTeIqtQi8LbqkWEXNyOAa', 'ADMIN', 'admin', NULL, NULL),
(3, '2D', 'STUDENT', 'noahkolawong@gmail.com', 'noahkolawong@gmail.com', 'noa', b'0', 'noa', '95382899', '$2a$10$X10h5yBfotOWyupSyJ.MleHIXxLeHxTzAQakQDJzox8RqI.8c9kD6', 'USER', 'noa', 0, NULL),
(4, '1C', 'STUDENT', 'kolawong@hotmail.com', 'kolawong@hotmail.com', 'noa', b'0', 'noa', '95382899', '$2a$10$WZZtPGGClA4RI47j0pGOjOyy7BFk4tkwCmAp5xEZIZuvm5whh8KGC', 'USER', 'kolap', 3, '/user/4/covid19-record.jpg'),
(5, '3C', 'STUDENT', 'kolawong@hotmail.com', 'kolawong@hotmail.com', 'Noah', b'0', 'Wong', '95382899', '$2a$10$R8/Ho0wlhaAxQQYiyah.zuJs3OBvWCt28BQU7TATsMNd7tADB/Nmy', 'USER', 'user2', 3, '/user/5/covid19-record.jpg'),
(6, '2B', 'TEACHER', 'noahkolawong@gmail.com', 'noahkolawong@gmail.com', 'Kola', b'1', 'Wong', '95288989', '$2a$10$fuAB61f7gow34FQBc6pyZupCda5FThiOylzi0hlFb6W67EDgdPtEW', 'ADMIN', 'kolap16', 3, '/user/6/covid19-record.jpg');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_pddrhgwxnms2aceeku9s2ewy5` (`token`),
  ADD KEY `FKiblu4cjwvyntq3ugo31klp1c6` (`user_id`);

--
-- 資料表索引 `user_events`
--
ALTER TABLE `user_events`
  ADD PRIMARY KEY (`user_id`,`event_id`),
  ADD KEY `FKm8ras6a6l4enw4hylxiujb9po` (`event_id`);

--
-- 資料表索引 `user_groups`
--
ALTER TABLE `user_groups`
  ADD PRIMARY KEY (`user_id`,`group_id`),
  ADD KEY `FKcfo6r1m5fjaeaf78txruhh6qu` (`group_id`);

--
-- 資料表索引 `_event`
--
ALTER TABLE `_event`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `_form`
--
ALTER TABLE `_form`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `_group`
--
ALTER TABLE `_group`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `_user`
--
ALTER TABLE `_user`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `_event`
--
ALTER TABLE `_event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `_form`
--
ALTER TABLE `_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `_group`
--
ALTER TABLE `_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `_user`
--
ALTER TABLE `_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `FKiblu4cjwvyntq3ugo31klp1c6` FOREIGN KEY (`user_id`) REFERENCES `_user` (`id`);

--
-- 資料表的限制式 `user_events`
--
ALTER TABLE `user_events`
  ADD CONSTRAINT `FKm8ras6a6l4enw4hylxiujb9po` FOREIGN KEY (`event_id`) REFERENCES `_event` (`id`),
  ADD CONSTRAINT `FKqi6yvjite8wl3remvvujn6sux` FOREIGN KEY (`user_id`) REFERENCES `_user` (`id`);

--
-- 資料表的限制式 `user_groups`
--
ALTER TABLE `user_groups`
  ADD CONSTRAINT `FKcfo6r1m5fjaeaf78txruhh6qu` FOREIGN KEY (`group_id`) REFERENCES `_group` (`id`),
  ADD CONSTRAINT `FKskk0ubmt29ldujvpbi49sjwrx` FOREIGN KEY (`user_id`) REFERENCES `_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

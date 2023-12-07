-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2023 at 11:33 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library_managment_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

CREATE TABLE `author` (
  `author_id` int(11) NOT NULL,
  `author_first_name` varchar(50) NOT NULL,
  `author_middle_name` varchar(50) DEFAULT NULL,
  `author_last_name` varchar(50) NOT NULL,
  `specialization` varchar(50) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`author_id`, `author_first_name`, `author_middle_name`, `author_last_name`, `specialization`, `is_deleted`) VALUES
(1, 'Robert ', NULL, 'Greene', 'psychology', 0),
(2, 'Sean', 'N/A', 'Covey', 'Personal development', 0),
(3, 'James', NULL, 'Clear', 'productivity', 0),
(4, 'Eckhart', NULL, 'Tolle', 'Spirituality', 0),
(5, 'Dale', '', 'Carnegie', NULL, 0),
(6, 'Spencer', '', 'Johnson', 'Business and management', 0),
(7, 'Robert', NULL, 'Johnson', 'Adventure Fiction', 0),
(8, 'Emily', NULL, ' Thompson', 'Fantasy Fiction', 0),
(9, 'Jennifer', NULL, 'Davis', 'Mystery Fiction', 0),
(10, 'Michael', NULL, 'Wilson', 'Fantasy Fiction', 0),
(11, 'Sarah', NULL, 'Anderson', 'Psychological Thriller', 0),
(12, 'David', NULL, ' Roberts', 'Romance Fiction', 0);

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `book_id` int(8) NOT NULL,
  `author_id` int(8) NOT NULL,
  `title` varchar(50) NOT NULL,
  `ISBN` varchar(13) NOT NULL,
  `language` varchar(3) NOT NULL,
  `publish_date` date NOT NULL,
  `no_of_copies` int(5) NOT NULL,
  `no_of_pages` int(5) NOT NULL,
  `book_description` varchar(10000) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `file_path` varchar(225) DEFAULT NULL,
  `pdf_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`book_id`, `author_id`, `title`, `ISBN`, `language`, `publish_date`, `no_of_copies`, `no_of_pages`, `book_description`, `is_deleted`, `file_path`, `pdf_path`) VALUES
(1, 1, '48 Laws of Power', '9780140280197', 'eng', '2020-09-01', 11, 452, '\"The 48 Laws of Power\" is a non-fiction book that focuses on understanding power and the ways in which it can be attained and maintained. The book presents 48 different laws or principles that are designed to help readers gain power and protect themselves from those who already possess it. The laws are based on historical examples and real-life situations and are meant to be applicable in both personal and professional contexts. The book has been widely read and debated, with some critics praising its insights while others have criticized its amoral tone and emphasis on manipulation.', 0, 'assets/books/The_48_Laws_of_Power.jfif', 'HowToWinFriendsandInfluencePeople.pdf'),
(2, 2, 'Atomic Habits', '9780735211292', 'eng', '2023-10-16', 8, 320, 'Atomic Habits by James Clear is a self-help book that focuses on the concept of creating good habits and breaking bad ones. The book offers practical strategies and techniques to help readers develop a better understanding of their habits, how they are formed, and how to make lasting changes. Clear presents a four-step process for creating atomic habits, which involves making small changes, building good habits, and breaking bad ones. With a clear and engaging writing style, Atomic Habits has become a popular book for anyone looking to make positive changes in their life.', 0, 'assets/books/Atomic_Habits.jpg', 'AtomicHabits.pdf\r\n'),
(7, 5, 'Deep Work', '9780671027032', 'eng', '1998-10-01', 1, 288, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 0, 'assets/books/Deep_Work.jpg', 'HowToWinFriendsandInfluencePeople.pdf'),
(8, 2, '7  Effective Habits', '9781476764665', 'eng', '2014-05-27', 3, 288, 'The 7 Habits of Highly Effective Teens is a self-help book written by Sean Covey, son of Stephen Covey. It is a guide to help teenagers navigate through life and develop good habits for success.', 0, 'assets/books/7_effective_Habits.png', 'ThePowerOfNow.pdf\r\n'),
(9, 4, 'The Power of Now', '9781577314806', 'eng', '2004-08-14', 3, 236, 'The Power of Now is a spiritual guidebook written by Eckhart Tolle, published in 1997. It teaches the reader to live in the present moment and find inner peace.', 0, 'assets/books/The_Power_of_Now.jfif', 'HowToWinFriendsandInfluencePeople.pdf'),
(10, 6, 'Who Moved My Cheese?', '9780091816971', 'eng', '1998-09-08', 6, 96, ' Who Moved My Cheese? is a motivational business fable written by Spencer Johnson, published in 1998. It describes a simple parable about change and how to adapt to it.', 0, 'assets/books/Who_Moved_My_Cheese.jpg', 'AtomicHabits.pdf'),
(11, 7, 'Great Escape', '9781234567', 'eng', '2022-05-15', 2, 320, 'Join the thrilling journey of a group of prisoners as they plan and execute a daring escape from a high-security prison. Will they succeed or face dire consequences?\r\n\r\nBook title: The Enchanted Garden', 0, 'assets/books/The_Great_Escape.jpg', 'ThePowerOfNow.pdf'),
(12, 8, 'Enchanted', '9782345678', 'eng', '2023-01-20', 6, 280, 'Immerse yourself in a world of magic and wonder as you explore the enchanting garden where mystical creatures dwell and secrets await discovery.\r\n', 0, 'assets/books/The_Enchanted_Garden.jpg', 'HowToWinFriendsandInfluencePeople.pdf'),
(13, 9, 'Midnight Secrets', '9783456789', 'eng', '2021-11-08', 0, 354, 'Unravel the dark secrets hidden beneath the cloak of midnight in this gripping tale of suspense, where nothing is as it seems and every twist leads to more questions.', 0, 'assets/books/The_Secret_of_Midnight.jpg', 'AtomicHabits.pdf'),
(14, 10, 'The Forgotten', '9784567890', 'eng', '2022-09-12', 5, 480, 'Venture into a realm of ancient magic and epic battles as you follow the journey of a young hero determined to uncover his forgotten past and save his world.', 0, 'assets/books/The_Forgotten_Realm.jpg', 'ThePowerOfNow.pdf'),
(15, 11, 'Lost Memories', '9785678901', 'eng', '2023-04-05', 0, 240, 'Dive into a gripping psychological thriller where a protagonist finds herself trapped in a web of deceit, trying to recover her lost memories before it\'s too late.', 0, 'assets/books/The_Lost_Memories.jpg', 'AtomicHabits.pdf'),
(16, 12, 'Starcrossed Lovers', '9786789012', 'eng', '2022-07-17', 4, 320, 'Experience a tale of love and sacrifice as two starcrossed lovers defy the odds', 0, 'assets/books/The_Starcrossed_Lovers.jpg', 'HowToWinFriendsandInfluencePeople.pdf'),
(17, 2, 'The Wager', '9780596002817', 'eng', '2023-11-15', 0, 210, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 0, 'assets/books/The_Wager.jpg', 'ThePowerOfNow.pdf'),
(18, 5, 'Army at Dawn', '9780132350884', 'eng', '2023-11-15', 12, 300, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 0, 'assets/books/Army_at_Dawn.jpg', 'HowToWinFriendsandInfluencePeople.pdf'),
(19, 8, '1776', '9780321601667', 'eng', '2023-11-15', 9, 365, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 0, 'assets/books/1776.jpg', 'AtomicHabits.pdf'),
(20, 12, 'Unbroken', '9780321601667', 'eng', '2023-11-15', 0, 220, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 0, 'assets/books/Unbroken.jpg', 'ThePowerOfNow.pdf'),
(21, 9, 'Say Nothing', '9781593279509', 'eng', '2023-11-16', 10, 317, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 0, 'assets/books/Say_Nothing.jpg', 'HowToWinFriendsandInfluencePeople.pdf'),
(23, 3, 'Atomic Habits', '9780735211292', 'eng', '2023-10-16', 12, 320, 'Atomic Habits by James Clear is a self-help book that focuses on the concept of creating good habits and breaking bad ones. The book offers practical strategies and techniques to help readers develop a better understanding of their habits, how they are formed, and how to make lasting changes. Clear presents a four-step process for creating atomic habits, which involves making small changes, building good habits, and breaking bad ones. With a clear and engaging writing style, Atomic Habits has become a popular book for anyone looking to make positive changes in their life.', 0, 'assets/books/Atomic_Habits.jpg', 'AtomicHabits.pdf\r\n'),
(24, 2, '7 Effective Habits', '9781476764665', 'eng', '2014-05-27', 2, 288, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 0, 'assets/books/The_7_Habits_of_Highly_Effective_Teens.jpg', 'ThePowerOfNow.pdf\r\n'),
(34, 3, 'War and Peace', '9780321601667', 'eng', '2023-12-21', 12, 200, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 0, 'assets/books/War_and_Peace.jpg', 'AtomicHabits.pdf'),
(45, 1, 'Icebreaker', '9781593279509', 'eng', '2023-12-19', 12, 250, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 0, 'assets/books/Icebreaker.jpg', 'HowToWinFriendsandInfluencePeople.pdf'),
(46, 2, 'Beach Read', '9781593279509', 'eng', '2023-12-19', 15, 260, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 0, 'assets/books/Beach_Read.jpg', 'ThePowerOfNow.pdf'),
(47, 3, 'Cold River', '9781593279509', 'eng', '2023-12-12', 13, 190, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 0, 'assets/books/Cold_River.jpg', 'AtomicHabits.pdf'),
(48, 4, 'The Notebook', '9780596002817', 'eng', '2023-12-03', 11, 250, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 0, 'assets/books/The_Notebook.jpg', 'HowToWinFriendsandInfluencePeople.pdf'),
(51, 8, 'Happy Place', '9781593279509', 'eng', '2023-12-05', 10, 222, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 0, 'assets/books/Happy_Place.jpg', 'ThePowerOfNow.pdf'),
(52, 9, 'Outlander', 'Outlander.jpg', 'eng', '2023-12-04', 10, 256, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 0, 'assets/books/outlander.jpg', 'AtomicHabits.pdf'),
(55, 12, 'Meditations', '9780596002817', 'eng', '2023-12-04', 5, 500, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 0, 'assets/books/Meditations.jpg', 'HowToWinFriendsandInfluencePeople.pdf'),
(56, 10, 'Old place', '9780596002817', 'eng', '2023-12-19', 12, 250, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare velit quis tortor varius, vitae sagittis odio sagittis. Nulla facilisi. Proin quis maximus eros. Sed placerat lacus id est eleifend interdum. Ut efficitur efficitur ante, eu tincidunt justo condimentum at. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 0, 'assets/books/Old_place.jpg', 'ThePowerOfNow.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `book_borrow`
--

CREATE TABLE `book_borrow` (
  `ID` int(8) NOT NULL,
  `borrow_id` int(8) NOT NULL,
  `book_id` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `book_borrow`
--

INSERT INTO `book_borrow` (`ID`, `borrow_id`, `book_id`) VALUES
(156, 51, 7),
(157, 51, 13),
(158, 52, 7),
(159, 52, 15),
(160, 53, 16),
(161, 53, 11),
(166, 56, 12),
(167, 56, 16),
(173, 54, 1),
(174, 54, 7),
(175, 55, 8),
(176, 57, 11),
(177, 57, 14),
(178, 58, 8),
(179, 58, 11),
(180, 58, 15);

-- --------------------------------------------------------

--
-- Table structure for table `book_x_genre`
--

CREATE TABLE `book_x_genre` (
  `ID` int(8) NOT NULL,
  `book_id` int(8) NOT NULL,
  `genre_id` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `book_x_genre`
--

INSERT INTO `book_x_genre` (`ID`, `book_id`, `genre_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 7, 1),
(4, 8, 1),
(5, 9, 1),
(7, 11, 3),
(8, 12, 3),
(9, 13, 3),
(10, 14, 3),
(11, 15, 3),
(12, 16, 3),
(13, 15, 1),
(14, 17, 4),
(15, 18, 4),
(16, 19, 4),
(17, 20, 4),
(18, 21, 4),
(34, 34, 4),
(39, 45, 9),
(40, 46, 9),
(41, 47, 9),
(42, 48, 9),
(43, 51, 9),
(44, 52, 9),
(45, 56, 3),
(46, 55, 1);

-- --------------------------------------------------------

--
-- Table structure for table `book_x_publisher`
--

CREATE TABLE `book_x_publisher` (
  `ID` int(8) NOT NULL,
  `book_id` int(8) NOT NULL,
  `publisher_id` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `book_x_publisher`
--

INSERT INTO `book_x_publisher` (`ID`, `book_id`, `publisher_id`) VALUES
(1, 1, 1),
(2, 14, 1),
(63, 7, 2),
(64, 2, 3),
(65, 8, 3),
(66, 9, 2),
(68, 10, 1),
(69, 11, 2),
(70, 12, 3),
(71, 13, 1),
(72, 14, 2),
(73, 15, 3),
(74, 16, 1),
(75, 17, 2),
(76, 18, 3),
(77, 19, 1),
(78, 20, 3),
(79, 20, 3),
(80, 21, 1),
(88, 48, 2),
(89, 55, 2),
(90, 56, 3),
(91, 34, 1),
(92, 45, 1),
(93, 46, 2),
(94, 47, 2),
(95, 51, 3),
(96, 52, 2);

-- --------------------------------------------------------

--
-- Table structure for table `borrow`
--

CREATE TABLE `borrow` (
  `borrow_id` int(11) NOT NULL,
  `borrower_id` int(11) NOT NULL,
  `librarian_id` int(11) DEFAULT NULL,
  `borrow_date` date NOT NULL,
  `due_date` date DEFAULT NULL,
  `status` enum('online_reservation','borrowed','returned','overdue','renewd','cancelled','lost','damaged') NOT NULL,
  `details` varchar(10000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `borrow`
--

INSERT INTO `borrow` (`borrow_id`, `borrower_id`, `librarian_id`, `borrow_date`, `due_date`, `status`, `details`) VALUES
(51, 47, 42, '2023-12-11', '0000-00-00', 'borrowed', ''),
(52, 48, 42, '2023-12-07', '2023-12-21', 'borrowed', ''),
(53, 49, NULL, '2023-12-08', NULL, 'online_reservation', NULL),
(54, 50, 42, '2023-11-03', '2023-11-17', 'borrowed', ''),
(55, 51, 42, '2023-11-06', '2023-12-20', 'returned', ''),
(56, 52, 42, '2023-11-07', '2023-12-21', 'borrowed', ''),
(57, 51, 42, '2023-12-20', NULL, 'online_reservation', ''),
(58, 42, NULL, '2023-12-11', NULL, 'online_reservation', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE `genre` (
  `genre_id` int(8) NOT NULL,
  `genre_name` varchar(50) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`genre_id`, `genre_name`, `is_deleted`) VALUES
(1, 'Self_Help', 0),
(2, 'Psychology', 0),
(3, 'Fiction', 0),
(4, 'History', 0),
(9, 'Romance', 0);

-- --------------------------------------------------------

--
-- Table structure for table `publisher`
--

CREATE TABLE `publisher` (
  `publisher_id` int(8) NOT NULL,
  `publisher_first_name` varchar(50) NOT NULL,
  `publisher_last_name` varchar(50) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `publisher`
--

INSERT INTO `publisher` (`publisher_id`, `publisher_first_name`, `publisher_last_name`, `is_deleted`) VALUES
(1, ' Viking', 'Press', 0),
(2, 'David', 'Brown', 0),
(3, 'Mary', 'Johnson', 0);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` int(8) NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `max_borrow` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `role_name`, `max_borrow`) VALUES
(1, 'admin', 6),
(2, 'librarian', 4),
(3, 'user', 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(8) NOT NULL,
  `library_id` varchar(10) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role_id` int(8) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `library_id`, `password`, `role_id`, `is_deleted`) VALUES
(42, '8204469813', '$2b$10$42Oh7uciXCxeMkCsmgp58eOYllc1wZYJZkWggbTAiFncDbRAc/3cm', 1, 0),
(43, '2180976745', '$2b$10$GuLJmEK.WUos9pLm3gEkGegGrhq5gcNR11hoiWtqC6jrhNgLOr5M.', 1, 0),
(44, '6744389998', '$2b$10$38rpTvoUwRBdRUKasFByvu7o//maHAaKEJkuYkxTmxOq09lcebbKq', 2, 0),
(45, '8323314174', '$2b$10$AMnJ.IjD7XpUKAJKhGG0VOokd/Bv4fcuj.IOhT5SGiLcLRYprAs3C', 2, 0),
(46, '8542318283', '$2b$10$CR3MC2V3lZir/KFn7Ot98umTwYQwETFgBGytyyXelipO9EkUGMSAe', 2, 0),
(47, '1679118677', '$2b$10$DqMgUfZbZT8IiDljhFdzLOjHLn4MZQwlP6rE66juL83bCi0cHjf0.', 3, 0),
(48, '2678587029', '$2b$10$fwFX8qXaEtQa/LOnDPKcYuzhtZ2RydO75EiQKihscBA386Pmok2cS', 3, 0),
(49, '6466420472', '$2b$10$0UK4aK3SE8vFZ7TC1Wf/ie0.F2nOBTUXBkMYD.D5xmVJu1MpOfy3i', 3, 0),
(50, '2625846989', '$2b$10$q1SLUipD4PBYIDwyJsZ2DOhbrDtNuGfZAHbm5IaNtIVylgbSnItc6', 3, 0),
(51, '2988743582', '$2b$10$V8Bg2I0E1a.dYatTxVuI3e.1QNTwyAsyWsp5pcDOUApbWpjc2/x3i', 3, 0),
(52, '4749401442', '$2b$10$zAnQVGKjX2wDcMMN2AiAHeqWO7nkGGcZh2HA9Tgf/N9v732tpWA1G', 3, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`author_id`);

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`book_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `book_borrow`
--
ALTER TABLE `book_borrow`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `borrow_id` (`borrow_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indexes for table `book_x_genre`
--
ALTER TABLE `book_x_genre`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Indexes for table `book_x_publisher`
--
ALTER TABLE `book_x_publisher`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `publisher_id` (`publisher_id`);

--
-- Indexes for table `borrow`
--
ALTER TABLE `borrow`
  ADD PRIMARY KEY (`borrow_id`),
  ADD KEY `borrower_id` (`borrower_id`),
  ADD KEY `librarian_id` (`librarian_id`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`genre_id`);

--
-- Indexes for table `publisher`
--
ALTER TABLE `publisher`
  ADD PRIMARY KEY (`publisher_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `library_id` (`library_id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `author`
--
ALTER TABLE `author`
  MODIFY `author_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `book_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `book_borrow`
--
ALTER TABLE `book_borrow`
  MODIFY `ID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT for table `book_x_genre`
--
ALTER TABLE `book_x_genre`
  MODIFY `ID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `book_x_publisher`
--
ALTER TABLE `book_x_publisher`
  MODIFY `ID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `borrow`
--
ALTER TABLE `borrow`
  MODIFY `borrow_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `genre_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `publisher`
--
ALTER TABLE `publisher`
  MODIFY `publisher_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `book_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `author` (`author_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `book_borrow`
--
ALTER TABLE `book_borrow`
  ADD CONSTRAINT `book_borrow_ibfk_1` FOREIGN KEY (`borrow_id`) REFERENCES `borrow` (`borrow_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `book_borrow_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `book_x_genre`
--
ALTER TABLE `book_x_genre`
  ADD CONSTRAINT `book_x_genre_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `book_x_genre_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `book_x_publisher`
--
ALTER TABLE `book_x_publisher`
  ADD CONSTRAINT `book_x_publisher_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `book_x_publisher_ibfk_2` FOREIGN KEY (`publisher_id`) REFERENCES `publisher` (`publisher_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `borrow`
--
ALTER TABLE `borrow`
  ADD CONSTRAINT `borrow_ibfk_1` FOREIGN KEY (`borrower_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `borrow_ibfk_2` FOREIGN KEY (`librarian_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

CREATE DATABASE `news` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
CREATE TABLE `news` (
  `id` varchar(11) COLLATE utf8_bin NOT NULL,
  `order` double NOT NULL,
  `title` varchar(200) COLLATE utf8_bin NOT NULL,
  `jsonstr` json DEFAULT NULL,
  `createdAt` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `updatedAt` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `insertTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE DATABASE car;
use car;

DROP TABLE IF EXISTS `Order`;

CREATE TABLE `Order` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `currentTime` VARCHAR(255),
    `fullName` VARCHAR(255),
    `mobileNumber` VARCHAR(255),
    `email` VARCHAR(255),
    `carName` VARCHAR(255),
    `carImg` VARCHAR(255),
    `pickupDate` VARCHAR(255),
    `returnDate` VARCHAR(255),
    `qty` INT,
    `subtotal` VARCHAR(255),
    `status` VARCHAR(255) DEFAULT 'unconfirmed'
);
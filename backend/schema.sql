-- Create Database
CREATE DATABASE IF NOT EXISTS cultural_events_db;
USE cultural_events_db;

-- -----------------------------------------------------
-- Table `Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `role` ENUM('student', 'admin') DEFAULT 'student',
  `password` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- -----------------------------------------------------
-- Table `Events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Events` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `category` ENUM('Dance', 'Music', 'Drama') NOT NULL,
  `date` DATETIME NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `totalSeats` INT NOT NULL,
  `availableSeats` INT NOT NULL,
  `rules` TEXT,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- -----------------------------------------------------
-- Table `Bookings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Bookings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` ENUM('confirmed', 'cancelled') DEFAULT 'confirmed',
  `bookingDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` INT NOT NULL,
  `eventId` INT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`eventId`) REFERENCES `Events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE INDEX `unique_user_event_booking` (`userId`, `eventId`)
);

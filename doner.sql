SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `doner` ;
CREATE SCHEMA IF NOT EXISTS `doner` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `doner` ;

-- -----------------------------------------------------
-- Table `doner`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `doner`.`users` ;

CREATE TABLE IF NOT EXISTS `doner`.`users` (
  `id` INT NOT NULL,
  `email` VARCHAR(45) NULL,
  `token` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `doner`.`dones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `doner`.`dones` ;

CREATE TABLE IF NOT EXISTS `doner`.`dones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `text` TEXT NULL,
  `status` TINYINT(1) NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_dones_users_idx` (`user_id` ASC),
  CONSTRAINT `fk_dones_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `doner`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `doner`.`tags`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `doner`.`tags` ;

CREATE TABLE IF NOT EXISTS `doner`.`tags` (
  `id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_name` USING BTREE (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `doner`.`dones_tags`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `doner`.`dones_tags` ;

CREATE TABLE IF NOT EXISTS `doner`.`dones_tags` (
  `dones_id` INT NOT NULL,
  `tags_id` INT NOT NULL,
  PRIMARY KEY (`dones_id`, `tags_id`),
  INDEX `fk_dones_tags_tags_idx` (`tags_id` ASC),
  CONSTRAINT `fk_dones_tags_dones`
    FOREIGN KEY (`dones_id`)
    REFERENCES `doner`.`dones` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_dones_tags_tags`
    FOREIGN KEY (`tags_id`)
    REFERENCES `doner`.`tags` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `doner`.`users`
-- -----------------------------------------------------
START TRANSACTION;
USE `doner`;
INSERT INTO `doner`.`users` (`id`, `email`, `token`, `name`) VALUES (1, 'dream@t-com.me', 'auto-mata-2015', 'Auto Mata');

COMMIT;


-- -----------------------------------------------------
-- Data for table `doner`.`dones`
-- -----------------------------------------------------
START TRANSACTION;
USE `doner`;
INSERT INTO `doner`.`dones` (`id`, `user_id`, `text`, `status`, `created_at`, `updated_at`) VALUES (1, 1, 'Design DB for Doner', 1, '2015-06-18 00:10:00', NULL);
INSERT INTO `doner`.`dones` (`id`, `user_id`, `text`, `status`, `created_at`, `updated_at`) VALUES (2, 1, 'Create API framework for Doner', 1, '2015-06-18 00:10:00', NULL);
INSERT INTO `doner`.`dones` (`id`, `user_id`, `text`, `status`, `created_at`, `updated_at`) VALUES (3, 1, 'Start building the UI with React.js', 0, '2015-06-20 00:10:00', NULL);

COMMIT;


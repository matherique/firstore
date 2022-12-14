-- MySQL dump 10.13  Distrib 8.0.30, for Linux (aarch64)
--
-- Host: localhost    Database: firstore
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Product_name_key` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES ('1d7c0e985c9246b1bce13a364f1e5de5','Chocolate',10,'2022-12-14 18:13:00.612','2022-12-14 18:13:00.612'),('clb8oarvg000s25jj20t91dk5','Bacardi Limon',30,'2022-12-04 01:16:34.588','2022-12-14 09:27:16.733'),('clb8oarvy000z25jjj1m5vzez','Banana',10,'2022-12-04 01:16:34.607','2022-12-06 22:53:33.227'),('clb8oarw4001325jj140ar02m','Onions - Vidalia',20,'2022-12-04 01:16:34.613','2022-12-04 01:16:34.613'),('clb8oarwi001925jjnr3vnjoj','Wine - Bouchard La Vignee Pinot',11,'2022-12-04 01:16:34.626','2022-12-04 01:16:34.626'),('clb8oarwn001d25jjelo0orka','Lettuce - Escarole',13,'2022-12-04 01:16:34.631','2022-12-04 01:16:34.631'),('clb8oarwu001g25jj9bq5aiew','Salmon - Atlantic, Skin On',12,'2022-12-04 01:16:34.638','2022-12-04 01:16:34.638'),('clb8oarwz001j25jj45sdlrfo','Bread - Rosemary Focaccia',14,'2022-12-04 01:16:34.643','2022-12-04 01:16:34.643'),('clb8oary4002825jj7tkgnfpd','Broom And Broom Rack White',18,'2022-12-04 01:16:34.684','2022-12-04 01:16:34.684'),('clb8oary9002c25jjauc06gsm','Celery Root',17,'2022-12-04 01:16:34.690','2022-12-04 01:16:34.690'),('clb8oarye002g25jj6pfqok1a','Shrimp, Dried, Small / Lb',13,'2022-12-04 01:16:34.695','2022-12-04 01:16:34.695'),('clb8oaryl002k25jj62k0lnji','Kolrabi',19,'2022-12-04 01:16:34.701','2022-12-04 01:16:34.701'),('clb8oaryq002n25jjf107ou7u','Salmon - Atlantic, No Skin',19,'2022-12-04 01:16:34.707','2022-12-04 01:16:34.707'),('clb8oaryx002q25jjai89ssq3','Dikon',16,'2022-12-04 01:16:34.713','2022-12-04 01:16:34.713'),('clb8oarz2002u25jj8fr6ehvk','Bandage - Finger Cots',18,'2022-12-04 01:16:34.719','2022-12-04 01:16:34.719'),('clb8oarz9002x25jjjpsc4njv','Samosa - Veg',12,'2022-12-04 01:16:34.725','2022-12-04 01:16:34.725'),('clb8oarzf003125jj5d54jl4e','Beef',17,'2022-12-04 01:16:34.732','2022-12-13 19:17:59.295'),('clb8oarzr003725jj61yd6clm','Kellogs Raisan Bran Bars',17,'2022-12-04 01:16:34.744','2022-12-04 01:16:34.744'),('clb8oarzw003b25jjpvb6wr2l','Juice - Lemon',17,'2022-12-04 01:16:34.749','2022-12-04 01:16:34.749'),('clb8oas01003e25jj2k0x2ako','Beans - Navy, Dry',13,'2022-12-04 01:16:34.754','2022-12-04 01:16:34.754'),('clb8oas07003h25jjldnsehun','Basil - Fresh',17,'2022-12-04 01:16:34.759','2022-12-04 01:16:34.759'),('clb8oas0c003k25jje6ersqk5','Beer',20,'2022-12-04 01:16:34.764','2022-12-14 09:25:04.377');
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Stock`
--

DROP TABLE IF EXISTS `Stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Stock` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Stock_productId_idx` (`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Stock`
--

LOCK TABLES `Stock` WRITE;
/*!40000 ALTER TABLE `Stock` DISABLE KEYS */;
INSERT INTO `Stock` VALUES ('45db39e2a3f5473ba63747de58102502',200,'2022-12-14 18:13:16.393','2022-12-14 18:13:16.393','1d7c0e985c9246b1bce13a364f1e5de5'),('670f6387fcc34d4fae637547c531e27a',100,'2022-12-14 14:10:03.536','2022-12-14 14:10:03.536','clb8oary4002825jj7tkgnfpd'),('8fbc77ea3f56423b9c06da5559adf356',-60,'2022-12-14 14:01:36.668','2022-12-14 14:01:36.668','clb8oarz2002u25jj8fr6ehvk'),('b67b3025e21549829c95d5ecff2c2f9e',-70,'2022-12-14 18:12:26.148','2022-12-14 18:12:26.148','clb8oas0c003k25jje6ersqk5'),('clb8oarvn000v25jjjqejraq2',100,'2022-12-04 01:16:34.595','2022-12-04 01:16:34.595','clb8oarvg000s25jj20t91dk5'),('clb8oarvv000y25jj4b2456ed',100,'2022-12-04 01:16:34.603','2022-12-04 01:16:34.603','clb8oarvs000w25jj65ccwmww'),('clb8oarw1001225jj11yane6b',100,'2022-12-04 01:16:34.609','2022-12-04 01:16:34.609','clb8oarvy000z25jjj1m5vzez'),('clb8oarw8001525jjllpb3zml',100,'2022-12-04 01:16:34.617','2022-12-04 01:16:34.617','clb8oarw4001325jj140ar02m'),('clb8oarwe001825jj53gk5v5q',100,'2022-12-04 01:16:34.622','2022-12-04 01:16:34.622','clb8oarwb001625jjwll5g228'),('clb8oarwk001c25jjv47pdnhz',100,'2022-12-04 01:16:34.629','2022-12-04 01:16:34.629','clb8oarwi001925jjnr3vnjoj'),('clb8oarwr001f25jjov8qwn71',100,'2022-12-04 01:16:34.636','2022-12-04 01:16:34.636','clb8oarwn001d25jjelo0orka'),('clb8oarwx001i25jjk5u2osc6',100,'2022-12-04 01:16:34.641','2022-12-04 01:16:34.641','clb8oarwu001g25jj9bq5aiew'),('clb8oarx2001l25jj7ui4ek72',100,'2022-12-04 01:16:34.646','2022-12-04 01:16:34.646','clb8oarwz001j25jj45sdlrfo'),('clb8oarx8001p25jjdn002bsm',100,'2022-12-04 01:16:34.653','2022-12-04 01:16:34.653','clb8oarx6001m25jjgzr3mwy1'),('clb8oarxe001t25jj5o9b3d61',100,'2022-12-04 01:16:34.659','2022-12-04 01:16:34.659','clb8oarxb001q25jjnihq5myb'),('clb8oarxk001w25jjao994ayc',100,'2022-12-04 01:16:34.664','2022-12-04 01:16:34.664','clb8oarxh001u25jj37znhj9x'),('clb8oarxp002025jjb178oxek',100,'2022-12-04 01:16:34.669','2022-12-04 01:16:34.669','clb8oarxm001x25jjd7jhze9w'),('clb8oarxv002325jjwaza1plc',100,'2022-12-04 01:16:34.675','2022-12-04 01:16:34.675','clb8oarxt002125jjtbwot7xu'),('clb8oary1002725jjzd9c28mv',100,'2022-12-04 01:16:34.682','2022-12-04 01:16:34.682','clb8oarxy002425jj5t8gmtfb'),('clb8oary7002b25jjk0ez43tw',100,'2022-12-04 01:16:34.687','2022-12-04 01:16:34.687','clb8oary4002825jj7tkgnfpd'),('clb8oaryc002f25jjhsy75l2s',100,'2022-12-04 01:16:34.692','2022-12-04 01:16:34.692','clb8oary9002c25jjauc06gsm'),('clb8oaryi002j25jjwv7oq16a',100,'2022-12-04 01:16:34.699','2022-12-04 01:16:34.699','clb8oarye002g25jj6pfqok1a'),('clb8oaryo002m25jj3bw931ak',100,'2022-12-04 01:16:34.704','2022-12-04 01:16:34.704','clb8oaryl002k25jj62k0lnji'),('clb8oaryt002p25jjdr8vcwzh',100,'2022-12-04 01:16:34.709','2022-12-04 01:16:34.709','clb8oaryq002n25jjf107ou7u'),('clb8oaryz002t25jj8v5578wg',100,'2022-12-04 01:16:34.716','2022-12-04 01:16:34.716','clb8oaryx002q25jjai89ssq3'),('clb8oarz6002w25jjk1miyl3l',100,'2022-12-04 01:16:34.723','2022-12-04 01:16:34.723','clb8oarz2002u25jj8fr6ehvk'),('clb8oarzc003025jjn8poqj17',100,'2022-12-04 01:16:34.728','2022-12-04 01:16:34.728','clb8oarz9002x25jjjpsc4njv'),('clb8oarzi003325jjnphpuk3i',100,'2022-12-04 01:16:34.734','2022-12-04 01:16:34.734','clb8oarzf003125jj5d54jl4e'),('clb8oarzp003625jjvh3vn15y',100,'2022-12-04 01:16:34.741','2022-12-04 01:16:34.741','clb8oarzm003425jjohociize'),('clb8oarzu003a25jj71l2673p',100,'2022-12-04 01:16:34.746','2022-12-04 01:16:34.746','clb8oarzr003725jj61yd6clm'),('clb8oarzz003d25jjlpzcvff6',100,'2022-12-04 01:16:34.751','2022-12-04 01:16:34.751','clb8oarzw003b25jjpvb6wr2l'),('clb8oas04003g25jjcvnr4dgn',100,'2022-12-04 01:16:34.757','2022-12-04 01:16:34.757','clb8oas01003e25jj2k0x2ako'),('clb8oas0a003j25jj4el0bvsm',100,'2022-12-04 01:16:34.762','2022-12-04 01:16:34.762','clb8oas07003h25jjldnsehun'),('clb8oas0g003m25jjxnixl99q',100,'2022-12-04 01:16:34.768','2022-12-04 01:16:34.768','clb8oas0c003k25jje6ersqk5'),('clbbg0orm000025mqrypy1sk3',-10,'2022-12-05 23:48:05.603','2022-12-05 23:47:53.609','clb8oarvy000z25jjj1m5vzez'),('clbbg127b000225mqj383jf9f',250,'2022-12-05 23:48:23.015','2022-12-05 23:48:10.151','clb8oarvy000z25jjj1m5vzez'),('clbbgeqaf000425mqzvdxi5t4',500,'2022-12-05 23:59:00.759','2022-12-05 23:58:48.548','clb8oarxh001u25jj37znhj9x'),('clbc9mn590001252u910k3f65',-100,'2022-12-06 13:36:58.797','2022-12-06 13:36:58.797','clb8oarvy000z25jjj1m5vzez'),('clbc9nqfc0003252uo2dh9bqu',100,'2022-12-06 13:37:49.704','2022-12-06 13:37:49.704','clb8oarvy000z25jjj1m5vzez'),('clbh5rzt600012541zcxjre3m',-30,'2022-12-09 23:48:00.905','2022-12-09 23:48:00.905','clb8oarvy000z25jjj1m5vzez'),('e3a72f1146d24814bd5bdb7758b13663',40,'2022-12-14 10:21:46.914','2022-12-14 10:21:46.914','clb8oarvy000z25jjj1m5vzez'),('f9eb9d102c2845d9b2f7b5a0a5cda775',-90,'2022-12-14 14:09:50.174','2022-12-14 14:09:50.174','clb8oary4002825jj7tkgnfpd');
/*!40000 ALTER TABLE `Stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile` enum('ENPLOYEE','ADMINISTRATOR') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ENPLOYEE',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('5a543d9faa7144df8354adaaedb40686','Funcionário','func@gmail.com','$2b$10$9CoJ.ia/PquX1kg4y.Aq1expMJHsVHuGD8PmlCCoM1PgLSdPq1AQK','ENPLOYEE',1,'2022-12-14 14:22:57.739','2022-12-14 14:22:57.739'),('a0794ffa9fb2422fab45e18d3d129a55','Matheus Henrique','matherique@gmail.com','$2b$10$NumMEhgJAebJFckyWIjH1eFXETsvEdCJS6GikdknptlguusPe/qbK','ADMINISTRATOR',1,'2022-12-11 22:33:06.382','2022-12-11 22:33:06.382'),('clb8oaru7000225jj27vo30ab','Tainara Santos','tss.cjo@gmail.com','$2b$10$CiSr62tA4jLKjAnYEDori.QSwwC6zYEdZBxksXfjDEtnnKglk1oJy','ENPLOYEE',1,'2022-12-04 01:16:34.544','2022-12-13 23:57:21.536'),('clb8oarub000425jj0gd7qaxi','Nollie','nearengey0@blog.com','$2a$10$17cQ595UXA6t/VBAte67DuoKipBScQxfV48xNIttLAbmcZL7/sAO6','ENPLOYEE',1,'2022-12-04 01:16:34.548','2022-12-04 01:16:34.548'),('clb8oarug000625jjcohxipqo','Rici','rjamson1@imgur.com','$2a$10$17cQ595UXA6t/VBAte67DuoKipBScQxfV48xNIttLAbmcZL7/sAO6','ENPLOYEE',1,'2022-12-04 01:16:34.552','2022-12-04 01:16:34.552'),('clb8oarun000a25jjhsfxcbn4','Belva','bprattin3@ebay.co.uk','$2a$10$17cQ595UXA6t/VBAte67DuoKipBScQxfV48xNIttLAbmcZL7/sAO6','ENPLOYEE',0,'2022-12-04 01:16:34.559','2022-12-14 18:13:58.618'),('clb8oarur000c25jjhu8jwlhr','Kyle','khearns4@i2i.jp','$2a$10$17cQ595UXA6t/VBAte67DuoKipBScQxfV48xNIttLAbmcZL7/sAO6','ENPLOYEE',1,'2022-12-04 01:16:34.563','2022-12-04 01:16:34.563'),('clb8oaruu000e25jjfnz1m1c1','Greer','ggenders5@woothemes.com','$2a$10$17cQ595UXA6t/VBAte67DuoKipBScQxfV48xNIttLAbmcZL7/sAO6','ENPLOYEE',0,'2022-12-04 01:16:34.567','2022-12-11 22:43:20.295'),('clb8oarv0000i25jjwqqs12i3','Ramsay','rshearstone6@newyorker.com','$2a$10$17cQ595UXA6t/VBAte67DuoKipBScQxfV48xNIttLAbmcZL7/sAO6','ENPLOYEE',1,'2022-12-04 01:16:34.573','2022-12-04 01:16:34.573'),('clb8oarv3000k25jj7knsdxbi','Carlyle','cbernardoni8@utexas.edu','$2a$10$17cQ595UXA6t/VBAte67DuoKipBScQxfV48xNIttLAbmcZL7/sAO6','ENPLOYEE',0,'2022-12-04 01:16:34.576','2022-12-14 18:13:35.077'),('clb8oarv6000m25jj61bkv9ox','Vonni','vebbens7@yellowbook.com','$2a$10$17cQ595UXA6t/VBAte67DuoKipBScQxfV48xNIttLAbmcZL7/sAO6','ENPLOYEE',1,'2022-12-04 01:16:34.578','2022-12-04 01:16:34.578'),('clb8oarva000o25jjxabbj6t0','Travers','tdobneyb@pagesperso-orange.fr','$2a$10$17cQ595UXA6t/VBAte67DuoKipBScQxfV48xNIttLAbmcZL7/sAO6','ENPLOYEE',1,'2022-12-04 01:16:34.583','2022-12-04 01:16:34.583'),('clb8oarvd000q25jjf1t6jgoq','Mary','mcauldfielda@hubpages.com','$2a$10$17cQ595UXA6t/VBAte67DuoKipBScQxfV48xNIttLAbmcZL7/sAO6','ENPLOYEE',1,'2022-12-04 01:16:34.586','2022-12-04 01:16:34.586');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-14 21:34:03

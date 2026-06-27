-- MySQL dump 10.13  Distrib 5.7.44, for Win64 (x86_64)
--
-- Host: localhost    Database: serenbanka
-- ------------------------------------------------------
-- Server version	5.7.44-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `game_config`
--

DROP TABLE IF EXISTS `game_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_config` (
  `start` int(11) NOT NULL,
  PRIMARY KEY (`start`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_config`
--

LOCK TABLES `game_config` WRITE;
/*!40000 ALTER TABLE `game_config` DISABLE KEYS */;
/*!40000 ALTER TABLE `game_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jump`
--

DROP TABLE IF EXISTS `jump`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jump` (
  `jump` int(11) NOT NULL,
  `plot_id1` int(11) DEFAULT NULL,
  `plot_id2` int(11) DEFAULT NULL,
  `optionText1` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `optionText2` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stroyArc1` int(11) DEFAULT NULL,
  `stroyArc2` int(11) DEFAULT NULL,
  PRIMARY KEY (`jump`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jump`
--

LOCK TABLES `jump` WRITE;
/*!40000 ALTER TABLE `jump` DISABLE KEYS */;
INSERT INTO `jump` VALUES (1,21,23,'为什么选择了这个比较另类的题材？','跳过',1,2);
/*!40000 ALTER TABLE `jump` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main`
--

DROP TABLE IF EXISTS `main`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `main` (
  `plot_id` int(11) NOT NULL,
  `background` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `chapter` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`plot_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main`
--

LOCK TABLES `main` WRITE;
/*!40000 ALTER TABLE `main` DISABLE KEYS */;
INSERT INTO `main` VALUES (0,'画面_黒.png','1-1'),(1,'画面_黒.png','1-1'),(2,'朝武_自室B.png','1-1'),(3,'朝武_自室B.png','1-1'),(4,'朝武_自室B.png','1-1'),(5,'朝武_自室B.png','1-1'),(6,'朝武_自室B.png','1-1'),(7,'朝武_自室B.png','1-1'),(8,'朝武_自室B.png','1-1'),(9,'朝武_自室B.png','1-1'),(10,'朝武_自室B.png','1-1'),(11,'朝武_自室B.png','1-1'),(12,'朝武_自室B.png','1-1'),(13,'朝武_自室B.png','1-2'),(14,'朝武_自室B.png','1-2'),(15,'朝武_自室B.png','1-2'),(16,'朝武_自室B.png','1-2'),(17,'朝武_自室B.png','1-2'),(18,'朝武_自室B.png','1-2'),(19,'朝武_自室B.png','1-2'),(20,'朝武_自室B.png','1-2'),(21,'朝武_自室B.png','1-2'),(22,'朝武_自室B.png','1-2'),(23,'朝武_自室B.png','1-2'),(24,'朝武_自室B.png','1-2'),(25,'朝武_自室B.png','1-2'),(26,'朝武_自室B.png','1-2'),(27,'朝武_自室B.png','1-2'),(28,'朝武_自室B.png','1-2'),(29,'朝武_自室B.png','1-2'),(30,'朝武_自室B.png','1-2'),(31,'朝武_自室B.png','1-2'),(32,'朝武_自室B.png','1-2'),(33,'朝武_自室B.png','1-2'),(34,'朝武_自室B.png','1-2'),(35,'朝武_自室B.png','1-2'),(36,'朝武_自室B.png','1-2'),(37,'朝武_自室B.png','1-2'),(38,'朝武_自室B.png','1-2'),(39,'朝武_自室B.png','1-2'),(40,'朝武_自室B.png','1-2'),(41,'朝武_自室B.png','1-2');
/*!40000 ALTER TABLE `main` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plot`
--

DROP TABLE IF EXISTS `plot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plot` (
  `plot_id` int(11) NOT NULL,
  `text` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sayingpeople` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `right_face` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `read_people` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `read_face` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `left_people` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `left_face` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `middle_people` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `middle_face` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `right_people` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jump` int(11) DEFAULT NULL,
  `isto` int(11) DEFAULT NULL,
  `left_pose` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `middle_pose` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `right_pose` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `read_pose` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `left_pose_type` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `read_pose_type` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `right_pose_type` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `middle_pose_type` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sound` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voice` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `music` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`plot_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plot`
--

LOCK TABLES `plot` WRITE;
/*!40000 ALTER TABLE `plot` DISABLE KEYS */;
INSERT INTO `plot` VALUES (0,'','','','','','','','','','',-1,-1,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'05'),(1,'迷糊地睁开眼','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'05'),(2,'「......」','「player」',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'05'),(3,'这里看起来像是谁的房间…，我记得剧情开场也不是这样的吧,先四处转转好了…',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,-1,-1,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,'05'),(4,'突然传出了某人开门的声音','',NULL,'','',NULL,NULL,'','',NULL,-1,-1,NULL,'',NULL,'',NULL,'',NULL,NULL,NULL,NULL,'05'),(5,'「ciallo!」','「???」',NULL,'0','1',NULL,NULL,'0','1',NULL,-1,-1,NULL,'0',NULL,'0',NULL,'a',NULL,'a',NULL,'ciallo','05'),(6,'!!!!!!','「player」',NULL,'','',NULL,NULL,'0','1',NULL,-1,-1,NULL,'0',NULL,'',NULL,'',NULL,'a',NULL,NULL,'05'),(7,'「哼哼，寒暄就到此为止了player，我的名字是丛雨，游戏《千恋万花》的主人公之一。」','「丛雨」',NULL,'0','8',NULL,NULL,'0','8',NULL,-1,-1,NULL,'0',NULL,'0',NULL,'b',NULL,'b',NULL,NULL,'05'),(8,'「想必你一定听过我的鼎鼎大名吧。初次见面请多关照。」','「丛雨」',NULL,'0','9',NULL,NULL,'0','9',NULL,-1,-1,NULL,'1',NULL,'1',NULL,'b',NULL,'b',NULL,NULL,'05'),(9,'「从雨小姐，这是怎么回事？」','「player」',NULL,'','',NULL,NULL,'0','8',NULL,-1,-1,NULL,'1',NULL,'',NULL,'',NULL,'b',NULL,NULL,'05'),(10,'「咳咳，这是因为这个web游戏复刻组的成员们是群杂鱼。」','「丛雨」',NULL,'0','10',NULL,NULL,'0','10',NULL,-1,-1,NULL,'0',NULL,'0',NULL,'b',NULL,'b',NULL,NULL,'05'),(11,'「时间和精力有限，素材也收集不齐，只能由我丛雨大人出马改成介绍剧情了。」','「丛雨」',NULL,'0','7',NULL,NULL,'0','7',NULL,-1,-1,NULL,'0',NULL,'0',NULL,'b',NULL,'b',NULL,NULL,'05'),(12,'「失礼了。在下朝武芳乃。用Web重现穗织町，实为一项艰巨的修行。」','「芳乃」','7','1','0','1','0','','','0',-1,-1,'0','','0','0','a','a','b','',NULL,NULL,'05'),(13,'「所以…这个网页是一个游戏复刻？」','「player」','8','','','1','0','','','0',-1,-1,'0','','0','','a','','b','',NULL,NULL,'05'),(14,'「答对啦！是用Vue3作为前端框架，Pinia处理全局数据，利用Vue的响应式特性注入灵魂的舞台！」','「丛雨」','9','0','9','1','0','','','0',-1,-1,'0','','1','1','a','b','b','',NULL,NULL,'05'),(15,'「player体验到的实时界面的流畅加载靠的就是它哦!」','「丛雨」','8','0','8','1','0','','','0',-1,-1,'0','','0','0','a','b','b','',NULL,NULL,'05'),(16,'「核心难点在于前端庞大且复杂的交互逻辑和剧情分支树系统的数据库设计。」','「芳乃」','8','1','0','1','0','','','0',-1,-1,'0','','0','0','a','a','b','',NULL,NULL,'05'),(17,'「我们使用建立父子结点的方式管理分支剧情，player的每个选择都将改变故事流向。」','「芳乃」','8','1','5','1','5',NULL,NULL,'0',-1,-1,'1',NULL,'0','1','b','b','b',NULL,NULL,NULL,'05'),(18,'「能否展示下效果呢？」','「player」','8','','','1','6',NULL,NULL,'0',-1,-1,'1',NULL,'0','','b','','b',NULL,NULL,NULL,'05'),(19,'「当然可以，还请随意。」','「芳乃」','8','1','6','1','6',NULL,NULL,'0',-1,-1,'1',NULL,'0','1','b','b','b',NULL,NULL,NULL,'05'),(20,'','','8','','','1','6',NULL,NULL,'0',1,-1,'1',NULL,'0',NULL,'b',NULL,'b',NULL,NULL,NULL,'05'),(21,'「这个嘛...他们说着什么千原万神启动什么的就决定下来了，还说什么重铸呃次元荣光在此一举 …」','「丛雨」','7','0','7','1','0',NULL,NULL,'0',-1,-1,'0',NULL,'1','1','b','b','b',NULL,NULL,NULL,'05'),(22,'逆天柚子÷…','「player」','10','','','1','1',NULL,NULL,'0',-1,24,'0',NULL,'1','','b','','b',NULL,NULL,NULL,'05'),(23,'「什么，player你居然选择了跳过人生，那可是错过了世界级剧情对话文案哦」','「丛雨」','3','0','3','1','3',NULL,NULL,'0',-1,-1,'0',NULL,'0','0','b','a','a',NULL,NULL,NULL,'05'),(24,'「咳咳，不过话说回来看起来还真有模有样的？」','「player」','8','','','1','5',NULL,NULL,'0',-1,-1,'0',NULL,'1','','b','','b',NULL,NULL,NULL,'05'),(25,'「并非如此...因为解包素材不全，本大人的必杀技丛雨丸没有动画只能放仓库吃灰了...」','「丛雨」','10','0','10','1','2',NULL,NULL,'0',-1,-1,'1',NULL,'1','1','b','b','b',NULL,NULL,NULL,'05'),(26,'「简直是杂鱼级别的妥协的说」','「丛雨」','7','0','7','1','0',NULL,NULL,'0',-1,-1,'0',NULL,'1','1','b','b','b',NULL,NULL,NULL,'05'),(27,'「…但关键功能已实现。利用Vue的Pinia全局状态管理库进行界面间存档读档的数据传递和全局音乐的改变」','「芳乃」','8','1','5','1','5',NULL,NULL,'0',-1,-1,'1',NULL,'0','1','b','b','b',NULL,NULL,NULL,'05'),(28,'「如同用太鼓调动全祭典的氛围」','「芳乃」','8','1','6','1','6',NULL,NULL,'0',-1,-1,'1',NULL,'0','1','b','b','b',NULL,NULL,NULL,'05'),(29,'「开发过程顺利吗？」','「player」','4','','','1','0',NULL,NULL,'0',-1,-1,'0',NULL,'0','','b','','b',NULL,NULL,NULL,'05'),(30,'「BUG多到爆炸...player你现在按下F11退出全屏的话估计就能观察到我们全都错位了，他们根本没做屏幕尺寸适配」','「丛雨」','11','0','11','1','0',NULL,NULL,'0',-1,-1,'0',NULL,'1','1','b','b','b',NULL,NULL,NULL,'05'),(31,'「更杂鱼的是他们居然想砍掉了我的动画特效！说什么加animation太浪费时间了」','「丛雨」','12','0','12','1','5',NULL,NULL,'0',-1,-1,'0',NULL,'1','1','b','b','b',NULL,NULL,NULL,'05'),(32,'「本大人可是500岁的付丧神，竟然沦落到和连膝盖都没有，无法原地起跳的魂5坐一桌了」','「丛雨」','5','0','5','1','5',NULL,NULL,'0',-1,-1,'0',NULL,'0','0','b','a','a',NULL,NULL,NULL,'05'),(33,'丛雨大人...还...还请您专注于项目说明！','「芳乃」','5','1','1','1','1',NULL,NULL,'0',-1,-1,'0',NULL,'0','0','b','b','a',NULL,NULL,NULL,'05'),(34,'哎，又幻想了...凭借废萌白开水剧情人设拿到2016年getchu游戏大赏女主角第一名，力压朝武芳乃和南梁飞鸟奏，创造一个......','「丛雨」','4','0','4','1','1',NULL,NULL,'0',-1,-1,'0',NULL,'0','0','b','a','a',NULL,NULL,NULL,'05'),(35,'咳咳，那么最终成果如何？','「player」','4',NULL,NULL,'1','0',NULL,NULL,'0',-1,-1,'0',NULL,'0',NULL,'b',NULL,'a',NULL,NULL,NULL,'05'),(36,'虽交互未能尽善尽美…但已充分证明，Web技术足以承载Galgame的核心叙事与互动体验。','「芳乃」','8','1','6','1','6',NULL,NULL,'0',-1,-1,'1',NULL,'0','1','b','b','b',NULL,NULL,NULL,'05'),(37,'未来有计划更新吗？','「player」','8',NULL,NULL,'1','6',NULL,NULL,'0',-1,-1,'1',NULL,'0',NULL,'b',NULL,'b',NULL,NULL,NULL,'05'),(38,'当然有！下次更新就给player加入触摸交互！点我额头就能触发alert(\"无路赛！\")警告！','「丛雨」','5','0','5','1','2',NULL,NULL,'0',-1,-1,'1',NULL,'1','0','b','b','b',NULL,NULL,NULL,'05'),(39,'否决。当务之急是完善画面尺寸匹配以及考虑如何做到长剧情数据分表存储…','「芳乃」','12','`1','4','1','4',NULL,NULL,'0',-1,-1,'1',NULL,'0','1','b','b','b',NULL,NULL,NULL,'05'),(40,'...现在有地方可以体验这个项目吗？','「player」','8',NULL,NULL,'1','6',NULL,NULL,'0',-1,-1,'1',NULL,'0',NULL,'b',NULL,'b',NULL,NULL,NULL,'05'),(41,'去GitHub搜索“serenbanka:for learning”吧！记得给仓库点个星星哦～Ciallo～(∠・ω<)⌒★！','「丛雨」','0','0','0','1','6',NULL,NULL,'0',-1,-1,'1',NULL,'1','0','b','b','b',NULL,NULL,NULL,'05');
/*!40000 ALTER TABLE `plot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `save_data`
--

DROP TABLE IF EXISTS `save_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `save_data` (
  `Did` int(11) NOT NULL,
  `plot_id` int(11) DEFAULT NULL,
  `timestamp` bigint(20) DEFAULT NULL,
  `comment` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stroyArc` int(11) DEFAULT NULL,
  PRIMARY KEY (`Did`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `save_data`
--

LOCK TABLES `save_data` WRITE;
/*!40000 ALTER TABLE `save_data` DISABLE KEYS */;
INSERT INTO `save_data` VALUES (1,0,1751867334131,'COMMENT222333',0),(2,20,1750398340154,'COMMENT',0),(3,20,1750398780191,'COMMENT',0),(4,27,1750397156525,'COMMENT',0),(5,37,1750396855571,'COMMENT',0),(6,0,1750494653614,'COMMENT',0),(7,20,1750397610593,'COMMENT',0),(8,20,1750496149506,'COMMENT',0),(9,0,1750436742009,'COMMENT',0),(10,0,1751867353588,'COMMENT',0),(11,-1,NULL,NULL,-1),(12,20,1750498862645,'COMMENT',0),(13,-1,NULL,NULL,NULL),(14,-1,NULL,NULL,NULL),(15,-1,NULL,NULL,NULL),(16,-1,NULL,NULL,NULL),(17,-1,NULL,NULL,NULL),(18,-1,NULL,NULL,NULL),(19,-1,NULL,NULL,NULL),(20,-1,NULL,NULL,NULL),(21,-1,NULL,NULL,NULL),(22,-1,NULL,NULL,NULL),(23,-1,NULL,NULL,NULL),(24,-1,NULL,NULL,NULL),(25,-1,NULL,NULL,NULL),(26,-1,NULL,NULL,NULL),(27,-1,NULL,NULL,NULL),(28,-1,NULL,NULL,NULL),(29,-1,NULL,NULL,NULL),(30,-1,NULL,NULL,NULL),(31,-1,NULL,NULL,NULL),(32,-1,NULL,NULL,NULL),(33,-1,NULL,NULL,NULL),(34,-1,NULL,NULL,NULL),(35,-1,NULL,NULL,NULL),(36,-1,NULL,NULL,NULL),(37,-1,NULL,NULL,NULL),(38,-1,NULL,NULL,NULL),(39,-1,NULL,NULL,NULL),(40,-1,NULL,NULL,NULL),(41,-1,NULL,NULL,NULL),(42,-1,NULL,NULL,NULL),(43,-1,NULL,NULL,NULL),(44,-1,NULL,NULL,NULL),(45,-1,NULL,NULL,NULL),(46,-1,NULL,NULL,NULL),(47,-1,NULL,NULL,NULL),(48,-1,NULL,NULL,NULL),(49,-1,NULL,NULL,NULL),(50,-1,NULL,NULL,NULL),(51,-1,NULL,NULL,NULL),(52,-1,NULL,NULL,NULL),(53,-1,NULL,NULL,NULL),(54,-1,NULL,NULL,NULL),(55,-1,NULL,NULL,NULL),(56,-1,NULL,NULL,NULL),(57,-1,NULL,NULL,NULL),(58,-1,NULL,NULL,NULL),(59,-1,NULL,NULL,NULL),(60,-1,NULL,NULL,NULL),(61,-1,NULL,NULL,NULL),(62,-1,NULL,NULL,NULL),(63,-1,NULL,NULL,NULL),(64,-1,NULL,NULL,NULL),(65,-1,NULL,NULL,NULL),(66,-1,NULL,NULL,NULL),(67,-1,NULL,NULL,NULL),(68,-1,NULL,NULL,NULL),(69,-1,NULL,NULL,NULL),(70,-1,NULL,NULL,NULL),(71,-1,NULL,NULL,NULL),(72,-1,NULL,NULL,NULL),(73,-1,NULL,NULL,NULL),(74,-1,NULL,NULL,NULL),(75,-1,NULL,NULL,NULL),(76,-1,NULL,NULL,NULL),(77,-1,NULL,NULL,NULL),(78,-1,NULL,NULL,NULL),(79,-1,NULL,NULL,NULL),(80,-1,NULL,NULL,NULL),(81,-1,NULL,NULL,NULL),(82,-1,NULL,NULL,NULL),(83,-1,NULL,NULL,NULL),(84,-1,NULL,NULL,NULL),(85,-1,NULL,NULL,NULL),(86,-1,NULL,NULL,NULL),(87,-1,NULL,NULL,NULL),(88,-1,NULL,NULL,NULL),(89,-1,NULL,NULL,NULL),(90,-1,NULL,NULL,NULL),(91,-1,NULL,NULL,NULL),(92,-1,NULL,NULL,NULL),(93,-1,NULL,NULL,NULL),(94,-1,NULL,NULL,NULL),(95,-1,NULL,NULL,NULL),(96,-1,NULL,NULL,NULL),(97,-1,NULL,NULL,NULL),(98,-1,NULL,NULL,NULL),(99,-1,NULL,NULL,NULL),(100,-1,NULL,NULL,NULL),(101,-1,NULL,NULL,NULL),(102,-1,NULL,NULL,NULL),(103,-1,NULL,NULL,NULL),(104,-1,NULL,NULL,NULL),(105,-1,NULL,NULL,NULL),(106,-1,NULL,NULL,NULL),(107,-1,NULL,NULL,NULL),(108,-1,NULL,NULL,NULL),(109,-1,NULL,NULL,NULL),(110,-1,NULL,NULL,NULL),(111,-1,NULL,NULL,NULL),(112,-1,NULL,NULL,NULL),(113,-1,NULL,NULL,NULL),(114,-1,NULL,NULL,NULL),(115,-1,NULL,NULL,NULL),(116,-1,NULL,NULL,NULL),(117,-1,NULL,NULL,NULL),(118,-1,NULL,NULL,NULL),(119,-1,NULL,NULL,NULL),(120,-1,NULL,NULL,NULL),(121,-1,NULL,NULL,NULL),(122,-1,NULL,NULL,NULL),(123,-1,NULL,NULL,NULL),(124,-1,NULL,NULL,NULL),(125,-1,NULL,NULL,NULL),(126,-1,NULL,NULL,NULL),(127,-1,NULL,NULL,NULL),(128,-1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `save_data` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-07 13:57:08

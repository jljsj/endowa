/*
 Navicat Premium Data Transfer

 Source Server         : jljsj
 Source Server Type    : MySQL
 Source Server Version : 80015
 Source Host           : localhost:3306
 Source Schema         : endowa

 Target Server Type    : MySQL
 Target Server Version : 80015
 File Encoding         : 65001

 Date: 16/04/2019 16:20:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_nav_list
-- ----------------------------
DROP TABLE IF EXISTS `admin_nav_list`;
CREATE TABLE `admin_nav_list` (
  `uid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `categoryName` varchar(255) DEFAULT NULL,
  `order` tinyint(255) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of admin_nav_list
-- ----------------------------
BEGIN;
INSERT INTO `admin_nav_list` VALUES (1, 'basic', '基本内容', NULL, NULL, 0);
INSERT INTO `admin_nav_list` VALUES (2, 'introduce', '关于我们', 'about', '公司信息', 1);
INSERT INTO `admin_nav_list` VALUES (3, 'team', '团队人员', 'about', '公司信息', 2);
INSERT INTO `admin_nav_list` VALUES (4, 'contact', '联系我们', 'about', '公司信息', 3);
INSERT INTO `admin_nav_list` VALUES (5, 'history', '发展历程', 'about', '公司信息', 4);
INSERT INTO `admin_nav_list` VALUES (6, 'honor', '企业荣誉', 'about', '公司信息', 5);
INSERT INTO `admin_nav_list` VALUES (7, 'post', '全部岗位', 'job', '加入我们', 7);
INSERT INTO `admin_nav_list` VALUES (8, 'news', '新闻中心', 'info', '新闻管理', 8);
INSERT INTO `admin_nav_list` VALUES (9, 'product', '产中中心', 'products', '产品管理', 10);
INSERT INTO `admin_nav_list` VALUES (10, 'user', '后台用户管理', NULL, NULL, 12);
INSERT INTO `admin_nav_list` VALUES (12, 'newsClassify', '新闻分类', 'info', '新闻中心', 7);
INSERT INTO `admin_nav_list` VALUES (13, 'productClassify', '产品分类', 'products', '产品管理', 9);
INSERT INTO `admin_nav_list` VALUES (14, 'postClassify', '岗位类别', 'job', '加入我们', 6);
INSERT INTO `admin_nav_list` VALUES (15, 'service', '产品服务', 'products', '产品管理', 9);
INSERT INTO `admin_nav_list` VALUES (16, 'partner', '合作伙伴', NULL, NULL, 11);
COMMIT;

-- ----------------------------
-- Table structure for web_basic
-- ----------------------------
DROP TABLE IF EXISTS `web_basic`;
CREATE TABLE `web_basic` (
  `uid` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `key` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `name` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `values` text,
  `explain` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of web_basic
-- ----------------------------
BEGIN;
INSERT INTO `web_basic` VALUES (1, 'basic', '网站静态内容', '[{\"key\":\"homeBanner\",\"name\":\"首页背景\",\"type\":\"image\",\"value\":\"/uploads/13e825a0b632e6c05f3713c09b492e80.jpg\",\"values\":\"\"},{\"key\":\"bannerTitle\",\"name\":\"首页 Banner 标题\",\"type\":\"input\",\"values\":\"\",\"value\":\"恩都法，为了绿色美好的未来\"},{\"key\":\"bannerText\",\"name\":\"首页 Banner 文字\",\"type\":\"textarea\",\"values\":\"\",\"value\":\"专注各种专业阀门制造\"},{\"key\":\"product_banner_image\",\"name\":\"产品页 Banner 图片\",\"type\":\"image\",\"values\":\"\",\"value\":\"/uploads/6e1b5f5e9067719c07f9bb18b4421072.jpg\"},{\"key\":\"aboutBanner\",\"name\":\"关于我们 Banner 图片\",\"type\":\"image\",\"values\":\"\",\"value\":\"/uploads/73ed65428f9bcb287d3ed2c9e5f096d5.png\"},{\"key\":\"teamImg\",\"name\":\"团队合照\",\"type\":\"image\",\"values\":\"\",\"value\":\"/uploads/856cbcf110f8d5d0167684b740ef7fe6.jpg\"}]', '针对前台的图片和文字编辑。');
INSERT INTO `web_basic` VALUES (3, 'about', '关于我们', '<p>恩都法汽车配件有限公司为您提供多类型的汽车系统阀门以满足不同规模客户的需求。专业、专注的做好各种阀，为绿色清洁的未来社会贡献自己的力量，是我司的愿景。若您遇到使用问题，可以直接联系我们，我们为您贴身解答</p>', NULL);
INSERT INTO `web_basic` VALUES (4, 'service', '产品服务', '<p>很好的产品，恩都法汽车配件有限公司为您提供多类型的汽车系统阀门以满足不同规模客户的需求。专业、专注的做好各种阀，为绿色清洁的未来社会贡献自己的力量，是我司的愿景。若您遇到使用问题，可以直接联系我们，我们为您贴身解答，这是个好产品1212。</p>', NULL);
INSERT INTO `web_basic` VALUES (5, 'contact', '联系我们', '[{\"key\":\"image\",\"name\":\"团队照片\",\"type\":\"image\",\"value\":\"/uploads/c3e1ce26f2b7d7d13869369bb23cb25e.jpg\"},{\"key\":\"tel\",\"name\":\"联系电话\",\"type\":\"input\",\"value\":\"+86 512 67997980\"},{\"key\":\"fax\",\"name\":\"公司传真\",\"type\":\"input\",\"value\":\"+86 512 67997980\"},{\"key\":\"mail\",\"name\":\"公司邮箱\",\"type\":\"input\",\"value\":\"yuebuqun@endowa.com\"},{\"key\":\"slogan\",\"name\":\"广告语\",\"type\":\"input\",\"value\":\"欢迎随时来电咨询，也真诚期待你的加入！\"},{\"key\":\"address\",\"name\":\"公司地址\",\"type\":\"input\",\"values\":\"\"}]', NULL);
COMMIT;

-- ----------------------------
-- Table structure for web_history
-- ----------------------------
DROP TABLE IF EXISTS `web_history`;
CREATE TABLE `web_history` (
  `index` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `introduce` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `time` varchar(255) DEFAULT NULL,
  `hot` int(1) DEFAULT '0',
  `show` int(1) DEFAULT '1',
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of web_history
-- ----------------------------
BEGIN;
INSERT INTO `web_history` VALUES (4, '10事件', 'sdfsdfslksdfjksdjflksdjflskdjflskdjflskdfjlskdjlskdfsdf', '2010-03-05', 0, 1);
INSERT INTO `web_history` VALUES (5, '11年事件', '中国大放血了。', '2011-04-15', 1, 1);
INSERT INTO `web_history` VALUES (6, '12年事件', '这是介绍文案这是介绍文案这是介绍文案这是介绍文案这是介绍文案', '2012-04-15', 0, 1);
COMMIT;

-- ----------------------------
-- Table structure for web_honor
-- ----------------------------
DROP TABLE IF EXISTS `web_honor`;
CREATE TABLE `web_honor` (
  `index` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `show` int(1) DEFAULT '1',
  `hot` int(1) DEFAULT '0',
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of web_honor
-- ----------------------------
BEGIN;
INSERT INTO `web_honor` VALUES (1, '2011年 世界汽车阀门技术优胜奖', 'https://gw.alipayobjects.com/zos/rmsportal/CKbcJYcfNeHDgVyMzzzS.png', 1, 1);
INSERT INTO `web_honor` VALUES (2, '12122112', 'https://gw.alipayobjects.com/zos/rmsportal/CKbcJYcfNeHDgVyMzzzS.png', 1, 1);
INSERT INTO `web_honor` VALUES (3, '3333', 'https://gw.alipayobjects.com/zos/rmsportal/CKbcJYcfNeHDgVyMzzzS.png', 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for web_news
-- ----------------------------
DROP TABLE IF EXISTS `web_news`;
CREATE TABLE `web_news` (
  `index` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `name_en` varchar(255) DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `date` varchar(255) DEFAULT NULL,
  `classify` varchar(255) DEFAULT NULL,
  `hot` int(1) DEFAULT '0',
  `show` int(1) DEFAULT '1',
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of web_news
-- ----------------------------
BEGIN;
INSERT INTO `web_news` VALUES (1, '/uploads/9d600aa2e646d2c226b7ac97ec377b4d.png', '恩都法完成上市天使轮融资', 'Company news', '<p class=\"p1\">恩都法这样下去感觉立马要上市，上市之后，岳不群、余沧海、林平之、东方不败、傻B蒋文钦一起带白龙马飞，东莞一条龙，一路向西 high 起来，</p>', '2019-04-08', '8', 1, 1);
INSERT INTO `web_news` VALUES (2, '/uploads/9e8e13959da12b32b038ca38b517e15d.png', '辟邪剑谱尊享套餐', 'Double check valve', '<p class=\"p1\">恩都法这样下去感觉立马要上市，上市之后，岳不群、余沧海、林平之、东方不败、傻B蒋文钦一起带白龙马飞，东莞一条龙，一路向西 high 起来，恩都法这样下去感觉立马要上市，上市之后，岳不群、余沧海、林平之、东方不败、傻B蒋文钦一起带白龙马飞，东莞一条龙，一路向西 high 起来，恩都法这样下去感觉立马要上市，上市之后，岳不群、余沧海、林平之、东方不败、傻B蒋文钦一起带白龙马飞，东莞一条龙，一路向西 high 起来，恩都法这样下去感觉立马要上市，上市之后，岳不群、余沧海、林平之、东方不败、傻B蒋文钦一起带白龙马飞，东莞一条龙，一路向西 high 起来，恩都法这样下去感觉立马要上市，上市之后，岳不群、余沧海、林平之、东方不败、傻B蒋文钦一起带白龙马飞，东莞一条龙，一路向西 high 起来，恩都法这样下去感觉立马要上市，上市之后，岳不群、余沧海、林平之、东方不败、傻B蒋文钦一起带白龙马飞，东莞一条龙，一路向西 high 起来，</p>', '2019-04-10', '8', 1, 1);
INSERT INTO `web_news` VALUES (3, '/uploads/8314e69ced63c4693fffe7bad9258922.png', '公司地址', 'sdfsdfsdf123', '<p class=\"p1\">sdafasf这是一次难得的人工智能讨论会，将由一群国内顶尖专家，已圆桌讨论、现场解答等小型工作坊形式对国内外人工智能的研究成果解读，也将现场对人工智能的未来进行探讨，为你揭开人工智能真正的未来也将现场对人工智能的未来进行探讨，为你揭开人工智能真正的未来.</p>', '2019-04-11', '9', 0, 1);
INSERT INTO `web_news` VALUES (4, '/uploads/33a23449fe3806adaaa10635e6f6c416.png', '环保价值爆发,恩都法领军行业', 'Double check valve', '<p class=\"p1\">恩都法这样下去感觉立马要上市，上市之后，岳不群、余沧海、林平之、东方不败、傻B蒋文钦一起带白龙马飞，东莞一条龙，一路向西 high 起来，</p>', '2019-04-10', '7', 1, 1);
COMMIT;

-- ----------------------------
-- Table structure for web_newsClassify
-- ----------------------------
DROP TABLE IF EXISTS `web_newsClassify`;
CREATE TABLE `web_newsClassify` (
  `index` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `name_en` varchar(255) DEFAULT NULL,
  `classify` int(255) DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of web_newsClassify
-- ----------------------------
BEGIN;
INSERT INTO `web_newsClassify` VALUES (7, '媒体报道', NULL, 7);
INSERT INTO `web_newsClassify` VALUES (8, '业界动态', NULL, 9);
INSERT INTO `web_newsClassify` VALUES (9, '公司新闻', NULL, 8);
COMMIT;

-- ----------------------------
-- Table structure for web_partner
-- ----------------------------
DROP TABLE IF EXISTS `web_partner`;
CREATE TABLE `web_partner` (
  `index` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `show` int(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of web_partner
-- ----------------------------
BEGIN;
INSERT INTO `web_partner` VALUES (1, '不知道', 'https://gw.alipayobjects.com/zos/rmsportal/CKbcJYcfNeHDgVyMzzzS.png', '#', 1);
INSERT INTO `web_partner` VALUES (2, '1312', 'https://gw.alipayobjects.com/zos/rmsportal/CKbcJYcfNeHDgVyMzzzS.png', '#', 1);
INSERT INTO `web_partner` VALUES (3, '13213', 'https://gw.alipayobjects.com/zos/rmsportal/CKbcJYcfNeHDgVyMzzzS.png', '4343', 1);
INSERT INTO `web_partner` VALUES (4, 'sdfsdf', 'https://gw.alipayobjects.com/zos/rmsportal/CKbcJYcfNeHDgVyMzzzS.png', '#', 1);
INSERT INTO `web_partner` VALUES (5, 'trttr', 'https://gw.alipayobjects.com/zos/rmsportal/CKbcJYcfNeHDgVyMzzzS.png', '#', 1);
INSERT INTO `web_partner` VALUES (6, '首页背景', 'https://gw.alipayobjects.com/zos/rmsportal/CKbcJYcfNeHDgVyMzzzS.png', '12', 1);
COMMIT;

-- ----------------------------
-- Table structure for web_post
-- ----------------------------
DROP TABLE IF EXISTS `web_post`;
CREATE TABLE `web_post` (
  `index` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `salary` varchar(255) DEFAULT NULL,
  `introduce` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `classify` varchar(255) DEFAULT NULL,
  `show` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of web_post
-- ----------------------------
BEGIN;
INSERT INTO `web_post` VALUES (1, '水电工', '6-8 千/月', '<p style=\"text-align:start;text-indent:2em;\" class=\"antd-pro-page-header-title\">水电工编辑水电工编辑水电工编辑水电工编辑水电工编辑水电工编辑水电工编辑水电工编辑水电工编辑</p>', '1', 1);
INSERT INTO `web_post` VALUES (2, '关于我们背景', 'sdfsdfsfsdfsdf', '<p></p>', '3', 1);
INSERT INTO `web_post` VALUES (3, '制造工程师', '6-8 千/月', '<p>没有没有没有没有没有没有没有没有没有没有没没有没有没有没有没有没有没有没有没有没有没没有没有没有没有没有没有没有没有没有没有没没有没有没有没有没有没有没有没有没有没有没没有没有没有没有没有没有没有没有没有没有没没有没有没有没有没有没有没有没有没有没有没没有没有没有没有没有没有没有没有没有没有没没有没有没有没有没有没有没有没有没有没有没没有没有没有没有没有没有没有没有没有没有没没有没有没有没有没有没有没有没有没有没有没没有没有没有没有没有没有没有没有没有没有没没有没有没有没有没有没有没有没有没有没有没没有没有没有没有没有没有没有没有没有没有没有没有</p>', '2', 1);
COMMIT;

-- ----------------------------
-- Table structure for web_postClassify
-- ----------------------------
DROP TABLE IF EXISTS `web_postClassify`;
CREATE TABLE `web_postClassify` (
  `index` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `condition` varchar(255) DEFAULT NULL,
  `classify` int(255) DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of web_postClassify
-- ----------------------------
BEGIN;
INSERT INTO `web_postClassify` VALUES (1, '其它职位', '能完成满足基本工作要求，电气、自动化专业同学优先', 3);
INSERT INTO `web_postClassify` VALUES (2, '销售 & 采购', '能完成满足基本工作要求，电气、自动化专业同学优先', 2);
INSERT INTO `web_postClassify` VALUES (3, '工程类', '能完成满足基本工作要求，电气、 自动化专业同学优先', 1);
COMMIT;

-- ----------------------------
-- Table structure for web_product
-- ----------------------------
DROP TABLE IF EXISTS `web_product`;
CREATE TABLE `web_product` (
  `index` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `name_en` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `introduce` text,
  `classify` varchar(255) DEFAULT NULL,
  `hot` int(1) NOT NULL DEFAULT '0',
  `show` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of web_product
-- ----------------------------
BEGIN;
INSERT INTO `web_product` VALUES (1, 'sabcsda', 'dsafadsfsa', '/uploads/809eada66ea0c67d4a52dd2d6b8e0cb6.png', '<p></p>', '6', 1, 1);
INSERT INTO `web_product` VALUES (2, '低压油箱截止阀', 'Double check valve', '/uploads/632a45f60f49a89e30e09dcaf5de4a7f.jpg', '<p></p>', '4', 1, 1);
INSERT INTO `web_product` VALUES (3, '电磁开关阀', 'Double check valve', '/uploads/c27ffe37df98baf96665dd1259c88379.jpg', '<p class=\"p1\">恩都法汽车配件有限公司为您提供多类型的汽车系统阀门以满足不同规模客户的需求。专业、专注的做好各种阀，为绿色清洁的未来社会贡献自己的力量，是我司的愿景。若您遇到使用问题，可以直接联系我们，我们为您贴身解答,</p><p></p><p class=\"p1\"><span style=\"font-size:30px\">为绿色清洁的未来社会贡献自己的力量</span></p>', '6', 0, 1);
COMMIT;

-- ----------------------------
-- Table structure for web_productClassify
-- ----------------------------
DROP TABLE IF EXISTS `web_productClassify`;
CREATE TABLE `web_productClassify` (
  `index` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `name_en` varchar(255) DEFAULT NULL,
  `classify` int(255) DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of web_productClassify
-- ----------------------------
BEGIN;
INSERT INTO `web_productClassify` VALUES (4, '双单向阀', 'SELECTIED PRODUCTS', 4);
INSERT INTO `web_productClassify` VALUES (5, '电磁开关阀', 'SELECTIED PRODUCTS', 6);
INSERT INTO `web_productClassify` VALUES (6, '低压油箱截止阀', 'SELECTIED PRODUCTS', 5);
COMMIT;

-- ----------------------------
-- Table structure for web_team
-- ----------------------------
DROP TABLE IF EXISTS `web_team`;
CREATE TABLE `web_team` (
  `index` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '排序用',
  `name` varchar(255) DEFAULT NULL,
  `name_en` varchar(255) DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '头像',
  `job` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '职位',
  `synopsis` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '简介',
  `introduce` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '介绍',
  `show` tinyint(1) DEFAULT '1' COMMENT '是否显示',
  `hot` tinyint(1) DEFAULT '1' COMMENT '核心',
  PRIMARY KEY (`index`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of web_team
-- ----------------------------
BEGIN;
INSERT INTO `web_team` VALUES (21, '1231231', '123123', '/uploads/b2a4a805b4597a1ddd6c340446f56b58.png', '12312343', NULL, '<p>434343434</p>', 1, 1);
INSERT INTO `web_team` VALUES (25, 'sdfsdf', 'sdfsdfsdf', '/uploads/b2a4a805b4597a1ddd6c340446f56b58.png', 'sdfsdf', NULL, '<p>sdfsdfsdf</p>', 1, 1);
INSERT INTO `web_team` VALUES (26, '3333abcd', 'sdfsdfsdf123', '/uploads/b2a4a805b4597a1ddd6c340446f56b58.png', 's123', NULL, '<p>sdfsdfsdf123</p>', 1, 1);
INSERT INTO `web_team` VALUES (27, '132123', '4444', '/uploads/b2a4a805b4597a1ddd6c340446f56b58.png', '121221', NULL, '<p></p>', 1, 1);
COMMIT;

-- ----------------------------
-- Table structure for web_user
-- ----------------------------
DROP TABLE IF EXISTS `web_user`;
CREATE TABLE `web_user` (
  `index` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `purview` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`index`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of web_user
-- ----------------------------
BEGIN;
INSERT INTO `web_user` VALUES (1, 'global', 'Jlj11111', 'news,product,introduce,user,basic,team,service,contact,post,history,honor,newsClassify,postClassify,productClassify,partner');
INSERT INTO `web_user` VALUES (2, 'admin', '123456', 'news,product,introduce,user,basic,team,service,contact,post,history,honor,newsClassify,postClassify,productClassify,partner');
INSERT INTO `web_user` VALUES (3, 'user', '123456', 'news,product,introduce,basic,service,newsClassify,productClassify,history,postClassify,post,contact,team,honor,partner');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

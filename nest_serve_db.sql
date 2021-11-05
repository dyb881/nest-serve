/*
 Navicat Premium Data Transfer

 Source Server         : 华南1（深圳）可用区E
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : rm-wz97ghk8d2r266b0gwo.mysql.rds.aliyuncs.com:3306
 Source Schema         : nest_serve_v8_db

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 05/11/2021 16:08:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account_admin
-- ----------------------------
DROP TABLE IF EXISTS `account_admin`;
CREATE TABLE `account_admin` (
  `id` char(36) NOT NULL,
  `create_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `username` varchar(32) NOT NULL COMMENT '用户名',
  `password` varchar(128) NOT NULL COMMENT '密码',
  `reg_ip` varchar(15) DEFAULT NULL COMMENT '注册IP',
  `login_ip` varchar(15) DEFAULT NULL COMMENT '登录IP',
  `login_date` datetime DEFAULT NULL COMMENT '登录时间',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机号',
  `nickname` varchar(32) NOT NULL COMMENT '昵称',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `roleId` varchar(36) NOT NULL COMMENT '角色',
  `status` enum('0','1','2') NOT NULL COMMENT '状态，0:未审核、1:已审核、2:已冻结',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_d382a2ebf28781328a298b689b` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account_admin
-- ----------------------------
BEGIN;
INSERT INTO `account_admin` VALUES ('0742a067-e5f8-469d-a047-c11714d1396a', '2021-09-15 01:22:11.000000', '2021-10-22 10:33:03.932000', 'admin', 'c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec', '127.0.0.1', '183.239.50.138', '2021-10-22 10:33:03', '', '管理员', '', 'c23f3a76-c014-4d57-94e2-4306c1b5b568', '1');
COMMIT;

-- ----------------------------
-- Table structure for account_user
-- ----------------------------
DROP TABLE IF EXISTS `account_user`;
CREATE TABLE `account_user` (
  `id` char(36) NOT NULL,
  `create_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `username` varchar(32) NOT NULL COMMENT '用户名',
  `password` varchar(128) NOT NULL COMMENT '密码',
  `reg_ip` varchar(15) DEFAULT NULL COMMENT '注册IP',
  `login_ip` varchar(15) DEFAULT NULL COMMENT '登录IP',
  `login_date` datetime DEFAULT NULL COMMENT '登录时间',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机号',
  `nickname` varchar(32) NOT NULL COMMENT '昵称',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_31f1513019d5c46095dfe64c68` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for admin_role
-- ----------------------------
DROP TABLE IF EXISTS `admin_role`;
CREATE TABLE `admin_role` (
  `id` char(36) NOT NULL,
  `create_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `name` varchar(255) NOT NULL COMMENT '角色名称',
  `permissions` text NOT NULL COMMENT '权限配置',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_role
-- ----------------------------
BEGIN;
INSERT INTO `admin_role` VALUES ('bd460738-b4c7-46e8-93fb-5088fb500a00', '2021-09-15 01:44:44.866892', '2021-09-15 01:44:44.866892', '管理员', '{\"account\":{\"adminRole\":{\"query\":true,\"create\":false,\"update\":false,\"delete\":false},\"admin\":{\"query\":true,\"create\":false,\"update\":false,\"delete\":false},\"user\":{\"query\":true,\"create\":true,\"update\":true,\"delete\":true}},\"infos\":{\"category\":{\"query\":true,\"create\":true,\"update\":true,\"delete\":true},\"article\":{\"query\":true,\"create\":true,\"update\":true,\"delete\":true}},\"system\":{\"files\":{\"query\":true,\"create\":true,\"update\":true,\"delete\":true}}}');
INSERT INTO `admin_role` VALUES ('c23f3a76-c014-4d57-94e2-4306c1b5b568', '2021-09-15 01:21:15.000000', '2021-09-16 17:31:52.407000', '超级管理员', '{\"account\":{\"adminRole\":{\"query\":true,\"create\":true,\"update\":true,\"delete\":true},\"admin\":{\"query\":true,\"create\":true,\"update\":true,\"delete\":true},\"user\":{\"query\":true,\"create\":true,\"update\":true,\"delete\":true}},\"infos\":{\"category\":{\"query\":true,\"create\":true,\"update\":true,\"delete\":true},\"article\":{\"query\":true,\"create\":true,\"update\":true,\"delete\":true},\"maintenanceReport\":{\"query\":true,\"create\":true,\"update\":true,\"delete\":true}}}');
INSERT INTO `admin_role` VALUES ('f0ff6b0c-2794-4ba2-a69f-4d705ce74e0e', '2021-09-15 01:45:06.309994', '2021-09-15 01:45:06.309994', '游客', '{\"account\":{\"adminRole\":{\"query\":true,\"create\":false,\"update\":false,\"delete\":false},\"admin\":{\"query\":true,\"create\":false,\"update\":false,\"delete\":false},\"user\":{\"query\":true,\"create\":false,\"update\":false,\"delete\":false}},\"infos\":{\"category\":{\"query\":true,\"create\":false,\"update\":false,\"delete\":false},\"article\":{\"query\":true,\"create\":false,\"update\":false,\"delete\":false}},\"system\":{\"files\":{\"query\":true,\"create\":false,\"update\":false,\"delete\":false}}}');
COMMIT;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` char(36) NOT NULL,
  `create_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `title` varchar(255) NOT NULL COMMENT '标题',
  `icon` varchar(255) DEFAULT NULL COMMENT '图标',
  `priority` int(11) NOT NULL DEFAULT '0' COMMENT '优先级',
  `status` enum('0','1') NOT NULL COMMENT '状态，0:隐藏、1:显示',
  `pictureGroup` text COMMENT '图组',
  `summary` varchar(255) DEFAULT NULL COMMENT '简介',
  `content` text COMMENT '内容',
  `hot` int(11) NOT NULL DEFAULT '0' COMMENT '热度',
  `categoryId` varchar(36) DEFAULT NULL COMMENT '分类ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` char(36) NOT NULL,
  `create_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `title` varchar(255) NOT NULL COMMENT '标题',
  `icon` varchar(255) DEFAULT NULL COMMENT '图标',
  `priority` int(11) NOT NULL DEFAULT '0' COMMENT '优先级',
  `status` enum('0','1') NOT NULL COMMENT '状态，0:隐藏、1:显示',
  `parentId` varchar(36) DEFAULT NULL COMMENT '上级ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-09-05 16:41:26

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5042 (class 1262 OID 24745)
-- Name: dbcloudloom; Type: DATABASE; Schema: -; Owner: cloudloom
--

CREATE DATABASE dbcloudloom WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.936';


ALTER DATABASE dbcloudloom OWNER TO cloudloom;

\connect dbcloudloom

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5021 (class 0 OID 25568)
-- Dependencies: 225
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: cloudloom
--

INSERT INTO public.bookings VALUES ('75a4152a-5359-4565-a53e-1059671aeedc', NULL, 'hello', 'hello@example.com', '123456789', 'hello world', '2025-09-02', '10:00:00', 1, 30.00, 'pending', '2025-08-29 11:52:22.772892+01', NULL, NULL, 'IR-20250829-001', 'time_slot_only', NULL, '2025-08-29 11:52:22.772892+01', NULL, NULL);
INSERT INTO public.bookings VALUES ('87cf622e-64fe-4508-8d59-67b57d75aac5', NULL, 'hello', 'hello@example.com', '123456789', 'hello world', '2025-09-02', '10:00:00', 1, 30.00, 'pending', '2025-08-29 12:00:58.485522+01', NULL, NULL, 'IR-20250829-002', 'time_slot_only', NULL, '2025-08-29 12:00:58.485522+01', NULL, NULL);
INSERT INTO public.bookings VALUES ('ed42c259-d457-4d7d-83a6-4e1572da6e14', NULL, 'hello', 'hello@example.com', '123456789', 'hello world', '2025-09-05', '10:00:00', 1, 30.00, 'pending', '2025-08-29 12:01:49.312795+01', NULL, NULL, 'IR-20250829-003', 'time_slot_only', NULL, '2025-08-29 12:01:49.312795+01', NULL, NULL);
INSERT INTO public.bookings VALUES ('dc1a4c7f-43dc-4af0-8fc6-1664439c100a', NULL, '李四', 'lisi@email.com', '18702101610', '我是李四', '2024-03-15', '10:00:00', 1, 89.99, 'pending', '2025-08-24 11:48:51.005721+01', '10:00 - 11:30', 1, 'IR-20250824-002', 'standard', NULL, '2025-08-24 12:11:20.19448+01', NULL, '2025-08-24 13:01:38.331+01');
INSERT INTO public.bookings VALUES ('f03d4aa0-ce6b-4571-865e-76f8c8f46a64', '8543d918-3516-4e12-bc0c-aff4b7bd7f43', '李四', 'lisi@email.com', '18702101610', '我是李四', '2021-03-15', '10:00:00', 3, 89.99, 'pending', '2025-08-23 03:41:12.210172+01', '10:00 - 11:30', NULL, 'IR-20251225-001', 'standard', NULL, '2025-08-24 13:35:44.546+01', NULL, NULL);
INSERT INTO public.bookings VALUES ('a725b44f-05ff-4f4b-9375-b1a343e2852b', NULL, '李四', 'lisi@email.com', '18702101610', '我是李四,再次预约', '2025-09-15', '10:00:00', 1, 89.99, 'cancelled', '2025-08-24 13:07:31.404247+01', '14:00 - 16:30', 1, 'IR-20250824-003', 'standard', NULL, '2025-08-24 13:07:31.404247+01', NULL, '2025-08-24 13:42:37.241+01');
INSERT INTO public.bookings VALUES ('7ae7955d-bd07-438c-ac0d-9a607f6bd6d0', NULL, '翠花', 'cuihua@email.com', '18702101610', '美丽大方', '2025-12-30', '19:00:00', 1, 100.00, 'pending', '2025-08-24 14:03:37.783301+01', '19:00 - 22:30', 1, 'IR-20250824-006', 'standard', NULL, '2025-08-24 14:03:37.783301+01', NULL, NULL);
INSERT INTO public.bookings VALUES ('51f29fbf-948b-437b-9f27-452c4bc6f827', NULL, '李四', 'lisi@email.com', '18702101610', '这次预约侠客装扮的汉服', '2025-11-23', '12:00:00', 1, 89.99, 'cancelled', '2025-08-24 13:59:07.692608+01', '12:00 - 13:30', 1, 'IR-20250824-004', 'standard', NULL, '2025-08-24 13:59:07.692608+01', '2025-08-24 14:04:03.606+01', NULL);
INSERT INTO public.bookings VALUES ('e66b38b3-4a72-4745-a55c-a03a29b82686', NULL, 'wangwu', 'wangwu@email.com', '18702101610', 'hello world', '2025-10-24', '19:00:00', 1, 100.00, 'pending', '2025-08-25 00:36:10.489018+01', '19:00 - 22:30', 1, 'IR-20250824-007', 'standard', NULL, '2025-08-25 00:36:10.489018+01', NULL, NULL);
INSERT INTO public.bookings VALUES ('ccfc49ae-9b03-4835-ae13-e8fdf43c97d1', NULL, '李四', 'lisi@email.com', '18702101610', '我是李四', '2021-03-15', '09:00:00', 1, 29.00, 'deleted', '2025-08-24 14:02:13.994959+01', '10:00 - 11:30', 1, 'IR-20250824-005', 'standard', NULL, '2025-08-25 00:41:15.24+01', '2025-08-25 01:20:57.887+01', NULL);
INSERT INTO public.bookings VALUES ('0ae0e28f-2d1c-441d-b632-3faab459fe66', NULL, 'aaa', 'aaa', NULL, '测试时段预约', '2025-08-27', '10:00:00', 1, 30.00, 'pending', '2025-08-25 15:12:09.044119+01', NULL, NULL, 'IR-20250825-001', 'time_slot_only', NULL, '2025-08-25 15:12:09.044119+01', NULL, NULL);
INSERT INTO public.bookings VALUES ('4cbd265e-bb98-4fdc-a976-407d54e7dce6', NULL, 'bbb', 'bbb@bbb.com', '18702101610', '', '2025-08-29', '10:00:00', 1, 30.00, 'pending', '2025-08-25 22:45:07.870543+01', NULL, NULL, 'IR-20250825-002', 'time_slot_only', NULL, '2025-08-25 22:45:07.870543+01', NULL, NULL);
INSERT INTO public.bookings VALUES ('b60b32bb-37e5-4915-beda-fae4db4b95e7', NULL, 'bbb', 'bbb@bbb.com', '18702101610', '', '2025-08-29', '10:00:00', 1, 30.00, 'pending', '2025-08-25 23:24:11.77206+01', NULL, NULL, 'IR-20250825-003', 'time_slot_only', NULL, '2025-08-25 23:24:11.77206+01', NULL, NULL);
INSERT INTO public.bookings VALUES ('b0f05b00-134e-4858-b3dc-dae6e4d6f195', NULL, 'bbb', 'bbb@bbb.com', '111111111', '', '2025-08-22', '10:00:00', 1, 30.00, 'pending', '2025-08-25 23:26:24.552438+01', NULL, NULL, 'IR-20250825-004', 'time_slot_only', NULL, '2025-08-25 23:26:24.552438+01', NULL, NULL);
INSERT INTO public.bookings VALUES ('3baa4011-c748-4156-b864-39db9b4e7fbc', NULL, 'ddd', 'ddd@ddd.com', '111111111', 'ddddddddddd', '2025-09-04', '11:30:00', 1, 30.00, 'pending', '2025-08-25 23:27:28.780429+01', NULL, NULL, 'IR-20250825-005', 'time_slot_only', NULL, '2025-08-25 23:27:28.780429+01', NULL, NULL);
INSERT INTO public.bookings VALUES ('3a21f3d8-eb2e-48a3-a4bd-eb0e3c56ca6a', NULL, 'ddd', 'ddd@ddd.com', '111111111', 'ddddddddddd', '2025-09-04', '11:30:00', 1, 30.00, 'pending', '2025-08-25 23:30:08.906928+01', NULL, NULL, 'IR-20250825-006', 'time_slot_only', NULL, '2025-08-25 23:30:08.906928+01', NULL, NULL);
INSERT INTO public.bookings VALUES ('f9d313f1-6042-4e50-8b96-11f78139782b', NULL, 'eeee', 'eeee@eeee.com', '122222222', 'd帆帆帆帆帆帆帆帆帆帆', '2025-08-27', '10:00:00', 1, 30.00, 'pending', '2025-08-25 23:43:48.677204+01', NULL, NULL, 'IR-20250825-007', 'time_slot_only', NULL, '2025-08-25 23:43:48.677204+01', NULL, NULL);
INSERT INTO public.bookings VALUES ('eac83398-1521-45cd-938b-2c06fffaa70e', NULL, 'qqqq', 'qqqq@example.com', '123456789', '无要求啊啊啊啊啊啊', '2025-09-06', '10:00:00', 1, 30.00, 'pending', '2025-08-25 23:53:24.668236+01', NULL, NULL, 'IR-20250825-008', 'time_slot_only', NULL, '2025-08-25 23:53:24.668236+01', NULL, NULL);
INSERT INTO public.bookings VALUES ('24c05783-5dab-4558-8cbd-80a24bd347e6', NULL, 'ssss', 'sss@example.com', '123456789', '预约预约测试测试', '2025-08-15', '10:00:00', 1, 30.00, 'pending', '2025-08-25 23:58:34.401951+01', NULL, NULL, 'IR-20250825-009', 'time_slot_only', NULL, '2025-08-25 23:58:34.401951+01', NULL, NULL);
INSERT INTO public.bookings VALUES ('9d79d83a-8766-4191-ad67-e943d33a0ae7', NULL, 'fff', 'fff@example.com', '111333444', 'ggsg个报告违规湖人和台湾特务', '2025-08-01', '10:00:00', 1, 30.00, 'pending', '2025-08-26 00:12:41.185155+01', NULL, NULL, 'IR-20250825-010', 'time_slot_only', NULL, '2025-08-26 00:12:41.185155+01', NULL, NULL);
INSERT INTO public.bookings VALUES ('5f4a1efa-e181-43dc-97ed-03935f0f0999', NULL, '老王', 'laowang@example.com', '111334556', '老外老王来了', '2025-08-16', '10:00:00', 1, 30.00, 'pending', '2025-08-26 00:17:02.181495+01', NULL, NULL, 'IR-20250825-011', 'time_slot_only', NULL, '2025-08-26 00:17:02.181495+01', NULL, NULL);


--
-- TOC entry 5016 (class 0 OID 25531)
-- Dependencies: 220
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: cloudloom
--

INSERT INTO public.categories VALUES (1, '汉服上衣', '各种款式的汉服上衣，如襦、衫、袄等。', NULL, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', true);
INSERT INTO public.categories VALUES (2, '汉服下装', '各种款式的汉服下装，如裙、裤等。', NULL, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', true);
INSERT INTO public.categories VALUES (3, '汉服套装', '完整的汉服套装，包含上衣和下装。', NULL, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', true);
INSERT INTO public.categories VALUES (4, '配饰', '与汉服搭配的首饰、发饰、包袋等。', NULL, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', true);
INSERT INTO public.categories VALUES (5, '鞋履', '搭配汉服的鞋子。', NULL, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', true);
INSERT INTO public.categories VALUES (6, '主题活动', '提供租赁、主题派对、摄影服务等。', NULL, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', true);


--
-- TOC entry 5023 (class 0 OID 25615)
-- Dependencies: 227
-- Data for Name: collaboration_applications; Type: TABLE DATA; Schema: public; Owner: cloudloom
--

INSERT INTO public.collaboration_applications VALUES ('6d71fea6-a5bb-414f-89e0-516fd58eceab', '王总', '传统文化传媒', 'wang@culture.com', '13800138001', '商业合作', 'contacted', '2025-08-23 03:41:12.210172+01', NULL);
INSERT INTO public.collaboration_applications VALUES ('3ba3d639-b96d-4e73-a7bc-27ab618bc553', '赵女士', '婚礼策划公司', 'zhao@wedding.com', '13900139002', '婚庆合作', 'pending', '2025-08-23 03:41:12.210172+01', NULL);


--
-- TOC entry 5033 (class 0 OID 27088)
-- Dependencies: 237
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: cloudloom
--

INSERT INTO public.migrations VALUES (2, 1756895959204, 'AddSurveyResponseTable1756895959204');
INSERT INTO public.migrations VALUES (3, 1756899204052, 'UpdateResponseTable1756899204052');
INSERT INTO public.migrations VALUES (4, 1757070397814, 'UpdateSurvey1757070397814');
INSERT INTO public.migrations VALUES (5, 1757071158313, 'SurveyAndResponse1757071158313');
INSERT INTO public.migrations VALUES (6, 1757073921739, 'UpdateResponsTable1757073921739');


--
-- TOC entry 5028 (class 0 OID 27010)
-- Dependencies: 232
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: cloudloom
--

INSERT INTO public.permissions VALUES (1, 'manage_users', '用户管理', '2025-08-29 20:10:02.216276');
INSERT INTO public.permissions VALUES (2, 'manage_roles', '角色管理', '2025-08-29 20:10:02.216276');
INSERT INTO public.permissions VALUES (3, 'manage_permissions', '权限管理', '2025-08-29 20:10:02.216276');
INSERT INTO public.permissions VALUES (4, 'view_orders', '查看订单', '2025-08-29 20:10:02.216276');
INSERT INTO public.permissions VALUES (5, 'manage_orders', '订单管理', '2025-08-29 20:10:02.216276');
INSERT INTO public.permissions VALUES (6, 'view_products', '查看产品', '2025-08-29 20:10:02.216276');
INSERT INTO public.permissions VALUES (7, 'manage_products', '产品管理', '2025-08-29 20:10:02.216276');
INSERT INTO public.permissions VALUES (8, 'view_customers', '查看客户', '2025-08-29 20:10:02.216276');
INSERT INTO public.permissions VALUES (9, 'manage_customers', '客户管理', '2025-08-29 20:10:02.216276');
INSERT INTO public.permissions VALUES (10, 'view_reports', '查看报表', '2025-08-29 20:10:02.216276');
INSERT INTO public.permissions VALUES (11, 'manage_content', '内容管理', '2025-08-29 20:10:02.216276');


--
-- TOC entry 5018 (class 0 OID 25542)
-- Dependencies: 222
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: cloudloom
--

INSERT INTO public.products VALUES (2, '汉服主题摄影套餐', '专业摄影师提供汉服主题摄影服务，包含妆造、服装和精修照片。', '不限', 250.00, 20, '[{"key": "时长", "value": "2小时"}, {"key": "包含", "value": "妆造+服装+照片"}]', 30, true, 999, 'General', NULL, '["摄影", "服务", "主题"]', '["url_to_image_48.jpg"]', '[]', '无', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'unisex');
INSERT INTO public.products VALUES (3, '生日主题派对定制', '定制汉服主题生日派对，提供场地布置、汉服租赁、妆造和活动策划。', '不限', 500.00, 21, '[{"key": "人数", "value": "5-10人"}, {"key": "包含", "value": "场地+服装+妆造"}]', 10, true, 999, 'General', NULL, '["派对", "定制", "服务"]', '["url_to_image_49.jpg"]', '[]', '无', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'unisex');
INSERT INTO public.products VALUES (4, '情侣汉服写真', '情侣专属汉服写真套餐，包含两套汉服及配饰，专业摄影师拍摄。', '不限', 350.00, 20, '[{"key": "时长", "value": "2小时"}, {"key": "包含", "value": "双人服装+妆造+照片"}]', 15, true, 999, 'General', NULL, '["写真", "情侣", "服务"]', '["url_to_image_50.jpg"]', '[]', '无', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'unisex');
INSERT INTO public.products VALUES (5, '毕业季汉服团拍', '为毕业生提供汉服团拍服务，可根据人数定制套餐。', '不限', 150.00, 20, '[{"key": "人数", "value": "10人以上"}, {"key": "包含", "value": "服装+摄影"}]', 8, true, 999, 'General', NULL, '["团拍", "毕业", "服务"]', '["url_to_image_51.jpg"]', '[]', '无', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'unisex');
INSERT INTO public.products VALUES (6, '花鸟刺绣发簪', '以花鸟为主题的刺绣发簪，手工精细，点缀发间。', '唐', 80.00, 14, '[{"key": "工艺", "value": "手工刺绣"}]', 40, true, 50, 'Tang', '合金、刺绣布料', '["发簪", "刺绣", "女装"]', '["url_to_image_37.jpg"]', '[]', '避免接触水和化学品', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (7, '凤凰步摇', '金属凤凰造型步摇，佩戴时随步履摇动，灵动典雅。', '宋', 120.00, 15, '[{"key": "工艺", "value": "金属雕刻"}]', 30, true, 30, 'Song', '合金、琉璃珠', '["步摇", "凤凰", "女装"]', '["url_to_image_38.jpg"]', '[]', '避免接触水和化学品', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (8, '素雅披帛', '素色长款披帛，材质轻薄，可搭配多种汉服。', '魏晋', 60.00, 16, '[{"key": "尺寸", "value": "200cm x 50cm"}]', 25, true, 60, 'Wei-Jin', '雪纺', '["披帛", "素色", "中性"]', '["url_to_image_39.jpg"]', '[]', '建议手洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'unisex');
INSERT INTO public.products VALUES (9, '玉兰花发冠', '以玉兰花为主题的发冠，适合搭配明制或宋制汉服。', '明', 150.00, 14, '[{"key": "工艺", "value": "雕刻"}]', 18, true, 20, 'Ming', '合金、树脂', '["发冠", "玉兰", "女装"]', '["url_to_image_40.jpg"]', '[]', '避免接触水和化学品', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (10, '流苏步摇', '多层流苏设计，行走时灵动飘逸，有多种颜色可选。', '唐', 90.00, 15, '[{"key": "工艺", "value": "手工流苏"}]', 32, true, 45, 'Tang', '合金、丝线', '["步摇", "流苏", "女装"]', '["url_to_image_41.jpg"]', '[]', '避免拉扯', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (11, '刺绣香囊', '手工刺绣香囊，内含天然香料，可佩戴在腰间。', '宋', 45.00, 16, '[{"key": "气味", "value": "薰衣草"}]', 50, true, 70, 'Song', '棉布、天然香料', '["香囊", "刺绣", "中性"]', '["url_to_image_42.jpg"]', '[]', '保持干燥', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'unisex');
INSERT INTO public.products VALUES (12, '梅花发簪', '以梅花为造型的发簪，简约而不失雅致。', '宋', 70.00, 14, '[{"key": "工艺", "value": "镂空雕刻"}]', 38, true, 55, 'Song', '金属', '["发簪", "梅花", "女装"]', '["url_to_image_43.jpg"]', '[]', '避免接触水', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (13, '云纹披帛', '带有云纹刺绣的披帛，增加汉服的层次感。', '明', 75.00, 16, '[{"key": "工艺", "value": "刺绣"}]', 28, true, 48, 'Ming', '仿真丝', '["披帛", "云纹", "中性"]', '["url_to_image_44.jpg"]', '[]', '建议干洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'unisex');
INSERT INTO public.products VALUES (15, '珍珠步摇', '以珍珠为主体的步摇，华丽贵气，适合搭配唐制汉服。', '唐', 150.00, 15, '[{"key": "材质", "value": "淡水珍珠"}]', 20, true, 30, 'Tang', '合金、珍珠', '["步摇", "珍珠", "女装"]', '["url_to_image_46.jpg"]', '[]', '避免接触化学品', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (18, '唐制·破裙', '唐制破裙，由多片不同颜色的布料拼接而成，色彩丰富。', '唐', 320.00, 8, '[{"key": "款式", "value": "破裙"}]', 15, true, 30, 'Tang', '棉麻', '["唐制", "破裙", "女装"]', '["url_to_image_29.jpg"]', '[{"desc": "裙长90cm", "size": "M"}]', '建议手洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (19, '明制·片裙', '明制片裙，剪裁简单，可搭配多种上衣。', '明', 250.00, 6, '[{"key": "款式", "value": "片裙"}]', 18, true, 45, 'Ming', '棉布', '["明制", "片裙", "女装"]', '["url_to_image_30.jpg"]', '[{"desc": "裙长95cm", "size": "M"}]', '可机洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (20, '宋制·褶裙', '宋制褶裙，褶子清晰，版型挺括，适合日常穿着。', '宋', 290.00, 7, '[{"key": "款式", "value": "褶裙"}]', 10, true, 35, 'Song', '棉麻', '["宋制", "褶裙", "女装"]', '["url_to_image_31.jpg"]', '[{"desc": "裙长90cm", "size": "M"}]', '建议手洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (21, '唐制·高腰裙', '唐制高腰裙，裙摆飘逸，穿着时拉长身材比例。', '唐', 280.00, 8, '[{"key": "款式", "value": "高腰裙"}]', 25, true, 40, 'Tang', '雪纺', '["唐制", "高腰裙", "女装"]', '["url_to_image_32.jpg"]', '[{"desc": "裙长100cm", "size": "M"}]', '建议手洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (22, '明制·马面裙(男款)', '男士马面裙，版型简约，适合搭配男款汉服穿着。', '明', 380.00, 6, '[{"key": "款式", "value": "马面裙"}]', 8, true, 15, 'Ming', '棉麻', '["明制", "马面裙", "男装"]', '["url_to_image_33.jpg"]', '[{"desc": "腰围85cm", "size": "L"}]', '建议手洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'male');
INSERT INTO public.products VALUES (16, '明制·马面裙', '明制马面裙，前后光面，侧面打褶，裙门有精致刺绣。', '明', 350.00, 6, '[{"key": "款式", "value": "马面裙"}, {"key": "工艺", "value": "刺绣"}]', 35, true, 40, 'Ming', '织锦缎', '["明制", "马面裙", "女装"]', '["25dd099b-3f8e-4fd8-8491-205883e40f04.jpg", "13f8ea13-3660-4106-8bd1-8c8d7d99f7b5.jpg"]', '[{"desc": "裙长95cm", "size": "M"}]', '建议干洗', '2025-09-01 14:20:27.455215', '2025-09-04 19:53:45.41646', 'female');
INSERT INTO public.products VALUES (17, '宋制·百迭裙', '宋制百迭裙，裙身有大量细密褶子，行走时摇曳生姿。', '宋', 280.00, 7, '[{"key": "款式", "value": "百迭裙"}]', 22, true, 50, 'Song', '雪纺', '["宋制", "百迭裙", "女装"]', '[]', '[{"desc": "裙长90cm", "size": "M"}]', '建议手洗', '2025-09-01 14:20:27.455215', '2025-09-04 19:54:03.959618', 'female');
INSERT INTO public.products VALUES (23, '宋制·百迭裙(男款)', '男士百迭裙，褶子整齐，适合日常休闲。', '宋', 300.00, 7, '[{"key": "款式", "value": "百迭裙"}]', 7, true, 20, 'Song', '棉布', '["宋制", "百迭裙", "男装"]', '["url_to_image_34.jpg"]', '[{"desc": "腰围85cm", "size": "L"}]', '可机洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'male');
INSERT INTO public.products VALUES (24, '唐制·破裙(男款)', '男士破裙，由多片布料拼接，颜色沉稳。', '唐', 350.00, 8, '[{"key": "款式", "value": "破裙"}]', 5, true, 18, 'Tang', '麻', '["唐制", "破裙", "男装"]', '["url_to_image_35.jpg"]', '[{"desc": "腰围85cm", "size": "L"}]', '建议手洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'male');
INSERT INTO public.products VALUES (25, '明制·百褶裙', '明制百褶裙，褶子细密，裙身轻盈，可搭配多种上衣。', '明', 280.00, 7, '[{"key": "款式", "value": "百褶裙"}]', 13, true, 30, 'Ming', '雪纺', '["明制", "百褶裙", "女装"]', '["url_to_image_36.jpg"]', '[{"desc": "裙长90cm", "size": "M"}]', '建议手洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (26, '明制·交领上袄', '明制交领上袄，款式修身，可搭配马面裙穿着。', '明', 250.00, 5, '[{"key": "款式", "value": "交领"}]', 12, true, 30, 'Ming', '棉布', '["明制", "上袄", "女装"]', '["url_to_image_17.jpg"]', '[{"size": "S"}, {"size": "M"}]', '可机洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (27, '唐制·对襟上襦', '唐制对襟上襦，色彩亮丽，版型宽松，适合搭配齐胸裙穿着。', '唐', 180.00, 3, '[{"key": "款式", "value": "对襟"}]', 25, true, 45, 'Tang', '雪纺', '["唐制", "上襦", "女装"]', '["url_to_image_18.jpg"]', '[{"size": "S"}, {"size": "M"}]', '建议手洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (28, '宋制·褙子', '宋制褙子，轻薄透气，剪裁简约，可作为外衫穿着。', '宋', 280.00, 3, '[{"key": "款式", "value": "对襟"}]', 18, true, 28, 'Song', '麻', '["宋制", "褙子", "中性"]', '["url_to_image_19.jpg"]', '[{"size": "M"}, {"size": "L"}]', '建议手洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'unisex');
INSERT INTO public.products VALUES (29, '魏晋·大袖中衣', '魏晋风大袖中衣，轻薄透气，可作为内搭或单独穿着。', '魏晋', 220.00, 4, '[{"key": "款式", "value": "交领"}]', 10, true, 38, 'Wei-Jin', '棉布', '["魏晋", "中衣", "男装"]', '["url_to_image_20.jpg"]', '[{"size": "L"}, {"size": "XL"}]', '可机洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'male');
INSERT INTO public.products VALUES (30, '明制·立领上袄', '明制立领上袄，领口挺立，搭配琵琶袖，展现干练气质。', '明', 270.00, 5, '[{"key": "款式", "value": "立领"}]', 15, true, 25, 'Ming', '棉麻', '["明制", "上袄", "女装"]', '["url_to_image_21.jpg"]', '[{"size": "S"}, {"size": "M"}]', '建议手洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (31, '唐制·坦领上襦', '唐制坦领上襦，领口宽大，适合夏季穿着，清凉舒适。', '唐', 190.00, 3, '[{"key": "款式", "value": "坦领"}]', 22, true, 40, 'Tang', '棉布', '["唐制", "坦领", "女装"]', '["url_to_image_22.jpg"]', '[{"size": "S"}, {"size": "M"}]', '可机洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (32, '宋制·圆领袍', '宋制圆领袍，简洁大方，适合日常穿着，可搭配裤子或裙子。', '宋', 320.00, 4, '[{"key": "款式", "value": "圆领"}]', 14, true, 20, 'Song', '棉麻', '["宋制", "圆领袍", "男装"]', '["url_to_image_23.jpg"]', '[{"size": "L"}, {"size": "XL"}]', '建议手洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'male');
INSERT INTO public.products VALUES (33, '魏晋·交领上衫', '魏晋交领上衫，版型宽松，面料轻薄，飘逸感十足。', '魏晋', 240.00, 4, '[{"key": "款式", "value": "交领"}]', 19, true, 33, 'Wei-Jin', '雪纺', '["魏晋", "上衫", "中性"]', '["url_to_image_24.jpg"]', '[{"size": "M"}, {"size": "L"}]', '建议手洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'unisex');
INSERT INTO public.products VALUES (34, '明制·竖领上袄', '明制竖领上袄，款式修身，领口竖立，可搭配马面裙。', '明', 260.00, 5, '[{"key": "款式", "value": "竖领"}]', 11, true, 27, 'Ming', '棉布', '["明制", "上袄", "女装"]', '["url_to_image_25.jpg"]', '[{"size": "S"}, {"size": "M"}]', '可机洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (35, '唐制·交领上襦', '唐制交领上襦，线条流畅，剪裁合身，适合多种场合。', '唐', 210.00, 4, '[{"key": "款式", "value": "交领"}]', 16, true, 30, 'Tang', '仿真丝', '["唐制", "上襦", "女装"]', '["url_to_image_26.jpg"]', '[{"size": "S"}, {"size": "M"}]', '建议干洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (36, '明制·朱红交领袄裙套装', '明制汉服，朱红色交领上袄搭配马面裙，端庄典雅，适合正式场合穿着。', '明', 599.00, 10, '[{"key": "款式", "value": "明制袄裙"}, {"key": "工艺", "value": "刺绣"}]', 15, true, 20, 'Ming', '织锦缎', '["明制", "袄裙", "朱红", "套装", "女装"]', '["url_to_image_1.jpg", "url_to_image_2.jpg"]', '[{"desc": "胸围88cm", "size": "S"}, {"desc": "胸围92cm", "size": "M"}]', '建议干洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (37, '唐制·齐胸襦裙套装', '唐制齐胸襦裙，裙摆飘逸，色彩绚丽，展现盛唐风韵。', '唐', 450.00, 11, '[{"key": "款式", "value": "唐制齐胸襦裙"}, {"key": "面料", "value": "轻薄雪纺"}]', 28, true, 35, 'Tang', '雪纺', '["唐制", "齐胸", "襦裙", "女装"]', '["url_to_image_3.jpg"]', '[{"desc": "胸围86cm", "size": "S"}, {"desc": "胸围90cm", "size": "M"}]', '建议手洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (38, '宋制·褙子汉服套装', '宋制褙子套装，风格简约雅致，上衣为对襟褙子，下搭百迭裙。', '宋', 480.00, 9, '[{"key": "款式", "value": "宋制褙子"}, {"key": "面料", "value": "棉麻混纺"}]', 10, true, 25, 'Song', '棉麻', '["宋制", "褙子", "百迭裙", "女装"]', '["url_to_image_4.jpg"]', '[{"desc": "胸围88cm", "size": "S"}, {"desc": "胸围92cm", "size": "M"}]', '建议手洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (39, '魏晋风·长衫套装', '魏晋风宽袍大袖，飘逸洒脱，以素雅颜色为主，尽显名士风范。', '魏晋', 620.00, 12, '[{"key": "款式", "value": "魏晋长衫"}, {"key": "面料", "value": "仿真丝"}]', 8, true, 15, 'Wei-Jin', '仿真丝', '["魏晋", "长衫", "飘逸", "男装"]', '["url_to_image_5.jpg"]', '[{"desc": "身高175cm", "size": "L"}, {"desc": "身高180cm", "size": "XL"}]', '建议干洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'male');
INSERT INTO public.products VALUES (40, '汉制·曲裾深衣', '汉制曲裾深衣，层层环绕，线条流畅，展现汉代服饰的古朴厚重。', '汉', 750.00, 13, '[{"key": "款式", "value": "汉制曲裾深衣"}, {"key": "面料", "value": "棉麻混纺"}]', 5, true, 12, 'Han', '棉麻', '["汉制", "曲裾", "深衣", "女装"]', '["url_to_image_6.jpg"]', '[{"desc": "身高165cm", "size": "M"}]', '建议手洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (41, '明制·比甲套装', '明制比甲套装，比甲搭配交领上衣和马面裙，简洁干练。', '明', 550.00, 10, '[{"key": "款式", "value": "明制比甲"}, {"key": "面料", "value": "棉麻"}]', 12, true, 22, 'Ming', '棉麻', '["明制", "比甲", "马面裙", "女装"]', '["url_to_image_7.jpg"]', '[{"desc": "胸围88cm", "size": "S"}, {"desc": "胸围92cm", "size": "M"}]', '建议手洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (42, '唐制·坦领套装', '唐制坦领，大胆开放的风格，搭配高腰下裙，尽显富贵华丽。', '唐', 480.00, 11, '[{"key": "款式", "value": "唐制坦领"}, {"key": "面料", "value": "丝绸"}]', 20, true, 30, 'Tang', '丝绸', '["唐制", "坦领", "高腰", "女装"]', '["url_to_image_8.jpg"]', '[{"desc": "胸围86cm", "size": "S"}, {"desc": "胸围90cm", "size": "M"}]', '建议干洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (43, '宋制·圆领袍套装', '宋制圆领袍，简洁大方，适合日常穿着，也适合男士。', '宋', 580.00, 9, '[{"key": "款式", "value": "宋制圆领袍"}, {"key": "面料", "value": "棉布"}]', 18, true, 18, 'Song', '棉布', '["宋制", "圆领袍", "男装"]', '["url_to_image_9.jpg"]', '[{"desc": "身高175cm", "size": "L"}, {"desc": "身高180cm", "size": "XL"}]', '可机洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'male');
INSERT INTO public.products VALUES (44, '汉制·直裾套装', '汉制直裾，剪裁流畅，风格古朴，展现汉代的风骨。', '汉', 680.00, 13, '[{"key": "款式", "value": "汉制直裾"}, {"key": "面料", "value": "麻"}]', 7, true, 10, 'Han', '麻', '["汉制", "直裾", "男装"]', '["url_to_image_10.jpg"]', '[{"desc": "身高175cm", "size": "L"}]', '建议干洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'male');
INSERT INTO public.products VALUES (45, '魏晋风·交领中衣套装', '魏晋风交领中衣，内搭款式，轻薄透气，可搭配外衫穿着。', '魏晋', 350.00, 12, '[{"key": "款式", "value": "魏晋中衣"}, {"key": "面料", "value": "棉布"}]', 14, true, 40, 'Wei-Jin', '棉布', '["魏晋", "中衣", "内搭", "中性"]', '["url_to_image_11.jpg"]', '[{"desc": "身高160cm", "size": "S"}, {"desc": "身高170cm", "size": "M"}]', '可机洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'unisex');
INSERT INTO public.products VALUES (46, '明制·道袍套装', '明制道袍，宽大舒适，适合日常休闲和文人雅集。', '明', 650.00, 10, '[{"key": "款式", "value": "明制道袍"}, {"key": "面料", "value": "棉麻"}]', 9, true, 15, 'Ming', '棉麻', '["明制", "道袍", "男装"]', '["url_to_image_12.jpg"]', '[{"desc": "身高175cm", "size": "L"}, {"desc": "身高180cm", "size": "XL"}]', '建议手洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'male');
INSERT INTO public.products VALUES (47, '唐制·大袖衫套装', '唐制大袖衫，袖子宽大，走路生风，尽显贵族风范。', '唐', 780.00, 11, '[{"key": "款式", "value": "唐制大袖衫"}, {"key": "面料", "value": "仿真丝"}]', 16, true, 10, 'Tang', '仿真丝', '["唐制", "大袖衫", "女装"]', '["url_to_image_13.jpg"]', '[{"desc": "身高160cm", "size": "S"}, {"desc": "身高165cm", "size": "M"}]', '建议干洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (48, '宋制·直裾汉服', '宋制直裾，线条简洁，风格内敛，适合日常穿着。', '宋', 520.00, 9, '[{"key": "款式", "value": "宋制直裾"}, {"key": "面料", "value": "棉麻"}]', 11, true, 20, 'Song', '棉麻', '["宋制", "直裾", "中性"]', '["url_to_image_14.jpg"]', '[{"desc": "身高170cm", "size": "M"}]', '可机洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'unisex');
INSERT INTO public.products VALUES (49, '魏晋风·大袖衫套装', '魏晋风大袖衫，飘逸洒脱，搭配交领中衣和下裙。', '魏晋', 690.00, 12, '[{"key": "款式", "value": "魏晋大袖衫"}, {"key": "面料", "value": "雪纺"}]', 19, true, 13, 'Wei-Jin', '雪纺', '["魏晋", "大袖衫", "女装"]', '["url_to_image_15.jpg"]', '[{"desc": "身高165cm", "size": "M"}]', '建议手洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'female');
INSERT INTO public.products VALUES (50, '汉制·深衣套装', '汉制深衣，款式古朴，剪裁严谨，适合参加传统礼仪活动。', '汉', 880.00, 13, '[{"key": "款式", "value": "汉制深衣"}, {"key": "面料", "value": "棉麻"}]', 6, true, 8, 'Han', '棉麻', '["汉制", "深衣", "男装"]', '["url_to_image_16.jpg"]', '[{"desc": "身高175cm", "size": "L"}]', '建议干洗', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'male');
INSERT INTO public.products VALUES (1, '汉服租赁服务（3小时）', '提供3小时汉服及配饰租赁服务，包含一套汉服和基础配饰。', '不限', 50.00, 19, '[{"key": "时长", "value": "3小时"}, {"key": "包含", "value": "汉服+配饰"}]', 50, true, 999, 'General', NULL, '["租赁", "服务", "活动"]', '["girl.jpg"]', '[]', '无', '2025-09-01 14:20:27.455215', '2025-09-01 14:20:27.455215', 'unisex');


--
-- TOC entry 5020 (class 0 OID 25561)
-- Dependencies: 224
-- Data for Name: rental_periods; Type: TABLE DATA; Schema: public; Owner: cloudloom
--

INSERT INTO public.rental_periods VALUES (13, '2小时体验', 2, 'hour', 50.00);
INSERT INTO public.rental_periods VALUES (14, '4小时体验', 4, 'hour', 80.00);
INSERT INTO public.rental_periods VALUES (15, '1日租赁', 1, 'day', 120.00);
INSERT INTO public.rental_periods VALUES (16, '2日租赁', 2, 'day', 200.00);
INSERT INTO public.rental_periods VALUES (17, '3日租赁', 3, 'day', 260.00);
INSERT INTO public.rental_periods VALUES (18, '7日租赁', 7, 'day', 500.00);


--
-- TOC entry 5034 (class 0 OID 27182)
-- Dependencies: 238
-- Data for Name: responses; Type: TABLE DATA; Schema: public; Owner: cloudloom
--

INSERT INTO public.responses VALUES ('1dc36025-3836-483d-9dcc-d6ba6b3cb6f7', 1, NULL, NULL, NULL, NULL, NULL, '2025-09-05 12:29:17.934474+01', '{"channel": "微信群 / 朋友圈 (WeChat Groups / Moments)", "feedback": "", "residence": "都柏林 (Dublin)", "motivation": [], "demographics": {"age": "", "gender": "", "occupation": "", "nationality": ""}, "pricePackageA": "", "pricePackageB": "", "pricePackageC": "", "hanfuKnowledge": null, "desiredServices": [], "recognizedItems": [], "stylePreference": "", "sharingLikelihood": null, "durationPreference": ""}', NULL, NULL);
INSERT INTO public.responses VALUES ('5f554a61-6d79-42ad-9e99-5205cd528f73', 1, NULL, '', 'yzy', '', '其他国家 (I am a tourist / live in another country)', '2025-09-05 13:06:08.65963+01', '{"name": "yzy", "email": "", "phone": "", "channel": "TikTok", "feedback": "hello world", "residence": "其他国家 (I am a tourist / live in another country)", "motivation": ["寻找与自己文化根源的连接（主要针对华裔） (To connect with my own cultural roots)", "和朋友/家人/伴侣一起进行一次有趣的活动 (A fun activity to do with friends, family, or a partner)"], "demographics": {"age": "31-40", "gender": "男", "occupation": "自由职业", "nationality": "china"}, "pricePackageA": "€50 - €69", "pricePackageB": "€160 - €199", "pricePackageC": "€249 - €299", "hanfuKnowledge": null, "desiredServices": ["都柏林地标外景拍摄 (如圣三一学院、凤凰公园等) (Outdoor Photography at Dublin Landmarks)", "文化体验活动 (如茶艺、书法、古筝体验) (Cultural activities like tea ceremony, calligraphy)", "服装租赁 (Clothing Rental)"], "recognizedItems": ["Qipao (旗袍)"], "stylePreference": "华丽大气的风格（如唐制）(Grand and magnificent styles, e.g., Tang)", "sharingLikelihood": 5, "durationPreference": "2 - 3 小时"}', '31-40', '男');
INSERT INTO public.responses VALUES ('dc3880aa-2dbd-4f47-a0d5-162d6e8676e6', 1, NULL, 'emily@gmail.com', 'Emily', '', '都柏林 (Dublin)', '2025-09-05 13:10:38.582602+01', '{"name": "Emily", "email": "emily@gmail.com", "phone": "", "channel": "TikTok", "feedback": "I am Emily", "residence": "都柏林 (Dublin)", "motivation": ["寻找与自己文化根源的连接（主要针对华裔） (To connect with my own cultural roots)"], "demographics": {"age": "18岁以下", "gender": "女", "occupation": "学生", "nationality": "Ireland"}, "pricePackageA": "€39 - €49", "pricePackageB": "€200 以上", "pricePackageC": "€360 以上", "hanfuKnowledge": 5, "desiredServices": ["服装租赁 (Clothing Rental)"], "recognizedItems": ["Hanfu (汉服)"], "stylePreference": "端庄秀丽的风格（如明制）(Elegant and graceful styles, e.g., Ming)", "sharingLikelihood": 5, "durationPreference": "1小时以内"}', '18岁以下', '女');
INSERT INTO public.responses VALUES ('f6fee01e-46eb-420e-ae17-5e70e6d1db9f', 1, NULL, '', 'aaa', '', '', '2025-09-05 15:46:53.443888+01', '{"name": "aaa", "email": "", "phone": "", "channel": "", "feedback": "", "residence": "", "motivation": [], "demographics": {"age": "18-24", "gender": "Male", "occupation": "Full-time employment", "nationality": ""}, "partyInterest": "", "pricePackageA": "", "pricePackageB": "", "pricePackageC": "", "hanfuKnowledge": null, "desiredServices": [], "recognizedItems": [], "stylePreference": "", "sharingLikelihood": 3, "durationPreference": "", "ownershipPreference": ""}', '18-24', 'Male');
INSERT INTO public.responses VALUES ('990eea13-8c59-447f-9704-aca0a0a6f2a5', 1, NULL, '', 'bbb', '', 'Dublin', '2025-09-05 16:03:29.185662+01', '{"channel": "Friend''s Recommendation", "feedback": "gggg hhh死而复生给\n发的地方很近\n烦得很东方红就wwwwwwwwwwwwwwwqq所谓儿童WWWWWWWW\nDDDDDDDD\nDGH", "motivation": ["To connect with my own cultural roots (mainly for people of Chinese descent)", "A fun activity to do with friends, family, or a partner", "To celebrate a special occasion (e.g., birthday, anniversary, graduation)"], "partyInterest": "interested", "pricePackageA": "€50 - €69", "pricePackageB": "€160 - €199", "pricePackageC": "€249 - €299", "hanfuKnowledge": 4, "desiredServices": ["activities", "photographer"], "recognizedItems": ["Modern Wear"], "stylePreference": "Grand and magnificent styles (e.g., Tang)", "sharingLikelihood": 3, "durationPreference": "2 - 3 hours", "ownershipPreference": ""}', 'Under 18', 'Female');


--
-- TOC entry 5029 (class 0 OID 27021)
-- Dependencies: 233
-- Data for Name: role_permissions; Type: TABLE DATA; Schema: public; Owner: cloudloom
--



--
-- TOC entry 5025 (class 0 OID 26973)
-- Dependencies: 229
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: cloudloom
--

INSERT INTO public.roles VALUES (1, 'super_admin', '超级管理员', '2025-08-29 19:52:07.635688');
INSERT INTO public.roles VALUES (2, 'admin', '管理员', '2025-08-29 19:52:07.635688');
INSERT INTO public.roles VALUES (3, 'staff', '员工', '2025-08-29 19:52:07.635688');
INSERT INTO public.roles VALUES (4, 'customer', '普通用户', '2025-08-29 19:52:07.635688');


--
-- TOC entry 5031 (class 0 OID 27038)
-- Dependencies: 235
-- Data for Name: subcategories; Type: TABLE DATA; Schema: public; Owner: cloudloom
--

INSERT INTO public.subcategories VALUES (1, '齐胸襦裙', '上襦较短，下裙系于胸部上方，衣袂飘逸。', 1, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);
INSERT INTO public.subcategories VALUES (2, '齐腰襦裙', '上襦较短，下裙系于腰部，通常搭配高腰裙。', 1, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);
INSERT INTO public.subcategories VALUES (3, '对襟襦裙', '上衣前襟左右对称，衣襟无扣，用系带固定。', 1, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);
INSERT INTO public.subcategories VALUES (4, '交领襦裙', '上衣衣襟呈“y”字形交叉，体现右衽的传统。', 1, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);
INSERT INTO public.subcategories VALUES (5, '袄裙', '流行于明代，上袄下裙，端庄大气。', 1, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);
INSERT INTO public.subcategories VALUES (6, '马面裙', '流行于明清，前后光面，侧面打褶，裙门两片。', 2, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);
INSERT INTO public.subcategories VALUES (7, '百迭裙', '裙身有大量褶子，穿着时摇曳生姿，轻盈飘逸。', 2, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);
INSERT INTO public.subcategories VALUES (8, '破裙', '流行于唐代，裙身由多片不同颜色的布料拼接。', 2, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);
INSERT INTO public.subcategories VALUES (9, '宋制汉服', '风格清新雅致，以褙子、襦裙、交领为主。', 3, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);
INSERT INTO public.subcategories VALUES (10, '明制汉服', '风格端庄大气，以袄裙、马面裙、比甲为主。', 3, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);
INSERT INTO public.subcategories VALUES (11, '唐制汉服', '风格雍容华贵，以齐胸襦裙、大袖衫为主。', 3, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);
INSERT INTO public.subcategories VALUES (12, '魏晋汉服', '风格飘逸洒脱，以中衣、中裤、长衫为主。', 3, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);
INSERT INTO public.subcategories VALUES (13, '汉制汉服', '风格古朴厚重，以深衣、曲裾、直裾为主。', 3, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);
INSERT INTO public.subcategories VALUES (14, '发簪', '用于固定或装饰发髻的单股簪子。', 4, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);
INSERT INTO public.subcategories VALUES (15, '步摇', '带有垂饰，走路时摇曳生姿的发饰。', 4, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);
INSERT INTO public.subcategories VALUES (16, '披帛', '披在肩上的长条形丝巾。', 4, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);
INSERT INTO public.subcategories VALUES (17, '绣花鞋', '带有刺绣图案的传统鞋履。', 5, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);
INSERT INTO public.subcategories VALUES (18, '弓鞋', '鞋头略微上翘的传统鞋履。', 5, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);
INSERT INTO public.subcategories VALUES (19, '汉服租赁', '提供各类汉服租赁服务，包括成人和儿童。', 6, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);
INSERT INTO public.subcategories VALUES (20, '汉服摄影', '提供专业的汉服主题摄影服务。', 6, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);
INSERT INTO public.subcategories VALUES (21, '主题派对', '承办汉服生日派对、企业团建等活动。', 6, '2025-09-01 13:17:38.25243', '2025-09-01 13:17:38.25243', NULL, true);


--
-- TOC entry 5036 (class 0 OID 27192)
-- Dependencies: 240
-- Data for Name: surveys; Type: TABLE DATA; Schema: public; Owner: cloudloom
--

INSERT INTO public.surveys VALUES (1, 'Weaving Dreams in Silk: A Hanfu Experience Survey', 'Your insights are the threads that will help us weave this beautiful dream together.', '2025-09-05 12:20:58.945904+01');
INSERT INTO public.surveys VALUES (2, '汉服体验意向调查', '您好！为打造更贴近您心中所想的汉服文化体验，我们诚邀您参与本次问卷。
        ', '2025-09-05 12:21:35.725402+01');


--
-- TOC entry 5022 (class 0 OID 25599)
-- Dependencies: 226
-- Data for Name: user_favorites; Type: TABLE DATA; Schema: public; Owner: cloudloom
--



--
-- TOC entry 5026 (class 0 OID 26984)
-- Dependencies: 230
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: cloudloom
--

INSERT INTO public.user_roles VALUES ('7ac9ec5b-bca1-4bfa-991a-4014072cdfc9', 4, '2025-08-29 19:54:20.214716');
INSERT INTO public.user_roles VALUES ('8ac0facb-e8ff-487b-b06d-9db6f3f3f9ee', 3, '2025-08-29 20:24:05.646009');
INSERT INTO public.user_roles VALUES ('8543d918-3516-4e12-bc0c-aff4b7bd7f43', 3, '2025-08-29 20:24:05.646009');
INSERT INTO public.user_roles VALUES ('ed41d2f9-d809-426b-85be-e1998c9ec68e', 3, '2025-08-29 20:24:05.646009');
INSERT INTO public.user_roles VALUES ('df01c26d-af4a-49a8-8e15-9dee623f8f24', 3, '2025-08-29 20:24:05.646009');
INSERT INTO public.user_roles VALUES ('64f11154-75e4-4120-b3b5-c660abf7e0e5', 3, '2025-08-29 20:24:05.646009');
INSERT INTO public.user_roles VALUES ('7ac9ec5b-bca1-4bfa-991a-4014072cdfc9', 3, '2025-08-29 20:24:05.646009');
INSERT INTO public.user_roles VALUES ('17ec4fc8-1d3f-4630-af14-69e7bd10a991', 4, '2025-08-29 20:24:05.646009');


--
-- TOC entry 5014 (class 0 OID 25515)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: cloudloom
--

INSERT INTO public.users VALUES ('8ac0facb-e8ff-487b-b06d-9db6f3f3f9ee', 'test@example.com', NULL, '$2b$10$GF6Pu4HokmHqfYbBQrgGhepiXNGZeswwHcFXE6OjqJyGs65rla75C', NULL, '2025-08-23 17:53:27.76734+01', '2025-08-23 17:53:27.76734+01', 'testuser', '', NULL);
INSERT INTO public.users VALUES ('8543d918-3516-4e12-bc0c-aff4b7bd7f43', 'zhanghua@example.com', '13912345678', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MQRjQphG1L5JZq3DPqa/3WrQjqoqFYW', '/images/avatars/user1.jpg', '2025-08-23 03:41:12.210172+01', '2025-08-23 03:41:12.210172+01', 'test02', '', NULL);
INSERT INTO public.users VALUES ('ed41d2f9-d809-426b-85be-e1998c9ec68e', 'admin@cloudloom.com', '13800138000', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MQRjQphG1L5JZq3DPqa/3WrQjqoqFYW', '/images/avatars/admin.jpg', '2025-08-23 03:41:12.210172+01', '2025-08-23 03:41:12.210172+01', 'admin', '', NULL);
INSERT INTO public.users VALUES ('df01c26d-af4a-49a8-8e15-9dee623f8f24', 'test01@example.com', NULL, '$2b$10$fyqRY4k7uy496HTP0OcLrOFVtAwMjc83Jh4C.GLDJehEYdvijk8ga', NULL, '2025-08-23 18:02:48.697989+01', '2025-08-23 18:02:48.697989+01', 'test01', '', NULL);
INSERT INTO public.users VALUES ('64f11154-75e4-4120-b3b5-c660abf7e0e5', 'test03@example.com', NULL, '$2b$10$qGFRTPuKq2dhDXb/VgSk..ga0hwV5u6WOhVuG8Uzlj6P1vDye8N6q', NULL, '2025-08-24 00:17:33.213707+01', '2025-08-24 00:17:33.213707+01', 'test03', '', NULL);
INSERT INTO public.users VALUES ('7ac9ec5b-bca1-4bfa-991a-4014072cdfc9', 'zhangsan0202@example.com', NULL, '$2b$10$Z1vKoDZKu7CZZveQ6rETaOGFR1pYJ3CHdP24QHQCJPlNfwdkuyRCW', NULL, '2025-08-29 19:54:20.194534+01', '2025-08-29 19:54:20.194534+01', 'zhangsan02', NULL, NULL);
INSERT INTO public.users VALUES ('17ec4fc8-1d3f-4630-af14-69e7bd10a991', 'yanziyi290@gmail.com', NULL, '', 'https://lh3.googleusercontent.com/a/ACg8ocIX7SVl6Rw5lMUdj3wmiKoLP0QpshlUHbLl2EaKa-JAH-lbJTVq=s96-c', '2025-08-27 15:44:58.680182+01', '2025-08-27 15:44:58.680182+01', 'f62zmIgs80R2m4GJEzmjpxZTbO33', 'YzY YzY', 'Hello world!!!');
INSERT INTO public.users VALUES ('446ccbb8-6aec-4357-8497-733c64aae2dc', 'yanziyi290@163.com', NULL, '', 'https://lh3.googleusercontent.com/a/ACg8ocLsM0JDXcO0F_ODl_OuZxG_rEvP-x3rjvICArjh8sHsoaA6_ieP=s96-c', '2025-09-05 08:07:44.856056+01', '2025-09-05 08:07:44.856056+01', '2aTbErqn9eP0mNegi98FZ5X96zi1', '闫子义', NULL);


--
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 219
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cloudloom
--

SELECT pg_catalog.setval('public.categories_id_seq', 36, true);


--
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 236
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cloudloom
--

SELECT pg_catalog.setval('public.migrations_id_seq', 6, true);


--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 231
-- Name: permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cloudloom
--

SELECT pg_catalog.setval('public.permissions_id_seq', 11, true);


--
-- TOC entry 5057 (class 0 OID 0)
-- Dependencies: 221
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cloudloom
--

SELECT pg_catalog.setval('public.products_id_seq', 50, true);


--
-- TOC entry 5058 (class 0 OID 0)
-- Dependencies: 223
-- Name: rental_periods_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cloudloom
--

SELECT pg_catalog.setval('public.rental_periods_id_seq', 18, true);


--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 228
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cloudloom
--

SELECT pg_catalog.setval('public.roles_id_seq', 4, true);


--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 234
-- Name: subcategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cloudloom
--

SELECT pg_catalog.setval('public.subcategories_id_seq', 21, true);


--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 239
-- Name: surveys_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cloudloom
--

SELECT pg_catalog.setval('public.surveys_id_seq', 2, true);


-- Completed on 2025-09-05 16:41:26

--
-- PostgreSQL database dump complete
--


--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-08-29 12:59:11

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
-- TOC entry 2 (class 3079 OID 25504)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 4949 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 225 (class 1259 OID 25568)
-- Name: bookings; Type: TABLE; Schema: public; Owner: cloudloom
--

CREATE TABLE public.bookings (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    customer_fullname character varying(50),
    customer_email character varying(100),
    customer_phone character varying(50),
    notes text,
    booking_date date NOT NULL,
    booking_time time without time zone NOT NULL,
    participants integer DEFAULT 1 NOT NULL,
    total_amount numeric(10,2) NOT NULL,
    status character varying(20) DEFAULT 'pending'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    time_slot character varying(50),
    product_id integer,
    booking_number character varying(20) NOT NULL,
    booking_type character varying(20) DEFAULT 'standard'::character varying NOT NULL,
    emergency_contact character varying(100),
    update_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    cancelled_at timestamp with time zone
);


ALTER TABLE public.bookings OWNER TO cloudloom;

--
-- TOC entry 220 (class 1259 OID 25531)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    image_url text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    is_active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 25530)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 4951 (class 0 OID 0)
-- Dependencies: 219
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 228 (class 1259 OID 25615)
-- Name: collaboration_applications; Type: TABLE; Schema: public; Owner: cloudloom
--

CREATE TABLE public.collaboration_applications (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    full_name character varying(255) NOT NULL,
    company character varying(255),
    email character varying(255) NOT NULL,
    phone character varying(50),
    collaboration_type character varying(100),
    status character varying(20) DEFAULT 'pending'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    message character varying
);


ALTER TABLE public.collaboration_applications OWNER TO cloudloom;

--
-- TOC entry 226 (class 1259 OID 25584)
-- Name: product_rental_periods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_rental_periods (
    product_id integer NOT NULL,
    rental_period_id integer NOT NULL
);


ALTER TABLE public.product_rental_periods OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 25542)
-- Name: products; Type: TABLE; Schema: public; Owner: cloudloom
--

CREATE TABLE public.products (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    dynasty character varying(50) NOT NULL,
    price numeric(10,2) NOT NULL,
    category_id integer,
    details jsonb DEFAULT '[]'::jsonb NOT NULL,
    reviews integer DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    stock_quantity integer DEFAULT 0 NOT NULL,
    dynasty_label character varying(20) NOT NULL,
    material character varying(200),
    tags jsonb DEFAULT '[]'::jsonb NOT NULL,
    images jsonb DEFAULT '[]'::jsonb NOT NULL,
    size_options jsonb DEFAULT '[]'::jsonb NOT NULL,
    care_instructions text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.products OWNER TO cloudloom;

--
-- TOC entry 221 (class 1259 OID 25541)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: cloudloom
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO cloudloom;

--
-- TOC entry 4954 (class 0 OID 0)
-- Dependencies: 221
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cloudloom
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 224 (class 1259 OID 25561)
-- Name: rental_periods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rental_periods (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    duration integer NOT NULL,
    unit character varying(10) NOT NULL,
    price numeric(10,2) NOT NULL,
    CONSTRAINT rental_periods_unit_check CHECK (((unit)::text = ANY ((ARRAY['hour'::character varying, 'day'::character varying])::text[])))
);


ALTER TABLE public.rental_periods OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 25560)
-- Name: rental_periods_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rental_periods_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rental_periods_id_seq OWNER TO postgres;

--
-- TOC entry 4956 (class 0 OID 0)
-- Dependencies: 223
-- Name: rental_periods_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rental_periods_id_seq OWNED BY public.rental_periods.id;


--
-- TOC entry 227 (class 1259 OID 25599)
-- Name: user_favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_favorites (
    user_id uuid NOT NULL,
    product_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_favorites OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 25515)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(50),
    password_hash character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'customer'::character varying NOT NULL,
    avatar_url text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    username character varying(100) NOT NULL,
    nickname character varying(50)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 4740 (class 2604 OID 25534)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 4744 (class 2604 OID 25545)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: cloudloom
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4754 (class 2604 OID 25564)
-- Name: rental_periods id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental_periods ALTER COLUMN id SET DEFAULT nextval('public.rental_periods_id_seq'::regclass);


--
-- TOC entry 4774 (class 2606 OID 25721)
-- Name: categories UQ_8b0be371d28245da6e4f4b61878; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE (name);


--
-- TOC entry 4783 (class 2606 OID 26843)
-- Name: bookings bookings_booking_number_key; Type: CONSTRAINT; Schema: public; Owner: cloudloom
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_booking_number_key UNIQUE (booking_number);


--
-- TOC entry 4785 (class 2606 OID 25578)
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: cloudloom
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- TOC entry 4776 (class 2606 OID 25538)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4791 (class 2606 OID 25625)
-- Name: collaboration_applications collaboration_applications_pkey; Type: CONSTRAINT; Schema: public; Owner: cloudloom
--

ALTER TABLE ONLY public.collaboration_applications
    ADD CONSTRAINT collaboration_applications_pkey PRIMARY KEY (id);


--
-- TOC entry 4787 (class 2606 OID 25588)
-- Name: product_rental_periods product_rental_periods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_rental_periods
    ADD CONSTRAINT product_rental_periods_pkey PRIMARY KEY (product_id, rental_period_id);


--
-- TOC entry 4778 (class 2606 OID 25554)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: cloudloom
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4780 (class 2606 OID 25567)
-- Name: rental_periods rental_periods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental_periods
    ADD CONSTRAINT rental_periods_pkey PRIMARY KEY (id);


--
-- TOC entry 4768 (class 2606 OID 25629)
-- Name: users unique_username; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_username UNIQUE (username);


--
-- TOC entry 4789 (class 2606 OID 25604)
-- Name: user_favorites user_favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_favorites
    ADD CONSTRAINT user_favorites_pkey PRIMARY KEY (user_id, product_id);


--
-- TOC entry 4770 (class 2606 OID 25528)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4772 (class 2606 OID 25526)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4781 (class 1259 OID 26809)
-- Name: IDX_c43aad549839f934c393b5cb3d; Type: INDEX; Schema: public; Owner: cloudloom
--

CREATE INDEX "IDX_c43aad549839f934c393b5cb3d" ON public.bookings USING btree (booking_date, time_slot);


--
-- TOC entry 4792 (class 1259 OID 26810)
-- Name: idx_collaboration_applications_status; Type: INDEX; Schema: public; Owner: cloudloom
--

CREATE INDEX idx_collaboration_applications_status ON public.collaboration_applications USING btree (status);


--
-- TOC entry 4766 (class 1259 OID 25529)
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_email ON public.users USING btree (email);


--
-- TOC entry 4793 (class 2606 OID 26821)
-- Name: products FK_9a5f6868c96e0069e699f33e124; Type: FK CONSTRAINT; Schema: public; Owner: cloudloom
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- TOC entry 4794 (class 2606 OID 25589)
-- Name: product_rental_periods product_rental_periods_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_rental_periods
    ADD CONSTRAINT product_rental_periods_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4795 (class 2606 OID 25594)
-- Name: product_rental_periods product_rental_periods_rental_period_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_rental_periods
    ADD CONSTRAINT product_rental_periods_rental_period_id_fkey FOREIGN KEY (rental_period_id) REFERENCES public.rental_periods(id) ON DELETE CASCADE;


--
-- TOC entry 4796 (class 2606 OID 25610)
-- Name: user_favorites user_favorites_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_favorites
    ADD CONSTRAINT user_favorites_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4797 (class 2606 OID 25605)
-- Name: user_favorites user_favorites_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_favorites
    ADD CONSTRAINT user_favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4948 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO cloudloom;


--
-- TOC entry 4950 (class 0 OID 0)
-- Dependencies: 220
-- Name: TABLE categories; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.categories TO cloudloom;


--
-- TOC entry 4952 (class 0 OID 0)
-- Dependencies: 219
-- Name: SEQUENCE categories_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.categories_id_seq TO cloudloom;


--
-- TOC entry 4953 (class 0 OID 0)
-- Dependencies: 226
-- Name: TABLE product_rental_periods; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.product_rental_periods TO cloudloom;


--
-- TOC entry 4955 (class 0 OID 0)
-- Dependencies: 224
-- Name: TABLE rental_periods; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.rental_periods TO cloudloom;


--
-- TOC entry 4957 (class 0 OID 0)
-- Dependencies: 223
-- Name: SEQUENCE rental_periods_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,USAGE ON SEQUENCE public.rental_periods_id_seq TO cloudloom;


--
-- TOC entry 4958 (class 0 OID 0)
-- Dependencies: 227
-- Name: TABLE user_favorites; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_favorites TO cloudloom;


--
-- TOC entry 4959 (class 0 OID 0)
-- Dependencies: 218
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.users TO cloudloom;


-- Completed on 2025-08-29 12:59:11

--
-- PostgreSQL database dump complete
--


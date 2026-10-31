import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'ar');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_published_locale" AS ENUM('en', 'ar');
  CREATE TYPE "public"."enum_services_icon" AS ENUM('ruler', 'design', 'scissors', 'wrench', 'support', 'chat', 'gem', 'pen', 'team', 'calendar', 'badge', 'handshake', 'spark');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_version_icon" AS ENUM('ruler', 'design', 'scissors', 'wrench', 'support', 'chat', 'gem', 'pen', 'team', 'calendar', 'badge', 'handshake', 'spark');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_published_locale" AS ENUM('en', 'ar');
  CREATE TYPE "public"."enum_projects_category" AS ENUM('residential', 'hospitality', 'commercial');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_category" AS ENUM('residential', 'hospitality', 'commercial');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_published_locale" AS ENUM('en', 'ar');
  CREATE TYPE "public"."enum_team_members_social_links_platform" AS ENUM('instagram', 'linkedin', 'email');
  CREATE TYPE "public"."enum__blog_posts_v_published_locale" AS ENUM('en', 'ar');
  CREATE TYPE "public"."enum_faqs_category" AS ENUM('types', 'customization', 'measurement', 'installation', 'delivery', 'maintenance', 'consultation');
  CREATE TYPE "public"."enum_inquiries_contact_method" AS ENUM('phone', 'email', 'whatsapp');
  CREATE TYPE "public"."enum_inquiries_source" AS ENUM('consultation', 'newsletter');
  CREATE TYPE "public"."enum_inquiries_status" AS ENUM('new', 'in-progress', 'closed');
  CREATE TYPE "public"."enum_homepage_why_choose_icon" AS ENUM('gem', 'pen', 'team', 'calendar', 'badge', 'handshake');
  CREATE TYPE "public"."enum_social_links_links_platform" AS ENUM('instagram', 'facebook', 'pinterest', 'youtube', 'linkedin');
  CREATE TABLE "categories_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "products_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "products_features_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_specifications_locales" (
  	"label" varchar,
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products_locales" (
  	"name" varchar,
  	"summary" varchar,
  	"description" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_features_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_version_specifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_specifications_locales" (
  	"label" varchar,
  	"value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_category_id" integer,
  	"version_featured_image_id" integer,
  	"version_featured" boolean DEFAULT false,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__products_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_products_v_locales" (
  	"version_name" varchar,
  	"version_summary" varchar,
  	"version_description" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_features_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"image_id" integer,
  	"icon" "enum_services_icon" DEFAULT 'spark',
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "services_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"description" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v_version_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_version_features_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_image_id" integer,
  	"version_icon" "enum__services_v_version_icon" DEFAULT 'spark',
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__services_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_services_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_description" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "projects_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"category" "enum_projects_category" DEFAULT 'residential',
  	"completed_on" timestamp(3) with time zone,
  	"featured_image_id" integer,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_locales" (
  	"title" varchar,
  	"summary" varchar,
  	"description" varchar,
  	"location" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_category" "enum__projects_v_version_category" DEFAULT 'residential',
  	"version_completed_on" timestamp(3) with time zone,
  	"version_featured_image_id" integer,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__projects_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_projects_v_locales" (
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_description" varchar,
  	"version_location" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"rating" numeric DEFAULT 5 NOT NULL,
  	"photo_id" integer,
  	"order" numeric DEFAULT 0,
  	"published" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials_locales" (
  	"role" varchar,
  	"review" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "team_members_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_team_members_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"order" numeric DEFAULT 0,
  	"published" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_members_locales" (
  	"name" varchar NOT NULL,
  	"position" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_posts_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"author_name" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_blog_posts_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_author_name" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_categories_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" "enum_faqs_category" DEFAULT 'consultation',
  	"order" numeric DEFAULT 0,
  	"published" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faqs_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"website" varchar,
  	"order" numeric DEFAULT 0,
  	"published" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partners_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "inquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"service" varchar,
  	"contact_method" "enum_inquiries_contact_method",
  	"message" varchar,
  	"locale" varchar,
  	"source" "enum_inquiries_source" DEFAULT 'consultation' NOT NULL,
  	"status" "enum_inquiries_status" DEFAULT 'new' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_navigation_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_locales" (
  	"announcement" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_locales" (
  	"description" varchar,
  	"copyright" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_locales" (
  	"tagline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "homepage_hero_slides_locales" (
  	"eyebrow" varchar,
  	"headline" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_promos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "homepage_promos_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "homepage_process_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_showroom" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_showroom_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_why_choose" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_homepage_why_choose_icon"
  );
  
  CREATE TABLE "homepage_why_choose_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"suffix" varchar
  );
  
  CREATE TABLE "homepage_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_locales" (
  	"about_eyebrow" varchar,
  	"about_title" varchar,
  	"about_body" varchar,
  	"editorial_eyebrow" varchar,
  	"editorial_title" varchar,
  	"editorial_body" varchar,
  	"final_cta_eyebrow" varchar,
  	"final_cta_title" varchar,
  	"final_cta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_information" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone" varchar,
  	"whatsapp_number" varchar,
  	"email" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_information_locales" (
  	"address" varchar,
  	"hours" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "social_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_social_links_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "social_links" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "seo_defaults" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "seo_defaults_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "brands" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "bike_models" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "modification_projects_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "modification_projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "modification_projects_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_modification_projects_v_version_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_modification_projects_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_modification_projects_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_posts_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_posts_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_submissions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_why_choose_us" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "brands" CASCADE;
  DROP TABLE "bike_models" CASCADE;
  DROP TABLE "products_images" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "modification_projects_gallery" CASCADE;
  DROP TABLE "modification_projects" CASCADE;
  DROP TABLE "modification_projects_rels" CASCADE;
  DROP TABLE "_modification_projects_v_version_gallery" CASCADE;
  DROP TABLE "_modification_projects_v" CASCADE;
  DROP TABLE "_modification_projects_v_rels" CASCADE;
  DROP TABLE "blog_posts_rels" CASCADE;
  DROP TABLE "_blog_posts_v_rels" CASCADE;
  DROP TABLE "blog_tags" CASCADE;
  DROP TABLE "contact_submissions" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "homepage_why_choose_us" CASCADE;
  ALTER TABLE "categories" DROP CONSTRAINT IF EXISTS "categories_parent_id_categories_id_fk";
  
  ALTER TABLE "categories" DROP CONSTRAINT IF EXISTS "categories_seo_image_id_media_id_fk";
  
  ALTER TABLE "products" DROP CONSTRAINT IF EXISTS "products_subcategory_id_categories_id_fk";
  
  ALTER TABLE "products" DROP CONSTRAINT IF EXISTS "products_brand_id_brands_id_fk";
  
  ALTER TABLE "blog_posts" DROP CONSTRAINT IF EXISTS "blog_posts_author_id_users_id_fk";
  
  ALTER TABLE "_blog_posts_v" DROP CONSTRAINT IF EXISTS "_blog_posts_v_version_author_id_users_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_brands_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_bike_models_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_modification_projects_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_blog_tags_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_contact_submissions_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT IF EXISTS "header_logo_id_media_id_fk";
  
  ALTER TABLE "footer" DROP CONSTRAINT IF EXISTS "footer_logo_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT IF EXISTS "site_settings_default_seo_image_id_media_id_fk";
  
  ALTER TABLE "homepage" DROP CONSTRAINT IF EXISTS "homepage_hero_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "categories_parent_idx";
  DROP INDEX IF EXISTS "categories_seo_seo_image_idx";
  DROP INDEX IF EXISTS "products_sku_idx";
  DROP INDEX IF EXISTS "products_product_type_idx";
  DROP INDEX IF EXISTS "products_subcategory_idx";
  DROP INDEX IF EXISTS "products_brand_idx";
  DROP INDEX IF EXISTS "products_regular_price_idx";
  DROP INDEX IF EXISTS "products_sale_price_idx";
  DROP INDEX IF EXISTS "products_availability_idx";
  DROP INDEX IF EXISTS "products_featured_idx";
  DROP INDEX IF EXISTS "products_new_arrival_idx";
  DROP INDEX IF EXISTS "products_best_seller_idx";
  DROP INDEX IF EXISTS "products_active_idx";
  DROP INDEX IF EXISTS "blog_posts_author_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_version_version_author_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_brands_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_bike_models_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_modification_projects_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_blog_tags_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_contact_submissions_id_idx";
  DROP INDEX IF EXISTS "header_logo_idx";
  DROP INDEX IF EXISTS "footer_logo_idx";
  DROP INDEX IF EXISTS "site_settings_default_seo_default_seo_image_idx";
  DROP INDEX IF EXISTS "homepage_hero_hero_image_idx";
  ALTER TABLE "products" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "category_id" DROP NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "site_name" SET DEFAULT 'Merzo Crist';
  ALTER TABLE "categories" ADD COLUMN "order" numeric DEFAULT 0;
  ALTER TABLE "categories" ADD COLUMN "published" boolean DEFAULT true;
  ALTER TABLE "products" ADD COLUMN "featured_image_id" integer;
  ALTER TABLE "products" ADD COLUMN "_status" "enum_products_status" DEFAULT 'draft';
  ALTER TABLE "blog_posts" ADD COLUMN "category_id" integer;
  ALTER TABLE "blog_posts" ADD COLUMN "published_on" timestamp(3) with time zone;
  ALTER TABLE "_blog_posts_v" ADD COLUMN "version_category_id" integer;
  ALTER TABLE "_blog_posts_v" ADD COLUMN "version_published_on" timestamp(3) with time zone;
  ALTER TABLE "_blog_posts_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_blog_posts_v" ADD COLUMN "published_locale" "enum__blog_posts_v_published_locale";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "projects_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "team_members_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faqs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "partners_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "inquiries_id" integer;
  ALTER TABLE "homepage" ADD COLUMN "about_image_id" integer;
  ALTER TABLE "homepage" ADD COLUMN "editorial_image_id" integer;
  ALTER TABLE "homepage" ADD COLUMN "final_cta_image_id" integer;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_features_locales" ADD CONSTRAINT "products_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_specifications_locales" ADD CONSTRAINT "products_specifications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_gallery" ADD CONSTRAINT "_products_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_gallery" ADD CONSTRAINT "_products_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_features" ADD CONSTRAINT "_products_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_features_locales" ADD CONSTRAINT "_products_v_version_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_specifications" ADD CONSTRAINT "_products_v_version_specifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_specifications_locales" ADD CONSTRAINT "_products_v_version_specifications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_locales" ADD CONSTRAINT "_products_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_features" ADD CONSTRAINT "services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_features_locales" ADD CONSTRAINT "services_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_features" ADD CONSTRAINT "_services_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_features_locales" ADD CONSTRAINT "_services_v_version_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_version_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_locales" ADD CONSTRAINT "_services_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_locales" ADD CONSTRAINT "testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members_social_links" ADD CONSTRAINT "team_members_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members_locales" ADD CONSTRAINT "team_members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_locales" ADD CONSTRAINT "blog_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_locales" ADD CONSTRAINT "_blog_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_categories_locales" ADD CONSTRAINT "blog_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_locales" ADD CONSTRAINT "faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners_locales" ADD CONSTRAINT "partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_navigation_locales" ADD CONSTRAINT "header_navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_hero_slides" ADD CONSTRAINT "homepage_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_hero_slides" ADD CONSTRAINT "homepage_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_hero_slides_locales" ADD CONSTRAINT "homepage_hero_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_promos" ADD CONSTRAINT "homepage_promos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_promos" ADD CONSTRAINT "homepage_promos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_promos_locales" ADD CONSTRAINT "homepage_promos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_promos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_process" ADD CONSTRAINT "homepage_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_process_locales" ADD CONSTRAINT "homepage_process_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_process"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_showroom" ADD CONSTRAINT "homepage_showroom_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_showroom" ADD CONSTRAINT "homepage_showroom_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_showroom_locales" ADD CONSTRAINT "homepage_showroom_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_showroom"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_why_choose" ADD CONSTRAINT "homepage_why_choose_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_why_choose_locales" ADD CONSTRAINT "homepage_why_choose_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_why_choose"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_stats" ADD CONSTRAINT "homepage_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_stats_locales" ADD CONSTRAINT "homepage_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_locales" ADD CONSTRAINT "homepage_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_information_locales" ADD CONSTRAINT "contact_information_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_information"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "social_links_links" ADD CONSTRAINT "social_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_defaults" ADD CONSTRAINT "seo_defaults_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo_defaults_locales" ADD CONSTRAINT "seo_defaults_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_defaults"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_gallery_order_idx" ON "products_gallery" USING btree ("_order");
  CREATE INDEX "products_gallery_parent_id_idx" ON "products_gallery" USING btree ("_parent_id");
  CREATE INDEX "products_gallery_image_idx" ON "products_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "products_features_locales_locale_parent_id_unique" ON "products_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "products_specifications_locales_locale_parent_id_unique" ON "products_specifications_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "products_locales_locale_parent_id_unique" ON "products_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_version_gallery_order_idx" ON "_products_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_products_v_version_gallery_parent_id_idx" ON "_products_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_gallery_image_idx" ON "_products_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_products_v_version_features_order_idx" ON "_products_v_version_features" USING btree ("_order");
  CREATE INDEX "_products_v_version_features_parent_id_idx" ON "_products_v_version_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_products_v_version_features_locales_locale_parent_id_unique" ON "_products_v_version_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_version_specifications_order_idx" ON "_products_v_version_specifications" USING btree ("_order");
  CREATE INDEX "_products_v_version_specifications_parent_id_idx" ON "_products_v_version_specifications" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_products_v_version_specifications_locales_locale_parent_id_" ON "_products_v_version_specifications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  CREATE INDEX "_products_v_version_version_category_idx" ON "_products_v" USING btree ("version_category_id");
  CREATE INDEX "_products_v_version_version_featured_image_idx" ON "_products_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_products_v_version_seo_version_seo_image_idx" ON "_products_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX "_products_v_snapshot_idx" ON "_products_v" USING btree ("snapshot");
  CREATE INDEX "_products_v_published_locale_idx" ON "_products_v" USING btree ("published_locale");
  CREATE INDEX "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_products_v_locales_locale_parent_id_unique" ON "_products_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_features_order_idx" ON "services_features" USING btree ("_order");
  CREATE INDEX "services_features_parent_id_idx" ON "services_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_features_locales_locale_parent_id_unique" ON "services_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_image_idx" ON "services" USING btree ("image_id");
  CREATE INDEX "services_seo_seo_image_idx" ON "services" USING btree ("seo_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_version_features_order_idx" ON "_services_v_version_features" USING btree ("_order");
  CREATE INDEX "_services_v_version_features_parent_id_idx" ON "_services_v_version_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_services_v_version_features_locales_locale_parent_id_unique" ON "_services_v_version_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_image_idx" ON "_services_v" USING btree ("version_image_id");
  CREATE INDEX "_services_v_version_seo_version_seo_image_idx" ON "_services_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_snapshot_idx" ON "_services_v" USING btree ("snapshot");
  CREATE INDEX "_services_v_published_locale_idx" ON "_services_v" USING btree ("published_locale");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_services_v_locales_locale_parent_id_unique" ON "_services_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_gallery_order_idx" ON "projects_gallery" USING btree ("_order");
  CREATE INDEX "projects_gallery_parent_id_idx" ON "projects_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_image_idx" ON "projects_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_featured_image_idx" ON "projects" USING btree ("featured_image_id");
  CREATE INDEX "projects_seo_seo_image_idx" ON "projects" USING btree ("seo_image_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_gallery_order_idx" ON "_projects_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_version_gallery_parent_id_idx" ON "_projects_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_gallery_image_idx" ON "_projects_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_featured_image_idx" ON "_projects_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_projects_v_version_seo_version_seo_image_idx" ON "_projects_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_snapshot_idx" ON "_projects_v" USING btree ("snapshot");
  CREATE INDEX "_projects_v_published_locale_idx" ON "_projects_v" USING btree ("published_locale");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_projects_v_locales_locale_parent_id_unique" ON "_projects_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "testimonials_photo_idx" ON "testimonials" USING btree ("photo_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE UNIQUE INDEX "testimonials_locales_locale_parent_id_unique" ON "testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "team_members_social_links_order_idx" ON "team_members_social_links" USING btree ("_order");
  CREATE INDEX "team_members_social_links_parent_id_idx" ON "team_members_social_links" USING btree ("_parent_id");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE UNIQUE INDEX "team_members_locales_locale_parent_id_unique" ON "team_members_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "blog_posts_locales_locale_parent_id_unique" ON "blog_posts_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_blog_posts_v_locales_locale_parent_id_unique" ON "_blog_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "blog_categories_locales_locale_parent_id_unique" ON "blog_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE UNIQUE INDEX "faqs_locales_locale_parent_id_unique" ON "faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE UNIQUE INDEX "partners_locales_locale_parent_id_unique" ON "partners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "inquiries_updated_at_idx" ON "inquiries" USING btree ("updated_at");
  CREATE INDEX "inquiries_created_at_idx" ON "inquiries" USING btree ("created_at");
  CREATE UNIQUE INDEX "header_navigation_locales_locale_parent_id_unique" ON "header_navigation_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_hero_slides_order_idx" ON "homepage_hero_slides" USING btree ("_order");
  CREATE INDEX "homepage_hero_slides_parent_id_idx" ON "homepage_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "homepage_hero_slides_image_idx" ON "homepage_hero_slides" USING btree ("image_id");
  CREATE UNIQUE INDEX "homepage_hero_slides_locales_locale_parent_id_unique" ON "homepage_hero_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_promos_order_idx" ON "homepage_promos" USING btree ("_order");
  CREATE INDEX "homepage_promos_parent_id_idx" ON "homepage_promos" USING btree ("_parent_id");
  CREATE INDEX "homepage_promos_image_idx" ON "homepage_promos" USING btree ("image_id");
  CREATE UNIQUE INDEX "homepage_promos_locales_locale_parent_id_unique" ON "homepage_promos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_process_order_idx" ON "homepage_process" USING btree ("_order");
  CREATE INDEX "homepage_process_parent_id_idx" ON "homepage_process" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_process_locales_locale_parent_id_unique" ON "homepage_process_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_showroom_order_idx" ON "homepage_showroom" USING btree ("_order");
  CREATE INDEX "homepage_showroom_parent_id_idx" ON "homepage_showroom" USING btree ("_parent_id");
  CREATE INDEX "homepage_showroom_image_idx" ON "homepage_showroom" USING btree ("image_id");
  CREATE UNIQUE INDEX "homepage_showroom_locales_locale_parent_id_unique" ON "homepage_showroom_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_why_choose_order_idx" ON "homepage_why_choose" USING btree ("_order");
  CREATE INDEX "homepage_why_choose_parent_id_idx" ON "homepage_why_choose" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_why_choose_locales_locale_parent_id_unique" ON "homepage_why_choose_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "homepage_stats_order_idx" ON "homepage_stats" USING btree ("_order");
  CREATE INDEX "homepage_stats_parent_id_idx" ON "homepage_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "homepage_stats_locales_locale_parent_id_unique" ON "homepage_stats_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "homepage_locales_locale_parent_id_unique" ON "homepage_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_information_locales_locale_parent_id_unique" ON "contact_information_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "social_links_links_order_idx" ON "social_links_links" USING btree ("_order");
  CREATE INDEX "social_links_links_parent_id_idx" ON "social_links_links" USING btree ("_parent_id");
  CREATE INDEX "seo_defaults_image_idx" ON "seo_defaults" USING btree ("image_id");
  CREATE UNIQUE INDEX "seo_defaults_locales_locale_parent_id_unique" ON "seo_defaults_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "products" ADD CONSTRAINT "products_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_category_id_blog_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."blog_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_category_id_blog_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."blog_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_inquiries_fk" FOREIGN KEY ("inquiries_id") REFERENCES "public"."inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_about_image_id_media_id_fk" FOREIGN KEY ("about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_editorial_image_id_media_id_fk" FOREIGN KEY ("editorial_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_final_cta_image_id_media_id_fk" FOREIGN KEY ("final_cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "products_featured_image_idx" ON "products" USING btree ("featured_image_id");
  CREATE INDEX "products__status_idx" ON "products" USING btree ("_status");
  CREATE INDEX "blog_posts_category_idx" ON "blog_posts" USING btree ("category_id");
  CREATE INDEX "_blog_posts_v_version_version_category_idx" ON "_blog_posts_v" USING btree ("version_category_id");
  CREATE INDEX "_blog_posts_v_snapshot_idx" ON "_blog_posts_v" USING btree ("snapshot");
  CREATE INDEX "_blog_posts_v_published_locale_idx" ON "_blog_posts_v" USING btree ("published_locale");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_inquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("inquiries_id");
  CREATE INDEX "homepage_about_about_image_idx" ON "homepage" USING btree ("about_image_id");
  CREATE INDEX "homepage_editorial_editorial_image_idx" ON "homepage" USING btree ("editorial_image_id");
  CREATE INDEX "homepage_final_cta_final_cta_image_idx" ON "homepage" USING btree ("final_cta_image_id");
  ALTER TABLE "categories" DROP COLUMN "name";
  ALTER TABLE "categories" DROP COLUMN "description";
  ALTER TABLE "categories" DROP COLUMN "parent_id";
  ALTER TABLE "categories" DROP COLUMN "active";
  ALTER TABLE "categories" DROP COLUMN "sort_order";
  ALTER TABLE "categories" DROP COLUMN "seo_title";
  ALTER TABLE "categories" DROP COLUMN "seo_description";
  ALTER TABLE "categories" DROP COLUMN "seo_image_id";
  ALTER TABLE "categories" DROP COLUMN "seo_no_index";
  ALTER TABLE "products_specifications" DROP COLUMN "label";
  ALTER TABLE "products_specifications" DROP COLUMN "value";
  ALTER TABLE "products_features" DROP COLUMN "feature";
  ALTER TABLE "products" DROP COLUMN "name";
  ALTER TABLE "products" DROP COLUMN "sku";
  ALTER TABLE "products" DROP COLUMN "short_description";
  ALTER TABLE "products" DROP COLUMN "description";
  ALTER TABLE "products" DROP COLUMN "product_type";
  ALTER TABLE "products" DROP COLUMN "subcategory_id";
  ALTER TABLE "products" DROP COLUMN "brand_id";
  ALTER TABLE "products" DROP COLUMN "regular_price";
  ALTER TABLE "products" DROP COLUMN "sale_price";
  ALTER TABLE "products" DROP COLUMN "availability";
  ALTER TABLE "products" DROP COLUMN "stock_status";
  ALTER TABLE "products" DROP COLUMN "installation_info";
  ALTER TABLE "products" DROP COLUMN "seo_title";
  ALTER TABLE "products" DROP COLUMN "seo_description";
  ALTER TABLE "products" DROP COLUMN "new_arrival";
  ALTER TABLE "products" DROP COLUMN "best_seller";
  ALTER TABLE "products" DROP COLUMN "active";
  ALTER TABLE "blog_posts" DROP COLUMN "title";
  ALTER TABLE "blog_posts" DROP COLUMN "excerpt";
  ALTER TABLE "blog_posts" DROP COLUMN "content";
  ALTER TABLE "blog_posts" DROP COLUMN "author_id";
  ALTER TABLE "blog_posts" DROP COLUMN "published_date";
  ALTER TABLE "blog_posts" DROP COLUMN "seo_title";
  ALTER TABLE "blog_posts" DROP COLUMN "seo_description";
  ALTER TABLE "_blog_posts_v" DROP COLUMN "version_title";
  ALTER TABLE "_blog_posts_v" DROP COLUMN "version_excerpt";
  ALTER TABLE "_blog_posts_v" DROP COLUMN "version_content";
  ALTER TABLE "_blog_posts_v" DROP COLUMN "version_author_id";
  ALTER TABLE "_blog_posts_v" DROP COLUMN "version_published_date";
  ALTER TABLE "_blog_posts_v" DROP COLUMN "version_seo_title";
  ALTER TABLE "_blog_posts_v" DROP COLUMN "version_seo_description";
  ALTER TABLE "blog_categories" DROP COLUMN "name";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "brands_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "bike_models_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "modification_projects_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "blog_tags_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "contact_submissions_id";
  ALTER TABLE "header_navigation" DROP COLUMN "label";
  ALTER TABLE "header_navigation" DROP COLUMN "open_in_new_tab";
  ALTER TABLE "header" DROP COLUMN "logo_id";
  ALTER TABLE "header" DROP COLUMN "cta_label";
  ALTER TABLE "header" DROP COLUMN "announcement";
  ALTER TABLE "footer" DROP COLUMN "logo_id";
  ALTER TABLE "footer" DROP COLUMN "description";
  ALTER TABLE "footer" DROP COLUMN "contact_phone";
  ALTER TABLE "footer" DROP COLUMN "contact_email";
  ALTER TABLE "footer" DROP COLUMN "contact_address";
  ALTER TABLE "footer" DROP COLUMN "copyright";
  ALTER TABLE "site_settings" DROP COLUMN "contact_number";
  ALTER TABLE "site_settings" DROP COLUMN "whatsapp_number";
  ALTER TABLE "site_settings" DROP COLUMN "email";
  ALTER TABLE "site_settings" DROP COLUMN "address";
  ALTER TABLE "site_settings" DROP COLUMN "default_seo_title";
  ALTER TABLE "site_settings" DROP COLUMN "default_seo_description";
  ALTER TABLE "site_settings" DROP COLUMN "default_seo_image_id";
  ALTER TABLE "homepage" DROP COLUMN "hero_headline";
  ALTER TABLE "homepage" DROP COLUMN "hero_description";
  ALTER TABLE "homepage" DROP COLUMN "hero_primary_cta_label";
  ALTER TABLE "homepage" DROP COLUMN "hero_primary_cta_href";
  ALTER TABLE "homepage" DROP COLUMN "hero_secondary_cta_label";
  ALTER TABLE "homepage" DROP COLUMN "hero_secondary_cta_href";
  ALTER TABLE "homepage" DROP COLUMN "hero_image_id";
  ALTER TABLE "homepage" DROP COLUMN "cta_headline";
  ALTER TABLE "homepage" DROP COLUMN "cta_description";
  ALTER TABLE "homepage" DROP COLUMN "cta_button_label";
  DROP TYPE "public"."enum_products_product_type";
  DROP TYPE "public"."enum_products_availability";
  DROP TYPE "public"."enum_modification_projects_modification_type";
  DROP TYPE "public"."enum_modification_projects_status";
  DROP TYPE "public"."enum__modification_projects_v_version_modification_type";
  DROP TYPE "public"."enum__modification_projects_v_version_status";
  DROP TYPE "public"."enum_footer_social_links_platform";
  DROP TYPE "public"."enum_site_settings_social_links_platform";
  DROP TYPE "public"."enum_homepage_why_choose_us_icon";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_product_type" AS ENUM('spare-part', 'accessory', 'decoration', 'modification', 'performance', 'riding-gear', 'maintenance');
  CREATE TYPE "public"."enum_products_availability" AS ENUM('in-stock', 'out-of-stock', 'pre-order');
  CREATE TYPE "public"."enum_modification_projects_modification_type" AS ENUM('cafe-racer', 'custom', 'touring', 'performance', 'cosmetic', 'restoration');
  CREATE TYPE "public"."enum_modification_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__modification_projects_v_version_modification_type" AS ENUM('cafe-racer', 'custom', 'touring', 'performance', 'cosmetic', 'restoration');
  CREATE TYPE "public"."enum__modification_projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('facebook', 'instagram', 'youtube', 'tiktok', 'x');
  CREATE TYPE "public"."enum_site_settings_social_links_platform" AS ENUM('facebook', 'instagram', 'youtube', 'tiktok', 'x');
  CREATE TYPE "public"."enum_homepage_why_choose_us_icon" AS ENUM('quality', 'compatibility', 'support', 'range');
  CREATE TABLE "brands" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"logo_id" integer,
  	"description" varchar,
  	"active" boolean DEFAULT true,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "bike_models" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"year_from" numeric,
  	"year_to" numeric,
  	"engine_capacity" varchar,
  	"image_id" integer,
  	"description" varchar,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "products_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"bike_models_id" integer
  );
  
  CREATE TABLE "modification_projects_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "modification_projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"bike_brand_id" integer,
  	"bike_model_id" integer,
  	"before_image_id" integer,
  	"after_image_id" integer,
  	"description" jsonb,
  	"estimated_cost" numeric,
  	"modification_type" "enum_modification_projects_modification_type",
  	"featured" boolean DEFAULT false,
  	"published_date" timestamp(3) with time zone,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_modification_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "modification_projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "_modification_projects_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_modification_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_bike_brand_id" integer,
  	"version_bike_model_id" integer,
  	"version_before_image_id" integer,
  	"version_after_image_id" integer,
  	"version_description" jsonb,
  	"version_estimated_cost" numeric,
  	"version_modification_type" "enum__modification_projects_v_version_modification_type",
  	"version_featured" boolean DEFAULT false,
  	"version_published_date" timestamp(3) with time zone,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__modification_projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_modification_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "blog_posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blog_categories_id" integer,
  	"blog_tags_id" integer
  );
  
  CREATE TABLE "_blog_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blog_categories_id" integer,
  	"blog_tags_id" integer
  );
  
  CREATE TABLE "blog_tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"bike_model" varchar,
  	"subject" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_why_choose_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_homepage_why_choose_us_icon"
  );
  
  ALTER TABLE "categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_specifications_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_specifications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_specifications_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_version_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_services_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_version_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_projects_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_members_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_members_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_posts_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faqs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "partners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "partners_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "inquiries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_navigation_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_hero_slides_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_promos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_promos_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_process" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_process_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_showroom" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_showroom_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_why_choose" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_why_choose_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_information" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_information_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "social_links_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_defaults" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_defaults_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "products_gallery" CASCADE;
  DROP TABLE "products_features_locales" CASCADE;
  DROP TABLE "products_specifications_locales" CASCADE;
  DROP TABLE "products_locales" CASCADE;
  DROP TABLE "_products_v_version_gallery" CASCADE;
  DROP TABLE "_products_v_version_features" CASCADE;
  DROP TABLE "_products_v_version_features_locales" CASCADE;
  DROP TABLE "_products_v_version_specifications" CASCADE;
  DROP TABLE "_products_v_version_specifications_locales" CASCADE;
  DROP TABLE "_products_v" CASCADE;
  DROP TABLE "_products_v_locales" CASCADE;
  DROP TABLE "services_features" CASCADE;
  DROP TABLE "services_features_locales" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "_services_v_version_features" CASCADE;
  DROP TABLE "_services_v_version_features_locales" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_locales" CASCADE;
  DROP TABLE "projects_gallery" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "_projects_v_version_gallery" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_locales" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "testimonials_locales" CASCADE;
  DROP TABLE "team_members_social_links" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "team_members_locales" CASCADE;
  DROP TABLE "blog_posts_locales" CASCADE;
  DROP TABLE "_blog_posts_v_locales" CASCADE;
  DROP TABLE "blog_categories_locales" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "faqs_locales" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "partners_locales" CASCADE;
  DROP TABLE "inquiries" CASCADE;
  DROP TABLE "header_navigation_locales" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "homepage_hero_slides" CASCADE;
  DROP TABLE "homepage_hero_slides_locales" CASCADE;
  DROP TABLE "homepage_promos" CASCADE;
  DROP TABLE "homepage_promos_locales" CASCADE;
  DROP TABLE "homepage_process" CASCADE;
  DROP TABLE "homepage_process_locales" CASCADE;
  DROP TABLE "homepage_showroom" CASCADE;
  DROP TABLE "homepage_showroom_locales" CASCADE;
  DROP TABLE "homepage_why_choose" CASCADE;
  DROP TABLE "homepage_why_choose_locales" CASCADE;
  DROP TABLE "homepage_stats" CASCADE;
  DROP TABLE "homepage_stats_locales" CASCADE;
  DROP TABLE "homepage_locales" CASCADE;
  DROP TABLE "contact_information" CASCADE;
  DROP TABLE "contact_information_locales" CASCADE;
  DROP TABLE "social_links_links" CASCADE;
  DROP TABLE "social_links" CASCADE;
  DROP TABLE "seo_defaults" CASCADE;
  DROP TABLE "seo_defaults_locales" CASCADE;
  ALTER TABLE "products" DROP CONSTRAINT IF EXISTS "products_featured_image_id_media_id_fk";
  
  ALTER TABLE "blog_posts" DROP CONSTRAINT IF EXISTS "blog_posts_category_id_blog_categories_id_fk";
  
  ALTER TABLE "_blog_posts_v" DROP CONSTRAINT IF EXISTS "_blog_posts_v_version_category_id_blog_categories_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_services_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_projects_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_testimonials_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_team_members_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_faqs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_partners_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_inquiries_fk";
  
  ALTER TABLE "homepage" DROP CONSTRAINT IF EXISTS "homepage_about_image_id_media_id_fk";
  
  ALTER TABLE "homepage" DROP CONSTRAINT IF EXISTS "homepage_editorial_image_id_media_id_fk";
  
  ALTER TABLE "homepage" DROP CONSTRAINT IF EXISTS "homepage_final_cta_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "products_featured_image_idx";
  DROP INDEX IF EXISTS "products__status_idx";
  DROP INDEX IF EXISTS "blog_posts_category_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_version_version_category_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_snapshot_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_published_locale_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_services_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_projects_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_testimonials_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_team_members_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_faqs_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_partners_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_inquiries_id_idx";
  DROP INDEX IF EXISTS "homepage_about_about_image_idx";
  DROP INDEX IF EXISTS "homepage_editorial_editorial_image_idx";
  DROP INDEX IF EXISTS "homepage_final_cta_final_cta_image_idx";
  ALTER TABLE "products" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "products" ALTER COLUMN "category_id" SET NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "site_name" SET DEFAULT 'MotoForge';
  ALTER TABLE "categories" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "categories" ADD COLUMN "description" varchar;
  ALTER TABLE "categories" ADD COLUMN "parent_id" integer;
  ALTER TABLE "categories" ADD COLUMN "active" boolean DEFAULT true;
  ALTER TABLE "categories" ADD COLUMN "sort_order" numeric DEFAULT 0;
  ALTER TABLE "categories" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "categories" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "categories" ADD COLUMN "seo_image_id" integer;
  ALTER TABLE "categories" ADD COLUMN "seo_no_index" boolean DEFAULT false;
  ALTER TABLE "products_features" ADD COLUMN "feature" varchar NOT NULL;
  ALTER TABLE "products_specifications" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "products_specifications" ADD COLUMN "value" varchar NOT NULL;
  ALTER TABLE "products" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "products" ADD COLUMN "sku" varchar NOT NULL;
  ALTER TABLE "products" ADD COLUMN "short_description" varchar NOT NULL;
  ALTER TABLE "products" ADD COLUMN "description" jsonb;
  ALTER TABLE "products" ADD COLUMN "product_type" "enum_products_product_type" NOT NULL;
  ALTER TABLE "products" ADD COLUMN "subcategory_id" integer;
  ALTER TABLE "products" ADD COLUMN "brand_id" integer NOT NULL;
  ALTER TABLE "products" ADD COLUMN "regular_price" numeric NOT NULL;
  ALTER TABLE "products" ADD COLUMN "sale_price" numeric;
  ALTER TABLE "products" ADD COLUMN "availability" "enum_products_availability" DEFAULT 'in-stock' NOT NULL;
  ALTER TABLE "products" ADD COLUMN "stock_status" varchar;
  ALTER TABLE "products" ADD COLUMN "installation_info" jsonb;
  ALTER TABLE "products" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "products" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "products" ADD COLUMN "new_arrival" boolean DEFAULT false;
  ALTER TABLE "products" ADD COLUMN "best_seller" boolean DEFAULT false;
  ALTER TABLE "products" ADD COLUMN "active" boolean DEFAULT true;
  ALTER TABLE "blog_posts" ADD COLUMN "title" varchar;
  ALTER TABLE "blog_posts" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "blog_posts" ADD COLUMN "content" jsonb;
  ALTER TABLE "blog_posts" ADD COLUMN "author_id" integer;
  ALTER TABLE "blog_posts" ADD COLUMN "published_date" timestamp(3) with time zone;
  ALTER TABLE "blog_posts" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "blog_posts" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "_blog_posts_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_blog_posts_v" ADD COLUMN "version_excerpt" varchar;
  ALTER TABLE "_blog_posts_v" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "_blog_posts_v" ADD COLUMN "version_author_id" integer;
  ALTER TABLE "_blog_posts_v" ADD COLUMN "version_published_date" timestamp(3) with time zone;
  ALTER TABLE "_blog_posts_v" ADD COLUMN "version_seo_title" varchar;
  ALTER TABLE "_blog_posts_v" ADD COLUMN "version_seo_description" varchar;
  ALTER TABLE "blog_categories" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "brands_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "bike_models_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "modification_projects_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "blog_tags_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "contact_submissions_id" integer;
  ALTER TABLE "header_navigation" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "header_navigation" ADD COLUMN "open_in_new_tab" boolean DEFAULT false;
  ALTER TABLE "header" ADD COLUMN "logo_id" integer;
  ALTER TABLE "header" ADD COLUMN "cta_label" varchar;
  ALTER TABLE "header" ADD COLUMN "announcement" varchar;
  ALTER TABLE "footer" ADD COLUMN "logo_id" integer;
  ALTER TABLE "footer" ADD COLUMN "description" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_phone" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_email" varchar;
  ALTER TABLE "footer" ADD COLUMN "contact_address" varchar;
  ALTER TABLE "footer" ADD COLUMN "copyright" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "contact_number" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "whatsapp_number" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "email" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "address" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "default_seo_title" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "default_seo_description" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "default_seo_image_id" integer;
  ALTER TABLE "homepage" ADD COLUMN "hero_headline" varchar NOT NULL;
  ALTER TABLE "homepage" ADD COLUMN "hero_description" varchar NOT NULL;
  ALTER TABLE "homepage" ADD COLUMN "hero_primary_cta_label" varchar DEFAULT 'Explore Parts';
  ALTER TABLE "homepage" ADD COLUMN "hero_primary_cta_href" varchar DEFAULT '/products';
  ALTER TABLE "homepage" ADD COLUMN "hero_secondary_cta_label" varchar DEFAULT 'Browse Accessories';
  ALTER TABLE "homepage" ADD COLUMN "hero_secondary_cta_href" varchar DEFAULT '/products?type=accessory';
  ALTER TABLE "homepage" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "homepage" ADD COLUMN "cta_headline" varchar DEFAULT 'Not sure which part fits your bike?';
  ALTER TABLE "homepage" ADD COLUMN "cta_description" varchar DEFAULT 'Talk to our fitment experts on WhatsApp and get the right part first time.';
  ALTER TABLE "homepage" ADD COLUMN "cta_button_label" varchar DEFAULT 'Chat on WhatsApp';
  ALTER TABLE "brands" ADD CONSTRAINT "brands_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "brands" ADD CONSTRAINT "brands_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "bike_models" ADD CONSTRAINT "bike_models_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "bike_models" ADD CONSTRAINT "bike_models_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_images" ADD CONSTRAINT "products_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_images" ADD CONSTRAINT "products_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_bike_models_fk" FOREIGN KEY ("bike_models_id") REFERENCES "public"."bike_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "modification_projects_gallery" ADD CONSTRAINT "modification_projects_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "modification_projects_gallery" ADD CONSTRAINT "modification_projects_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."modification_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "modification_projects" ADD CONSTRAINT "modification_projects_bike_brand_id_brands_id_fk" FOREIGN KEY ("bike_brand_id") REFERENCES "public"."brands"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "modification_projects" ADD CONSTRAINT "modification_projects_bike_model_id_bike_models_id_fk" FOREIGN KEY ("bike_model_id") REFERENCES "public"."bike_models"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "modification_projects" ADD CONSTRAINT "modification_projects_before_image_id_media_id_fk" FOREIGN KEY ("before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "modification_projects" ADD CONSTRAINT "modification_projects_after_image_id_media_id_fk" FOREIGN KEY ("after_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "modification_projects" ADD CONSTRAINT "modification_projects_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "modification_projects_rels" ADD CONSTRAINT "modification_projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."modification_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "modification_projects_rels" ADD CONSTRAINT "modification_projects_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_modification_projects_v_version_gallery" ADD CONSTRAINT "_modification_projects_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_modification_projects_v_version_gallery" ADD CONSTRAINT "_modification_projects_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_modification_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_modification_projects_v" ADD CONSTRAINT "_modification_projects_v_parent_id_modification_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."modification_projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_modification_projects_v" ADD CONSTRAINT "_modification_projects_v_version_bike_brand_id_brands_id_fk" FOREIGN KEY ("version_bike_brand_id") REFERENCES "public"."brands"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_modification_projects_v" ADD CONSTRAINT "_modification_projects_v_version_bike_model_id_bike_models_id_fk" FOREIGN KEY ("version_bike_model_id") REFERENCES "public"."bike_models"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_modification_projects_v" ADD CONSTRAINT "_modification_projects_v_version_before_image_id_media_id_fk" FOREIGN KEY ("version_before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_modification_projects_v" ADD CONSTRAINT "_modification_projects_v_version_after_image_id_media_id_fk" FOREIGN KEY ("version_after_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_modification_projects_v" ADD CONSTRAINT "_modification_projects_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_modification_projects_v_rels" ADD CONSTRAINT "_modification_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_modification_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_modification_projects_v_rels" ADD CONSTRAINT "_modification_projects_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_blog_categories_fk" FOREIGN KEY ("blog_categories_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_blog_tags_fk" FOREIGN KEY ("blog_tags_id") REFERENCES "public"."blog_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_blog_categories_fk" FOREIGN KEY ("blog_categories_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_blog_tags_fk" FOREIGN KEY ("blog_tags_id") REFERENCES "public"."blog_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_why_choose_us" ADD CONSTRAINT "homepage_why_choose_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "brands_slug_idx" ON "brands" USING btree ("slug");
  CREATE INDEX "brands_logo_idx" ON "brands" USING btree ("logo_id");
  CREATE INDEX "brands_seo_seo_image_idx" ON "brands" USING btree ("seo_image_id");
  CREATE INDEX "brands_updated_at_idx" ON "brands" USING btree ("updated_at");
  CREATE INDEX "brands_created_at_idx" ON "brands" USING btree ("created_at");
  CREATE INDEX "bike_models_brand_idx" ON "bike_models" USING btree ("brand_id");
  CREATE UNIQUE INDEX "bike_models_slug_idx" ON "bike_models" USING btree ("slug");
  CREATE INDEX "bike_models_image_idx" ON "bike_models" USING btree ("image_id");
  CREATE INDEX "bike_models_updated_at_idx" ON "bike_models" USING btree ("updated_at");
  CREATE INDEX "bike_models_created_at_idx" ON "bike_models" USING btree ("created_at");
  CREATE INDEX "products_images_order_idx" ON "products_images" USING btree ("_order");
  CREATE INDEX "products_images_parent_id_idx" ON "products_images" USING btree ("_parent_id");
  CREATE INDEX "products_images_image_idx" ON "products_images" USING btree ("image_id");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_bike_models_id_idx" ON "products_rels" USING btree ("bike_models_id");
  CREATE INDEX "modification_projects_gallery_order_idx" ON "modification_projects_gallery" USING btree ("_order");
  CREATE INDEX "modification_projects_gallery_parent_id_idx" ON "modification_projects_gallery" USING btree ("_parent_id");
  CREATE INDEX "modification_projects_gallery_image_idx" ON "modification_projects_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "modification_projects_slug_idx" ON "modification_projects" USING btree ("slug");
  CREATE INDEX "modification_projects_bike_brand_idx" ON "modification_projects" USING btree ("bike_brand_id");
  CREATE INDEX "modification_projects_bike_model_idx" ON "modification_projects" USING btree ("bike_model_id");
  CREATE INDEX "modification_projects_before_image_idx" ON "modification_projects" USING btree ("before_image_id");
  CREATE INDEX "modification_projects_after_image_idx" ON "modification_projects" USING btree ("after_image_id");
  CREATE INDEX "modification_projects_modification_type_idx" ON "modification_projects" USING btree ("modification_type");
  CREATE INDEX "modification_projects_featured_idx" ON "modification_projects" USING btree ("featured");
  CREATE INDEX "modification_projects_seo_seo_image_idx" ON "modification_projects" USING btree ("seo_image_id");
  CREATE INDEX "modification_projects_updated_at_idx" ON "modification_projects" USING btree ("updated_at");
  CREATE INDEX "modification_projects_created_at_idx" ON "modification_projects" USING btree ("created_at");
  CREATE INDEX "modification_projects__status_idx" ON "modification_projects" USING btree ("_status");
  CREATE INDEX "modification_projects_rels_order_idx" ON "modification_projects_rels" USING btree ("order");
  CREATE INDEX "modification_projects_rels_parent_idx" ON "modification_projects_rels" USING btree ("parent_id");
  CREATE INDEX "modification_projects_rels_path_idx" ON "modification_projects_rels" USING btree ("path");
  CREATE INDEX "modification_projects_rels_products_id_idx" ON "modification_projects_rels" USING btree ("products_id");
  CREATE INDEX "_modification_projects_v_version_gallery_order_idx" ON "_modification_projects_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_modification_projects_v_version_gallery_parent_id_idx" ON "_modification_projects_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_modification_projects_v_version_gallery_image_idx" ON "_modification_projects_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_modification_projects_v_parent_idx" ON "_modification_projects_v" USING btree ("parent_id");
  CREATE INDEX "_modification_projects_v_version_version_slug_idx" ON "_modification_projects_v" USING btree ("version_slug");
  CREATE INDEX "_modification_projects_v_version_version_bike_brand_idx" ON "_modification_projects_v" USING btree ("version_bike_brand_id");
  CREATE INDEX "_modification_projects_v_version_version_bike_model_idx" ON "_modification_projects_v" USING btree ("version_bike_model_id");
  CREATE INDEX "_modification_projects_v_version_version_before_image_idx" ON "_modification_projects_v" USING btree ("version_before_image_id");
  CREATE INDEX "_modification_projects_v_version_version_after_image_idx" ON "_modification_projects_v" USING btree ("version_after_image_id");
  CREATE INDEX "_modification_projects_v_version_version_modification_ty_idx" ON "_modification_projects_v" USING btree ("version_modification_type");
  CREATE INDEX "_modification_projects_v_version_version_featured_idx" ON "_modification_projects_v" USING btree ("version_featured");
  CREATE INDEX "_modification_projects_v_version_seo_version_seo_image_idx" ON "_modification_projects_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_modification_projects_v_version_version_updated_at_idx" ON "_modification_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_modification_projects_v_version_version_created_at_idx" ON "_modification_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_modification_projects_v_version_version__status_idx" ON "_modification_projects_v" USING btree ("version__status");
  CREATE INDEX "_modification_projects_v_created_at_idx" ON "_modification_projects_v" USING btree ("created_at");
  CREATE INDEX "_modification_projects_v_updated_at_idx" ON "_modification_projects_v" USING btree ("updated_at");
  CREATE INDEX "_modification_projects_v_latest_idx" ON "_modification_projects_v" USING btree ("latest");
  CREATE INDEX "_modification_projects_v_rels_order_idx" ON "_modification_projects_v_rels" USING btree ("order");
  CREATE INDEX "_modification_projects_v_rels_parent_idx" ON "_modification_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_modification_projects_v_rels_path_idx" ON "_modification_projects_v_rels" USING btree ("path");
  CREATE INDEX "_modification_projects_v_rels_products_id_idx" ON "_modification_projects_v_rels" USING btree ("products_id");
  CREATE INDEX "blog_posts_rels_order_idx" ON "blog_posts_rels" USING btree ("order");
  CREATE INDEX "blog_posts_rels_parent_idx" ON "blog_posts_rels" USING btree ("parent_id");
  CREATE INDEX "blog_posts_rels_path_idx" ON "blog_posts_rels" USING btree ("path");
  CREATE INDEX "blog_posts_rels_blog_categories_id_idx" ON "blog_posts_rels" USING btree ("blog_categories_id");
  CREATE INDEX "blog_posts_rels_blog_tags_id_idx" ON "blog_posts_rels" USING btree ("blog_tags_id");
  CREATE INDEX "_blog_posts_v_rels_order_idx" ON "_blog_posts_v_rels" USING btree ("order");
  CREATE INDEX "_blog_posts_v_rels_parent_idx" ON "_blog_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_blog_posts_v_rels_path_idx" ON "_blog_posts_v_rels" USING btree ("path");
  CREATE INDEX "_blog_posts_v_rels_blog_categories_id_idx" ON "_blog_posts_v_rels" USING btree ("blog_categories_id");
  CREATE INDEX "_blog_posts_v_rels_blog_tags_id_idx" ON "_blog_posts_v_rels" USING btree ("blog_tags_id");
  CREATE UNIQUE INDEX "blog_tags_slug_idx" ON "blog_tags" USING btree ("slug");
  CREATE INDEX "blog_tags_updated_at_idx" ON "blog_tags" USING btree ("updated_at");
  CREATE INDEX "blog_tags_created_at_idx" ON "blog_tags" USING btree ("created_at");
  CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "homepage_why_choose_us_order_idx" ON "homepage_why_choose_us" USING btree ("_order");
  CREATE INDEX "homepage_why_choose_us_parent_id_idx" ON "homepage_why_choose_us" USING btree ("_parent_id");
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_subcategory_id_categories_id_fk" FOREIGN KEY ("subcategory_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_brands_fk" FOREIGN KEY ("brands_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_bike_models_fk" FOREIGN KEY ("bike_models_id") REFERENCES "public"."bike_models"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_modification_projects_fk" FOREIGN KEY ("modification_projects_id") REFERENCES "public"."modification_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_tags_fk" FOREIGN KEY ("blog_tags_id") REFERENCES "public"."blog_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_seo_image_id_media_id_fk" FOREIGN KEY ("default_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_seo_seo_image_idx" ON "categories" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "products_sku_idx" ON "products" USING btree ("sku");
  CREATE INDEX "products_product_type_idx" ON "products" USING btree ("product_type");
  CREATE INDEX "products_subcategory_idx" ON "products" USING btree ("subcategory_id");
  CREATE INDEX "products_brand_idx" ON "products" USING btree ("brand_id");
  CREATE INDEX "products_regular_price_idx" ON "products" USING btree ("regular_price");
  CREATE INDEX "products_sale_price_idx" ON "products" USING btree ("sale_price");
  CREATE INDEX "products_availability_idx" ON "products" USING btree ("availability");
  CREATE INDEX "products_featured_idx" ON "products" USING btree ("featured");
  CREATE INDEX "products_new_arrival_idx" ON "products" USING btree ("new_arrival");
  CREATE INDEX "products_best_seller_idx" ON "products" USING btree ("best_seller");
  CREATE INDEX "products_active_idx" ON "products" USING btree ("active");
  CREATE INDEX "blog_posts_author_idx" ON "blog_posts" USING btree ("author_id");
  CREATE INDEX "_blog_posts_v_version_version_author_idx" ON "_blog_posts_v" USING btree ("version_author_id");
  CREATE INDEX "payload_locked_documents_rels_brands_id_idx" ON "payload_locked_documents_rels" USING btree ("brands_id");
  CREATE INDEX "payload_locked_documents_rels_bike_models_id_idx" ON "payload_locked_documents_rels" USING btree ("bike_models_id");
  CREATE INDEX "payload_locked_documents_rels_modification_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("modification_projects_id");
  CREATE INDEX "payload_locked_documents_rels_blog_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_tags_id");
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");
  CREATE INDEX "site_settings_default_seo_default_seo_image_idx" ON "site_settings" USING btree ("default_seo_image_id");
  CREATE INDEX "homepage_hero_hero_image_idx" ON "homepage" USING btree ("hero_image_id");
  ALTER TABLE "categories" DROP COLUMN "order";
  ALTER TABLE "categories" DROP COLUMN "published";
  ALTER TABLE "products" DROP COLUMN "featured_image_id";
  ALTER TABLE "products" DROP COLUMN "_status";
  ALTER TABLE "blog_posts" DROP COLUMN "category_id";
  ALTER TABLE "blog_posts" DROP COLUMN "published_on";
  ALTER TABLE "_blog_posts_v" DROP COLUMN "version_category_id";
  ALTER TABLE "_blog_posts_v" DROP COLUMN "version_published_on";
  ALTER TABLE "_blog_posts_v" DROP COLUMN "snapshot";
  ALTER TABLE "_blog_posts_v" DROP COLUMN "published_locale";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "services_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "projects_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "team_members_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faqs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "partners_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "inquiries_id";
  ALTER TABLE "homepage" DROP COLUMN "about_image_id";
  ALTER TABLE "homepage" DROP COLUMN "editorial_image_id";
  ALTER TABLE "homepage" DROP COLUMN "final_cta_image_id";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum__products_v_version_status";
  DROP TYPE "public"."enum__products_v_published_locale";
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_version_icon";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum__services_v_published_locale";
  DROP TYPE "public"."enum_projects_category";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_category";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum__projects_v_published_locale";
  DROP TYPE "public"."enum_team_members_social_links_platform";
  DROP TYPE "public"."enum__blog_posts_v_published_locale";
  DROP TYPE "public"."enum_faqs_category";
  DROP TYPE "public"."enum_inquiries_contact_method";
  DROP TYPE "public"."enum_inquiries_source";
  DROP TYPE "public"."enum_inquiries_status";
  DROP TYPE "public"."enum_homepage_why_choose_icon";
  DROP TYPE "public"."enum_social_links_links_platform";`)
}
